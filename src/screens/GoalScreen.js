import React, {useState, createRef, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  LogBox,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {AuthContext} from 'sm/navigation/AuthProvider';
import AddButton from 'sm/components/AddButton';
import {windowHeight, windowWidth} from 'sm/utils/Dimensions';
import TopNavbar from 'sm/components/TopNavbar';
import DropDown from 'sm/components/DropDown';
import TopModal from 'sm/components/TopModal';
import InnerModal from 'sm/components/InnerModal';
import GoalVideo from 'sm/components/VideoTab';
import {TextTab, GoalTip, RichEditor, TitleTab} from 'sm/components/Goals';
import TopTabs from 'sm/components/TopTabs';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import {goalTypes} from 'sm/utils/Constants';
import {goals} from 'sm/utils/Constants';
import Container from 'sm/components/Container';
import Input from 'sm/components/FormInput';
import {validateText} from 'sm/utils/Helpers';
import {scale, v_scale} from 'sm/utils/StylesConst';
import {
  saveGoal,
  getGoal,
  updateGoal,
  deleteGoal,
  togglCompleteGoal,
} from 'sm/components/Goals';
import useStateWithCallback from 'sm/utils/Helpers';
import storage from '@react-native-firebase/storage';
import {useFocusEffect} from '@react-navigation/native';
import Loader from 'sm/components/Loader';
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/Feather';
import HTML from 'react-native-render-html';
import {WebView} from 'react-native-webview';

export const runKeyBoardList = ({event, callback}) => {
  switch (event) {
    case 'remove':
      Keyboard.removeListener('keyboardDidShow', () => {
        callback(false);
      });
      Keyboard.removeListener('keyboardDidHide', () => {
        callback(true);
      });
      break;
    default:
      Keyboard.addListener('keyboardDidShow', () => {
        callback(false);
      });
      Keyboard.addListener('keyboardDidHide', () => {
        callback(true);
      });
      break;
  }
};

export default function GoalScreen({navigation}) {
  const {user} = useContext(AuthContext);

  const [activeScreen, setActiveScreen] = useState('Goals');
  const [showLoader, setShowLoader] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [vidPlaying, setVidPlaying] = useState(null);
  const [goalsData, setGoalsData] = useStateWithCallback(
    {data: [], completed: []},
    () => setShowLoader(false),
  );
  const [goalTitle, setGoalTitle] = useState({value: '', isValid: null});
  const [goalType, setGoalType] = useState('Outcomes');
  const [showModal, setShowModal] = useState(false);
  const [showSaveLoading, setShowSaveLoading] = useState(false);
  const [pics, setPics] = useState([]);
  const [vids, setVids] = useState([]);
  const [assetsRef, setAssetsRef] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState([]);
  const [uploadErr, setUploadErr] = useState([]);
  const [topErr, setTopErr] = useState({});
  const [editorHtml, setEditorHtml] = useState('');
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [showGoal, setShowGoal] = useState(null);
  const [writeStatus, setWriteStatus] = useState('save');
  const [updateDesc, setUpdateDesc] = useState(null);
  const [confirmDel, setConfirmDel] = useState(false);
  const [delChk, setDelChk] = useState({});
  const [updateTimeStp, setUpdateTimeStp] = useState(null);
  const [assetsToDel, setAssetsToDel] = useState([]);
  const [loadCompleting, setLoadCompleting] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showCompltGoal, setShowCompltGoal] = useState(null);

  const richTextRef = createRef();
  const linkModalRef = createRef();

  useEffect(() => {
    LogBox.ignoreLogs([
      'Unhandled Promise Rejection',
      "Can't perform a React state update on an unmounted component",
    ]);
    fetchGoal();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setShowLoader(true);
      const {data} = goalsData;
      if (!data.length) {
        fetchGoal();
      } else {
        setShowLoader(false);
      }
      runKeyBoardList({callback: setShowMenu});

      return () => {
        handleDestroyAssets(assetsToDel);
        runKeyBoardList({event: 'remove', callback: setShowMenu});
        setShowLoader(true);
        initializeState();
      };
    }, []),
  );

  const initializeState = () => {
    setShowMenu(true);
    setShowModal(false);
    setAssetsToDel([]);
    setAssetsRef([]);
    setGoalType('Outcomes');
    setLoadCompleting(false);
    setShowCompleted(false);
    setShowCompltGoal(null);
    setPics([]);
    setVids([]);
    setGoalTitle({value: '', isValid: null});
    setDelChk({});
    setEditorHtml('');
    setUploadSuccess([]);
    setDownloadUrls([]);
  };

  const leftText = (
    <Text style={styles.button} onPress={() => handleCancel()}>
      Cancel
    </Text>
  );

  const rightText = (
    <TouchableOpacity disabled={showSaveLoading} style={styles.button}>
      <Text
        style={{
          color: Colors.AmberRed,
          fontWeight: 'bold',
          fontSize: Textsizes.Medium,
        }}
        onPress={() => handleCheckWriteStatus()}>
        {writeStatus === 'edit' ? 'Update' : 'Save'}
      </Text>
      {showSaveLoading && <ActivityIndicator color="grey" />}
    </TouchableOpacity>
  );

  const fetchGoal = async () => {
    setShowLoader(true);
    const runNext = (data) => {
      const completed = data.filter((e) => e.completed);
      setGoalsData({
        completed,
        data,
      });
      setShowLoader(false);
    };
    await getGoal(user, runNext);
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowSaveLoading(false);
    handleDestroyAssets(assetsRef);
    initializeState();
  };

  const handleDestroyAssets = (delArr) => {
    delArr.forEach((ar) => {
      try {
        storage().ref(ar).delete();
      } catch (error) {}
    });
  };

  const handleSaveOrUpdate = (callback) => {
    setShowSaveLoading(true);
    checkFullValidate()
      .then(() => {
        if (!editorHtml) {
          setShowSaveLoading(false);
          return setTopErr({
            val: true,
            message: 'Please describe your goal.',
          });
        }

        let stillProcessing = uploadSuccess
          .map((i) => Object.values(i)[0])
          .includes(false);
        if (stillProcessing) {
          setShowSaveLoading(false);
          return setTopErr({
            val: true,
            message: 'Still processing files. Kindly wait',
          });
        }

        setAssetsRef([]);
        callback();
      })
      .catch((e) => {
        setShowSaveLoading(false);
      });
  };

  const saveCallback = () => {
    const runNext = () => {
      setShowModal(false);
      initializeState();
      fetchGoal();
      setShowSaveLoading(false);
    };
    let goalDetails = {
      goal_type: goalType,
      title: goalTitle.value,
      description: editorHtml,
      assets: downloadUrls,
      created_at: moment().format(),
      updated_at: moment().format(),
    };
    saveGoal(user, goalDetails, runNext);
  };

  const updateCallback = () => {
    const runNext = () => {
      handleDestroyAssets(assetsToDel);
      setShowModal(false);
      initializeState();
      fetchGoal();
      setShowSaveLoading(false);
      setShowModal(false);
      setUpdateDesc(null);
      setUpdateTimeStp(null);
      setAssetsToDel([]);
    };
    let goalDetails = {
      title: goalTitle.value,
      description: editorHtml,
      assets: downloadUrls,
      updated_at: moment().format(),
    };
    console.log(updateTimeStp);
    updateGoal(user, goalDetails, updateTimeStp, runNext);
  };

  const validate = (val) =>
    setGoalTitle({
      ...goalTitle,
      value: val,
      isValid: validateText(val, 40, 'symbols'),
    });

  const checkFullValidate = async () => {
    let promise = new Promise((resolve, reject) => {
      setGoalTitle({
        ...goalTitle,
        isValid: goalTitle.isValid === true,
      });
      setTimeout(() => {
        goalTitle.isValid ? resolve(true) : reject(false);
      }, 0);
    });
    return promise;
  };

  const handleOpenModal = (stat) => {
    if (stat === 'edit') {
      const [{title, description, assets}] = goalsData.data.filter(
        (e) => e.created_at === showGoal,
      );
      setAssetsToDel([]);
      setEditorHtml(description);
      setUpdateDesc(description);

      const newPics = [],
        newVids = [],
        newDownloads = [],
        newUpldSucc = [];
      assets.forEach((e, i) => {
        const {file, mediaType, assetRef} = e;
        const media = {
          fileName: file,
          filePath: file,
          fileSize: 0,
          assetRef,
          setToDel: true,
          id: i,
        };

        if (mediaType === 'image') {
          newPics.push(media);
        } else if (mediaType === 'video') {
          newVids.push(media);
        }
        newDownloads.push({file, mediaType, assetRef});
        newUpldSucc.push({[`${i}-${file}`]: true});
      });
      setPics([...newPics, ...pics]);
      setVids([...newVids, ...vids]);
      setDownloadUrls([...newDownloads, ...downloadUrls]);
      setUploadSuccess([...newUpldSucc, ...uploadSuccess]);

      setShowModal(true);
      setGoalTitle({value: title, isValid: true});
      setShowGoal(null);
    } else if (stat === 'save') {
      initializeState();
      setShowLoader(false);
      setShowModal(true);
    }
    setWriteStatus(stat);
  };

  const handleCheckWriteStatus = () => {
    if (writeStatus === 'edit') {
      return handleSaveOrUpdate(updateCallback);
    }

    handleSaveOrUpdate(saveCallback);
  };

  const handleTogglComplete = (goal) => {
    setLoadCompleting(true);
    const {data, completed} = goalsData;
    const [updatedGoal] = data.filter((e) => e.created_at === goal);
    const filteredData = data.filter((e) => e.created_at !== goal);
    if (updatedGoal.completed) {
      updatedGoal.completed = null;
    } else {
      updatedGoal.completed = {
        completed_at: moment().format(),
      };
    }
    const filteredCompl = completed.filter((e) => e.created_at !== goal);

    let compltObj = filteredCompl;
    if (updatedGoal.completed) {
      compltObj = [updatedGoal, ...filteredCompl];
    }

    const runNext = () => {
      setGoalsData({
        completed: compltObj,
        data: [updatedGoal, ...filteredData],
      });
      setLoadCompleting(false);
    };

    togglCompleteGoal(user, updatedGoal, goal, runNext);
  };

  const showGoalComp = (goalObj, handleGoback = () => setShowGoal(null)) => {
    const [{title, description, assets, created_at, goal_type}] = goalObj;
    const DEFAULT_PROPS = {
      WebView,
      onLinkPress(evt, href) {
        Linking.openURL(href);
      },
    };

    const checkCompleted = goalsData.completed.some(
      (e) => e.created_at === showGoal,
    );

    return (
      <View
        style={{
          alignItems: 'center',
          zIndex: -40,
          flex: 1,
          paddingVertical: 20,
          width: scale(370),
        }}>
        <View style={[styles.headNav, {width: scale(370)}]}>
          <Icon
            name="chevron-left"
            color={Colors.AmberRed}
            onPress={handleGoback}
            size={40}
            style={styles.iconLeft}
          />
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.navText}>{title}</Text>
          </View>
          {!showCompltGoal ? (
            <Icon
              name="edit-2"
              color={Colors.AmberRed}
              onPress={() => handleOpenModal('edit')}
              size={30}
            />
          ) : (
            <View />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: v_scale(10),
            alignSelf: 'flex-start',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: Textsizes.Regular,
              marginRight: scale(5),
            }}>
            Category:
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: Textsizes.Regular,
              color: Colors.AmberRed,
            }}>
            {goal_type}
          </Text>
        </View>
        {assets.map((i) =>
          i.mediaType == 'image' ? (
            <Image
              key={i.file}
              source={{uri: i.file}}
              resizeMode="contain"
              style={{
                width: scale(370),
                height: v_scale(250),
                borderWidth: 2,
                marginVertical: 10,
              }}
            />
          ) : (
            <GoalVideo
              key={i.file}
              source={i.file}
              shouldPlay={i.file === vidPlaying}
              style={{width: scale(370), marginVertical: 10}}
              setPlay={(src) => setVidPlaying(src)}
            />
          ),
        )}
        <ScrollView>
          <View style={{width: scale(370)}}>
            <Text style={{fontWeight: 'bold'}}>{title}</Text>
            <HTML
              {...DEFAULT_PROPS}
              source={{html: description}}
              containerStyle={styles.bottomText}
              baseFontStyle={{fontSize: Textsizes.Regular}}
            />
          </View>
        </ScrollView>
        {showCompltGoal ? (
          <Text style={styles.compDate}>
            Completed: {moment(showCompltGoal).format('MMMM Do, YYYY h:mma')}
          </Text>
        ) : (
          <View style={styles.comAction}>
            <TouchableOpacity
              style={[styles.complWrap, styles.innerComp]}
              onPress={() => handleTogglComplete(created_at)}>
              <Text style={styles.complText}>
                {checkCompleted ? 'Unmark Complete' : 'Mark Complete'}
              </Text>
              {loadCompleting && <ActivityIndicator color="#fff" />}
            </TouchableOpacity>
            <Text
              style={styles.delGoal}
              onPress={() =>
                setDelChk({
                  val: true,
                  message:
                    'Confirm Delete. Please note that this action is irreversible!',
                  obj: created_at,
                })
              }>
              Delete Goal
            </Text>
          </View>
        )}
      </View>
    );
  };

  const goalItemsTitle = goalsData.data.map((e, i) => (
    <TitleTab
      key={e.created_at}
      title={e.title}
      handleDelete={() =>
        setDelChk({
          val: true,
          message:
            'Confirm Delete. Please note that this action is irreversible!',
          obj: e.created_at,
        })
      }
      highlighted={i === 0}
      handleShow={() => {
        setUpdateTimeStp(e.created_at);
        setShowGoal(e.created_at);
      }}
    />
  ));

  const completedGoalItems = goalsData.completed.map((e, i) => (
    <View
      key={e.created_at}
      style={{
        backgroundColor: i === 0 ? Colors.AmberRed : Colors.LightAsh,
        borderBottomWidth: 1,
        borderColor: Colors.AmberRed,
        alignSelf: 'flex-start',
        padding: scale(15),
        paddingLeft: scale(28),
        width: '100%',
      }}>
      <Text
        style={{
          color: i === 0 ? '#fff' : '#000',
          fontSize: Textsizes.xMedium,
        }}
        onPress={() => setShowCompltGoal(e.created_at)}>
        {e.title}
      </Text>
    </View>
  ));

  return (
    <Container
      home={true}
      navigation={navigation}
      showMenu={showMenu}
      activeScreen={activeScreen}>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{alignItems: 'center', flex: 1}}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag">
            <AwesomeAlert
              show={delChk?.val}
              title={delChk?.message}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={true}
              showCancelButton={true}
              showConfirmButton={true}
              showProgress={delChk?.stat}
              cancelText="Close"
              confirmText="Delete"
              cancelButtonColor="purple"
              confirmButtonColor="red"
              onDismiss={() => {
                setDelChk({});
              }}
              onCancelPressed={() => setDelChk({})}
              onConfirmPressed={() =>
                deleteGoal(user, delChk.obj, () => {
                  setShowGoal(null);
                  fetchGoal();
                  setDelChk({});
                })
              }
            />

            {showModal ? (
              <>
                <TopModal
                  leftText={leftText}
                  rightText={rightText}
                  midText={
                    <View style={styles.headText}>
                      <Input
                        placeholder="Enter goal title"
                        placeholderTextColor="silver"
                        value={goalTitle.value}
                        required
                        widthFull
                        goalSty
                        // errorMessage="maximum 40 characters"
                        isValid={goalTitle.isValid}
                        onBlur={() => validate(goalTitle.value)}
                        onChangeText={(val) => validate(val)}
                      />
                    </View>
                  }
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                  style={{width: '100%'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: Textsizes.Medium,
                      width: scale(90),
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      minHeight: v_scale(60),
                      marginLeft: scale(20),
                    }}>
                    Category:
                  </Text>
                </TouchableOpacity>
                <DropDown
                  goalType={goalType}
                  dropWidth={0.52}
                  dropDownItems={goalTypes}
                  mod
                  position={{left: scale(110), top: v_scale(50), zIndex: 200}}
                  handleChange={(value) => {
                    setGoalType(value);
                  }}
                />
                <RichEditor
                  uploadSuccess={[uploadSuccess, setUploadSuccess]}
                  uploadErr={[uploadErr, setUploadErr]}
                  downloadUrl={[downloadUrls, setDownloadUrls]}
                  pics={[pics, setPics]}
                  vids={[vids, setVids]}
                  assetRef={[assetsRef, setAssetsRef]}
                  setTopErr={setTopErr}
                  topErr={topErr}
                  handleSaveHtml={(html) => {
                    setEditorHtml(html);
                  }}
                  updateDesc={updateDesc}
                  writeStatus={writeStatus}
                  goalTitle={goalTitle.value}
                  richText={richTextRef}
                  linkModal={linkModalRef}
                  setAssetsToDel={(val) =>
                    setAssetsToDel([val, ...assetsToDel])
                  }
                />
              </>
            ) : showGoal ? (
              showGoalComp(
                goalsData.data.filter((e) => e.created_at === showGoal),
              )
            ) : showCompleted ? (
              showCompltGoal ? (
                showGoalComp(
                  goalsData.completed.filter(
                    (e) => e.created_at === showCompltGoal,
                  ),
                  () => setShowCompltGoal(null),
                )
              ) : (
                <>
                  <View
                    style={[
                      styles.headNav,
                      {marginVertical: v_scale(15), width: scale(370)},
                    ]}>
                    <Icon
                      name="chevron-left"
                      color={Colors.AmberRed}
                      onPress={() => setShowCompleted(false)}
                      size={40}
                    />
                    <Text style={[styles.navText, {color: '#000'}]}>
                      Completed Goals
                    </Text>
                    <View />
                  </View>
                  {!!goalsData.completed.length ? (
                    completedGoalItems
                  ) : (
                    <Text
                      style={{
                        fontSize: Textsizes.Medium,
                        padding: scale(20),
                        alignSelf: 'flex-start',
                      }}>
                      No completed goals yet...
                    </Text>
                  )}
                </>
              )
            ) : (
              <>
                <Text
                  style={{
                    fontSize: Textsizes.Large,
                    fontWeight: 'bold',
                    marginVertical: v_scale(18),
                  }}>
                  Goals
                </Text>
                {!!goalsData.data.length ? (
                  goalItemsTitle
                ) : (
                  <Text
                    style={{
                      fontSize: Textsizes.Medium,
                      padding: scale(20),
                      alignSelf: 'flex-start',
                    }}>
                    No goals added yet...
                  </Text>
                )}
                <TouchableOpacity
                  style={{alignSelf: 'flex-start', margin: scale(20)}}
                  onPress={() => handleOpenModal('save')}>
                  <Text
                    style={{
                      color: Colors.AmberRed,
                      fontSize: Textsizes.xMedium,
                    }}>
                    Add Goal...
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.complWrap}
                  onPress={() => setShowCompleted(true)}>
                  <Text style={styles.complText}>Completed Goals</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  complWrap: {
    paddingVertical: v_scale(10),
    paddingHorizontal: scale(20),
    backgroundColor: Colors.AmberRed,
    borderRadius: scale(20),
  },
  complText: {
    fontSize: Textsizes.Medium,
    color: '#fff',
    fontWeight: 'bold',
  },
  innerComp: {
    position: 'relative',
    padding: scale(10),
    flexDirection: 'row',
  },
  compDate: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Regular,
    fontWeight: 'bold',
    marginBottom: scale(-20),
    paddingTop: scale(5),
    // bottom: v_scale(20),
  },
  delGoal: {
    fontSize: Textsizes.xMedium,
    fontWeight: 'bold',
    color: Colors.AmberRed,
  },
  headText: {
    width: '65%',
  },
  editorWrap: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  button: {
    marginHorizontal: scale(20),
    color: Colors.AmberRed,
    fontWeight: 'bold',
    fontSize: Textsizes.Medium,
  },
  goalHead: {
    color: Colors.AmberRed,
    fontSize: Textsizes.xMedium,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: scale(70),
    marginTop: v_scale(23),
    marginBottom: v_scale(50),
  },
  headNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(340),
    alignItems: 'center',
    marginBottom: v_scale(20),
  },
  navText: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Large,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomText: {
    marginBottom: 50,
  },
  iconLeft: {
    marginLeft: scale(-7),
  },
  comAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: scale(-20),
    paddingTop: scale(5),
  },
});
