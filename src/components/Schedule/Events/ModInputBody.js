import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Divider from 'sm/components/Divider';
import Icon from 'react-native-vector-icons/AntDesign';
import TrashIcon from './TrashIcon';
import {windowWidth} from 'sm/utils/Dimensions';
import Textsizes from 'sm/utils/Textsizes';
import Input from 'sm/components/FormInput';
import {scale, v_scale} from 'sm/utils/StylesConst';
import {validateText} from 'sm/utils/Helpers';
import Colors from 'sm/utils/Colors';
import {useFocusEffect} from '@react-navigation/native';
import DropDown from 'sm/components/DropDown';
import total from 'sm/assets/total.png';
import hours from 'sm/assets/hours.png';
import lbs from 'sm/assets/lbs.png';

export const metUnitTypes = {
  Count: ['Total', 'Percent'],
  Time: ['Seconds', 'Minutes'],
  Weight: ['Lbs', 'Kgs'],
};

const metImg = {
  Count: total,
  Time: hours,
  Weight: lbs,
};

export default function ({
  setScores,
  scores,
  modInput,
  setModInput,
  topTab,
  handleGoBack,
  handleSaveOrEditMod,
  writeStat,
  showModName,
  details = {},
  editor,
}) {
  const [metricInput, setMetricInput] = useState({
    text: {val: '', isValid: null},
    metricType: 'Metric Type',
    unit: 'Select Unit',
    isVisible: false,
  });

  let updScores = [];
  if (writeStat === 'edit') {
    const {metrics = []} = details;
    updScores = metrics;
  }

  useFocusEffect(
    React.useCallback(() => {
      if (writeStat === 'edit')
        setModInput({value: showModName, isValid: true, isDisabled: false});

      return () => {
        if (writeStat === 'edit')
          setModInput({value: '', isValid: null, isDisabled: false});
      };
    }, []),
  );

  const validate = (val) =>
    setModInput({
      ...modInput,
      value: val,
      isValid: validateText(val, 40, 'symbol'),
    });

  const handleRemoveMet = (metric) =>
    setScores(scores.filter((e) => e.title !== metric.title));

  const handleAddMetric = () => {
    setScores([
      ...scores,
      {
        title: text.val,
        metricType,
        unit,
      },
    ]);
    setMetricInput({
      text: {val: '', isValid: null},
      metricType: 'Metric Type',
      unit: 'Select Unit',
      isVisible: false,
    });
  };

  const addScoreItems = scores.map((e) => (
    <View key={e.title} style={styles.scoreWrap}>
      <View style={styles.textIconWrap}>
        <Text style={[styles.athScore, {width: '40%', marginRight: scale(10)}]}>
          {e.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '30%',
            justifyContent: 'flex-start',
            marginRight: scale(30),
          }}>
          <Image
            source={metImg[e.metricType]}
            resizeMode="contain"
            style={{width: scale(40), height: v_scale(40)}}
          />
          <Text style={styles.athScore}>{e.unit}</Text>
        </View>
        {!e.fixed ? (
          <TrashIcon
            name="trash"
            size={20}
            onPress={() => handleRemoveMet(e)}
          />
        ) : (
          <View />
        )}
      </View>
    </View>
  ));

  const updScoreItems = updScores.map((e) => (
    <View key={e.title} style={styles.scoreWrap}>
      <View style={styles.textIconWrap}>
        <Text style={[styles.athScore, {width: '40%', marginRight: scale(10)}]}>
          {e.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '30%',
            justifyContent: 'flex-start',
            marginRight: scale(30),
          }}>
          <Image source={metImg[e.metricType]} resizeMode="contain" />
          <Text style={styles.athScore}>{e.unit}</Text>
        </View>
        {!e.fixed ? (
          <TrashIcon
            name="trash"
            size={20}
            onPress={() => handleRemoveMet(e)}
          />
        ) : (
          <View />
        )}
      </View>
    </View>
  ));

  const {text, metricType, unit, isVisible} = metricInput;

  // console.log('mett', metricInput);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {topTab ? (
          <Icon
            name="left"
            color={Colors.AmberRed}
            onPress={handleGoBack}
            size={30}
            style={styles.icon}
          />
        ) : (
          <View />
        )}
        <View style={{width: '63%'}}>
          <Input
            placeholder="Module Name"
            placeholderTextColor={topTab ? Colors.AmberRed : 'grey'}
            value={modInput.value}
            required
            widthFull
            isValid={modInput.isValid}
            onBlur={() => validate(modInput.value)}
            onChangeText={(val) => validate(val)}
          />
        </View>
        {topTab ? (
          <TouchableOpacity
            onPress={() => handleSaveOrEditMod(updScores, modInput.value)}
            disabled={modInput.isDisabled}
            style={styles.button}>
            <Text
              style={[
                {color: Colors.AmberRed, fontSize: Textsizes.xMedium},
                styles.icon2,
              ]}>
              {writeStat === 'new' ? 'Save' : 'Update'}
            </Text>
            {modInput.isDisabled && <ActivityIndicator color="grey" />}
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <Divider />
      <View
        style={[
          styles.textIconWrap,
          {marginTop: v_scale(15), marginBottom: v_scale(5)},
        ]}>
        <Text
          style={[
            styles.athScore,
            {
              fontSize: Textsizes.xMedium,
              width: '40%',
              marginRight: scale(17),
            },
          ]}>
          Metrics
        </Text>
        <Text
          style={[
            styles.athScore,
            {
              fontSize: Textsizes.xMedium,
              width: '40%',
            },
          ]}>
          Units
        </Text>
        <View />
      </View>
      {writeStat === 'edit' ? updScoreItems : addScoreItems}
      {!isVisible && (
        <Text
          style={{
            color: Colors.AmberRed,
            fontSize: Textsizes.Medium,
            marginBottom: v_scale(20),
            marginLeft: scale(23),
          }}
          onPress={() => setMetricInput({...metricInput, isVisible: true})}>
          Add metricsdfr...
        </Text>
      )}
      {isVisible && (
        <View
          style={{
            margin: scale(10),
            marginBottom: v_scale(20),
            position: 'relative',
            zIndex: 200,
            marginBottom: v_scale(80),
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
              onPress={handleAddMetric}
              style={{
                alignSelf: 'flex-end',
                borderRadius: 10,
                marginRight: scale(10),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: Textsizes.Medium,
                  backgroundColor: Colors.AmberRed,
                  paddingHorizontal: scale(10),
                  paddingVertical: v_scale(10),
                }}
                disabled={!text.isValid}>
                Save
              </Text>
            </TouchableOpacity>
          )}
          { (
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
      {editor}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {},
  athScore: {
    fontSize: Textsizes.Medium,
    marginTop: 10,
    paddingBottom: 13,
  },
  input: {
    color: 'gray',
    height: 40,
  },
  textIconWrap: {
    alignItems: 'center',
    width: windowWidth * 0.88,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignSelf: 'center',
  },
  scoreWrap: {
    marginBottom: v_scale(10),
  },
  iconWrap: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    width: 25,
    height: 25,
    // marginRight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMinus: {
    // marginRight: 5
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: v_scale(10),
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  pastScoreWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    marginLeft: scale(10),
  },
  icon2: {
    marginRight: scale(10),
  },
  pastText: {
    fontSize: Textsizes.Medium,
    color: 'grey',
    textAlign: 'left',
    marginLeft: scale(25),
  },
  vidWrap: {
    alignSelf: 'center',
    width: windowWidth * 0.88,
  },
  bottomText: {
    marginBottom: 50,
  },
});
