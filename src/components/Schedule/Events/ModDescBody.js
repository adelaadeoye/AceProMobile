import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Divider from 'sm/components/Divider';
import Textsizes from 'sm/utils/Textsizes';
import Colors from 'sm/utils/Colors';
import {scale, v_scale} from 'sm/utils/StylesConst';
import Icon from 'react-native-vector-icons/Feather';
import VideoTab from 'sm/components/VideoTab';
import {windowWidth} from 'sm/utils/Dimensions';
import HTML from 'react-native-render-html';
import {WebView} from 'react-native-webview';
import loading from 'sm/assets/loading.gif';
import total from 'sm/assets/total.png';
import hours from 'sm/assets/hours.png';
import lbs from 'sm/assets/lbs.png';
import TrashIcon from './TrashIcon';
import DropDown from 'sm/components/DropDown';
import Input from 'sm/components/FormInput';

const metUnitTypes = {
  Count: ['Total', 'Percent'],
  Time: ['Seconds', 'Minutes'],
  Weight: ['Lbs', 'Kgs'],
};

export const metImg = {
  Count: total,
  Time: hours,
  Weight: lbs,
};

export default function ({
  details = {},
  handleGoBack,
  shouldUpdate,
  topTab,
  addMet,
  removeMet,
  setRemoveLoading,
  removeLoading,
}) {
  const [metricInput, setMetricInput] = useState({
    text: {val: '', isValid: null},
    metricType: 'Metric Type',
    unit: 'Select Unit',
    isVisible: false,
  });
  console.log('dets', JSON.stringify(details, null, 2));

  let {
    title = 'No title',
    description = 'No description',
    assets = [],
    metrics = [],
  } = details;

  const {text, metricType, unit, isVisible} = metricInput;

  const handleRemoveMet = (metric) =>
    removeMet(metric, () => setRemoveLoading(''));

  const handleAddMetric = () => {
    const metric = {title: text.val, metricType, unit};
    setRemoveLoading({...removeLoading, add: true});
    addMet(metric, () =>
      setMetricInput({
        text: {val: '', isValid: null},
        metricType: 'Metric Type',
        unit: 'Select Unit',
        isVisible: false,
      }),
    );
  };

  const scoreItems = metrics.map((e) => (
    <View key={JSON.stringify(e)} style={styles.scoreWrap}>
      <Text
        style={[
          {
            fontSize: Textsizes.Regular,
            marginLeft: scale(30),
            width: scale(170),
            margin: 0,
          },
        ]}>
        {e.title}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={metImg[e.metricType]}
          style={{width: scale(37), height: v_scale(37)}}
        />
        <Text
          style={[
            {
              margin: 0,
              width: scale(90),
              fontSize: Textsizes.Regular,
              marginRight: scale(30),
            },
          ]}>
          {e.unit}
        </Text>
        {!e.fixed && (
          <TrashIcon
            name="trash"
            size={20}
            onPress={() => {
              setRemoveLoading({remove: e.title, ...removeLoading});
              handleRemoveMet(e);
            }}
            removeLoading={removeLoading.remove === e.title}
          />
        )}
      </View>
    </View>
  ));

  const assetItems = (assets || []).map((i) =>
    i.mediaType == 'image' ? (
      <Image
        key={i.file}
        source={{uri: i.file}}
        loadingIndicatorSource={loading}
        resizeMode="contain"
        style={{
          width: windowWidth * 0.88,
          height: v_scale(250),
          borderWidth: 2,
          marginVertical: v_scale(20),
        }}
      />
    ) : (
      <VideoTab
        key={i.file}
        source={i.file}
        style={{width: windowWidth * 0.88, marginVertical: v_scale(20)}}
      />
    ),
  );

  const DEFAULT_PROPS = {
    WebView,
    onLinkPress(evt, href) {
      Linking.openURL(href);
    },
  };

  return (
    <View style={{minHeight: v_scale(300), justifyContent: 'center'}}>
      <View style={styles.topBar}>
        {topTab ? (
          <Icon
            name="chevron-left"
            color={Colors.AmberRed}
            onPress={handleGoBack}
            size={40}
            style={styles.icon}
          />
        ) : (
          <View />
        )}
        <Text style={[styles.topText, topTab && {color: Colors.AmberRed}]}>
          {title}
        </Text>
        {topTab ? (
          <Icon
            name="edit-2"
            color={Colors.AmberRed}
            onPress={() => shouldUpdate(true)}
            size={30}
            style={styles.icon2}
          />
        ) : (
          <View />
        )}
      </View>
      <Divider />
      {scoreItems}
      {!isVisible && (
        <Text
          style={{
            color: Colors.AmberRed,
            fontSize: Textsizes.Medium,
            marginLeft: scale(30),
          }}
          onPress={() => setMetricInput({...metricInput, isVisible: true})}>
          Add metrics...
        </Text>
      )}
      {isVisible && (
        <View
          style={{
            marginTop: v_scale(10),
            marginHorizontal: scale(10),
            minHeight: v_scale(120),
            position: 'relative',
            zIndex: 200,
          }}>
          <View style={{width: '98%', justifyContent: 'center'}}>
            <Input
              placeholder="Metric Name"
              placeholderTextColor="grey"
              value={text.val}
              required
              widthFull
              isValid={text.isValid}
              onBlur={() =>
                setMetricInput({
                  ...metricInput,
                  text: {...text, isValid: !!text.val},
                })
              }
              onChangeText={(val) =>
                setMetricInput({
                  ...metricInput,
                  text: {...text, val: val},
                })
              }
            />
          </View>
          {unit !== 'Select Unit' && (
            <TouchableOpacity
              style={{
                backgroundColor: Colors.AmberRed,
                paddingVertical: v_scale(10),
                borderRadius: 10,
                paddingHorizontal: scale(15),
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{color: '#fff', fontSize: Textsizes.Medium}}
                disabled={!text.isValid}
                onPress={handleAddMetric}>
                Save
              </Text>
              {removeLoading.add && (
                <ActivityIndicator size="small" color="#fff" />
              )}
            </TouchableOpacity>
          )}
          {isVisible && (
            <DropDown
            goalType={metricType}
            dropWidth={0.35}
            imgs={metImg}
            withImgs
            dropDownItems={['Count', 'Time', 'Weight']}
            mod
            position={{left: 0, top: v_scale(35), zIndex: 200}}
            handleChange={(value) =>
              setMetricInput({
                ...metricInput,
                metricType: value,
              })
            }
          />
          )}
          {metricType !== 'Metric Type' && (
            <DropDown
              goalType={unit}
              dropWidth={0.35}
              dropDownItems={metUnitTypes[metricType]}
              mod
              position={{left: scale(150), top: v_scale(35), zIndex: 200}}
              handleChange={(value) =>
                setMetricInput({
                  ...metricInput,
                  unit: value,
                })
              }
            />
          )}
        </View>
      )}
      <Divider />
      <View style={styles.vidWrap}>
        {assetItems}
        <HTML
          {...DEFAULT_PROPS}
          source={{html: description}}
          containerStyle={styles.bottomText}
          baseFontStyle={{fontSize: Textsizes.Regular}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topText: {
    fontWeight: 'bold',
    fontSize: Textsizes.Large,
    textAlign: 'center',
    width: scale(280),
  },
  togglWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: v_scale(20),
  },
  togglTab: {
    backgroundColor: Colors.AmberRed,
    paddingHorizontal: scale(50),
    paddingVertical: v_scale(17),
    marginHorizontal: scale(10),
  },
  togglText: {
    fontSize: Textsizes.Medium,
    fontWeight: 'bold',
    color: '#fff',
  },
  athScore: {
    marginLeft: 30,
    marginTop: 15,
    alignSelf: 'center',
    fontSize: Textsizes.Medium,
  },
  scoreWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginBottom: v_scale(10),
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: v_scale(10),
  },
  icon: {
    marginLeft: scale(10),
  },
  icon2: {
    marginRight: scale(10),
  },
  vidWrap: {
    alignSelf: 'center',
    width: scale(345),
  },
  bottomText: {
    marginBottom: 50,
  },
});
