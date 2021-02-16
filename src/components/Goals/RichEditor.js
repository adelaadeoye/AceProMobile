import React from 'react';
import {
  Appearance,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  LogBox,
  Button,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import * as ImagePicker from 'react-native-image-picker';
import Colors from 'sm/utils/Colors';
import {scale, v_scale} from 'sm/utils/StylesConst';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {uploadFileToFireBase} from './fb/firestore-uploadAssets';
import VideoTab from 'sm/components/VideoTab';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import videoIcon from './assets/video.png';
import strikethrough from './assets/strikethrough.png';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    const theme = props.theme || Appearance.getColorScheme();
    const contentStyle = this.createContentStyle(theme);
    this.state = {
      theme: theme,
      contentStyle,
      showMedia: false,
      error: false,
      disabled: false,
      showTool: false,
      totalFileSize: 0,
    };
    this.richText = props.richText;
    this.linkModal = props.linkModal;
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    Appearance.addChangeListener(this.themeChange);
    Keyboard.addListener('keyboardDidShow', this.onKeyBoard);
    this.setState({showTool: true});
  }

  componentWillUnmount() {
    Appearance.removeChangeListener(this.themeChange);
    Keyboard.removeListener('keyboardDidShow', this.onKeyBoard);
  }

  onKeyBoard = () => {
    TextInput.State.currentlyFocusedInput();
  };

  editorInitializedCallback() {
    this.richText.current?.registerToolbar(function (items) {});
  }

  monitorUpload = async (response, id, mediaType) => {
    const {
      uploadSuccess: [uploadSuccess, setUploadSuccess],
      uploadErr: [uploadErr, setUploadErr],
      downloadUrl: [downloadUrls, setDownloadUrls],
      assetRef: [assetsRef, setAssetsRef],
      mediaFolder = 'Goals',
    } = this.props;

    setUploadSuccess([
      {[`${id}-${response.fileName}`]: false},
      ...uploadSuccess,
    ]);

    const user = auth().currentUser;
    const {fileName} = response;
    const assetRef = `${mediaFolder}/${user.email}/${id}-${fileName}`;

    const uploadTask = uploadFileToFireBase(
      response,
      id,
      mediaFolder,
      assetRef,
    );
    uploadTask
      .then(async () => {
        const downloadPath = await storage().ref(assetRef).getDownloadURL();
        setAssetsRef([assetRef, ...assetsRef]);
        console.log('download', downloadPath);
        setDownloadUrls([
          {file: downloadPath, mediaType, assetRef},
          ...downloadUrls,
        ]);
        setUploadSuccess([
          {[`${id}-${response.fileName}`]: true},
          ...uploadSuccess.filter(
            (e) => Object.keys(e)[0] !== `${id}-${response.fileName}`,
          ),
        ]);
        console.log('uploadSuccess', uploadSuccess);
      })
      .catch((e) => {
        console.log('uploadErr', e.message);
        setUploadErr([{[`${id}-${response.fileName}`]: true}, ...uploadErr]);
      });
  };

  validateSize = (size) =>
    new Promise((resolve, reject) => {
      const maxTotalFileSize = 200000000000;
      this.state.totalFileSize + size > maxTotalFileSize
        ? reject(false)
        : resolve(true);
    });

  onPressAddVideo = () => {
    const id = Math.random().toString(36).slice(3);
    const {
      vids: [vids, setVids],
      pics: [pics],
      setTopErr,
      singleMedia,
    } = this.props;

    if (singleMedia && (pics.length || vids.length)) {
      return setTopErr({val: true, message: 'Only one asset is supported!'});
    }

    ImagePicker.launchImageLibrary(
      {
        mediaType: 'video',
      },
      (response) => {
        if (response.uri) {
          this.validateSize(response.fileSize)
            .then(() => {
              this.setState({
                totalFileSize: this.state.totalFileSize + response.fileSize,
              });
              // console.log('vids', vids)
              setVids({
                filePath: response.uri,
                fileName: response.fileName,
                fileSize: response.fileSize,
                id,
              });
              this.monitorUpload(response, id, 'video');
            })
            .catch(() => {
              setTopErr({
                val: true,
                message: 'This file size exceeds total 200MB limit!',
              });
            });
        }
      },
    );
  };

  onPressAddImage = () => {
    const id = Math.random().toString(36).slice(3);
    const {
      pics: [pics, setPics],
      vids: [vids],
      setTopErr,
      singleMedia,
    } = this.props;

    if (singleMedia && (pics.length || vids.length)) {
      return setTopErr({val: true, message: 'Only one asset is supported!'});
    }

    ImagePicker.launchImageLibrary(
      {
        noData: true,
      },
      (response) => {
        if (response.uri) {
          this.validateSize(response.fileSize)
            .then(() => {
              this.setState({
                totalFileSize: this.state.totalFileSize + response.fileSize,
              });
              setPics([
                {
                  filePath: response.uri,
                  fileName: response.fileName,
                  fileSize: response.fileSize,
                  id,
                },
                ...pics,
              ]);
              this.monitorUpload(response, id, 'image');
            })
            .catch(() => {
              setTopErr({
                val: true,
                message: 'This file size exceeds total 200MB limit!',
              });
            });
        }
      },
    );
  };

  handleDestroyAsset = ({fileName, fileSize, id, assetRef, setToDel}) => {
    const {
      mediaFolder = 'Goals',
      vids: [vids, setVids],
      assetRef: [assetsRef, setAssetsRef],
      pics: [pics, setPics],
      uploadSuccess: [uploadSuccess, setUploadSuccess],
      downloadUrl: [downloadUrls, setDownloadUrls],
      setAssetsToDel,
    } = this.props;
    const user = auth().currentUser;

    if (!assetRef) assetRef = `${mediaFolder}/${user.email}/${id}-${fileName}`;
    console.log('next-asset', assetRef);

    if (!setToDel) {
      try {
        storage().ref(assetRef).delete();
      } catch (error) {
        console.log('asset-del-err', error.message);
      }
    } else {
      setAssetsToDel(assetRef);
    }

    setDownloadUrls(downloadUrls.filter((e) => e.assetRef !== assetRef));
    setUploadSuccess([
      {[`${id}-${fileName}`]: true},
      ...uploadSuccess.filter((e) => Object.keys(e)[0] !== `${id}-${fileName}`),
    ]);
    setVids(vids.filter((e) => e.fileName !== fileName));
    setPics(pics.filter((e) => e.fileName !== fileName));
    this.setState({totalFileSize: this.state.totalFileSize - fileSize});
    if (!setToDel) setAssetsRef(assetsRef.filter((e) => e !== assetRef));
  };

  onInsertLink() {
    this.linkModal.current?.setModalVisible(true);
  }

  onLinkDone({title, url}) {
    this.richText.current?.insertLink(title, url);
  }

  createContentStyle(theme) {
    const contentStyle = {
      backgroundColor: '#000033',
      color: '#fff',
      placeholderColor: 'gray',
      // cssText: '#editor {background-color: #f3f3f3}', // initial valid
      contentCSSText: 'font-size: 16px; min-height: 200px; height: 100%;', // initial valid
    };
    if (theme === 'light') {
      contentStyle.backgroundColor = '#fff';
      contentStyle.color = '#000033';
      contentStyle.placeholderColor = '#a9a9a9';
    }
    return contentStyle;
  }

  render() {
    const {contentStyle, showTool, showMedia} = this.state;
    const {
      uploadSuccess: [uploadSuccess],
      uploadErr: [uploadErr],
      topErr,
      setTopErr,
      handleSaveHtml,
      pics,
      vids,
      updateDesc,
    } = this.props;
    const {backgroundColor, color, placeholderColor} = contentStyle;
    const themeBg = {backgroundColor};
    const changedDefaultActions = defaultActions.filter((e) => e !== 'link');
    const errObj = uploadErr.map((i) =>
      Object.values(i)[0] ? Object.keys(i)[0] : '',
    );
    const mediaStat = (e) => errObj.includes(`${e.id}-${e.fileName}`);
    const succObj = uploadSuccess.map((i) =>
      Object.values(i)[0] ? Object.keys(i)[0] : '',
    );
    const successStat = (e) => succObj.includes(`${e.id}-${e.fileName}`);

    const picItems = pics[0].map((e) => (
      <View key={e.id} style={{marginVertical: 5}}>
        <Icon
          name="closecircle"
          size={20}
          color="red"
          style={styles.delCirc}
          onPress={() => this.handleDestroyAsset(e)}
        />
        <Image
          source={{uri: e.filePath}}
          resizeMode="contain"
          style={{width: scale(280), height: v_scale(200)}}
        />
        {!successStat(e) ? (
          <View style={styles.mediaOverlay}>
            {mediaStat(e) ? (
              <Icon name="exclamationcircle" size={35} color="red" />
            ) : (
              <ActivityIndicator color="#000" size="large" />
            )}
          </View>
        ) : null}
      </View>
    ));
    const vidItems = () => (
      <View  style={{marginVertical: 5}}>
        <Icon name="closecircle" size={20} color="red" style={styles.delCirc} />
        <VideoTab
          source={vids[0].filePath}
          style={{width: scale(280), height: v_scale(200)}}
        />
        {!successStat(vids[0]) ? (
          <View style={styles.mediaOverlay}>
            {mediaStat(vids[0]) ? (
              <Icon name="exclamationcircle" size={35} color="red" />
            ) : (
              <ActivityIndicator color="#000" size="large" />
            )}
          </View>
        ) : null}
      </View>
    );

    return (
      <SafeAreaView style={[styles.container, themeBg]}>
        <AwesomeAlert
          show={topErr?.val}
          showProgress={false}
          title={topErr?.message || 'There is an error'}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={false}
          cancelText="Close"
          cancelButtonColor="red"
          onCancelPressed={() => setTopErr({val: false})}
        />
        <Modal
          isVisible={showMedia}
          backdropColor="#000"
          backdropOpacity={0.3}
          onBackdropPress={() => this.setState({showMedia: false})}>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              width: scale(300),
              backgroundColor: '#fff',
            }}>
            <View style={{width: scale(180), paddingVertical: 20}}>
              <Button
                title="Continue Editing"
                onPress={() => this.setState({showMedia: false})}
                color={Colors.AmberRed}
              />
            </View>
            <ScrollView
              contentContainerStyle={{
                alignSelf: 'center',
                borderRadius: 20,
                marginBottom: 30,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingBottom: 60,
                paddingVertical: 15,
              }}>
              {picItems}
              {vidItems()}
            </ScrollView>
          </View>
        </Modal>
        {(!!vids[0] || !!pics[0]) && (
          <View style={styles.nav}>
            <Button
              title="Media"
              color={Colors.AmberRed}
              onPress={() => this.setState({showMedia: true})}
            />
          </View>
        )}
        {/* <KeyboardAvoidingView keyboardVerticalOffset={v_scale(205)} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
        {showTool && (
          <ScrollView
            horizontal={true}
            persistentScrollbar={true}
            style={{paddingVertical: 2}}>
            <RichToolbar
              style={[styles.richBar, themeBg]}
              editor={this.richText}
              iconTint={color}
              selectedIconTint={'#2095F2'}
              disabledIconTint={'#8b8b8b'}
              onPressAddImage={this.onPressAddImage}
              iconSize={40} // default 50
              actions={[
                'onPressAddVideo',
                ...changedDefaultActions,
                actions.setStrikethrough,
                actions.heading1,
                actions.heading4,
                actions.removeFormat,
              ]} // default defaultActions
              iconMap={{
                [actions.removeFormat]: ({tintColor}) => (
                  <Text style={[styles.tib, {color: tintColor}]}>C</Text>
                ),
                [actions.setStrikethrough]: strikethrough,
                [actions.heading1]: ({tintColor}) => (
                  <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
                ),
                [actions.heading4]: ({tintColor}) => (
                  <Text style={[styles.tib, {color: tintColor}]}>H3</Text>
                ),
                onPressAddVideo: videoIcon,
              }}
              onPressAddVideo={this.onPressAddVideo}
            />
          </ScrollView>
        )}
        <ScrollView style={[styles.scroll, themeBg]}>
          <RichEditor
            editorStyle={contentStyle}
            containerStyle={themeBg}
            ref={this.richText}
            onChange={handleSaveHtml}
            style={[styles.rich, themeBg]}
            placeholder={this.props.placeholder || 'Add new goal'}
            editorInitializedCallback={this.editorInitializedCallback.bind(
              this,
            )}
            initialContentHTML={updateDesc}
          />
        </ScrollView>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginHorizontal: 4,
  },
  nav: {
    margin: 5,
    width: scale(100),
  },
  rich: {
    flex: 1,
  },
  mediaOverlay: {
    backgroundColor: 'grey',
    opacity: 0.8,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  richBar: {
    height: v_scale(50),
    backgroundColor: '#F5FCFF',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: v_scale(40),
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
  },
  delCirc: {
    position: 'absolute',
    zIndex: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    top: 0,
    right: 0,
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
});
