import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {ScrollView, Text, View, StyleSheet, Platform} from 'react-native';
import TrainingModCont from './TrainingModConts';
import Input from 'sm/components/FormInput';
import TextInfo from './TextInfo';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import {v_scale, scale} from 'sm/utils/StylesConst';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import InputCalendar from 'sm/components/InputCalendar';
import AwesomeAlert from 'react-native-awesome-alerts';
import {loadDefaults} from 'sm/screens/Training/utils/fb-modulesHandler';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ({
  repeat,//
  handleShowRepeat,//
  handleShowAddMod,//
  handleTogglDrop,//
  handleRemoveMod,//
  handleCollpAll,//
  startDate,//
  err,//
  setErr,//
  setStartDate,//
  setStartTime,//
  setEndDate,//
  setEndTime,//
  startTime,//
  endDate,//
  endTime,//
  form,//
  validate,//
  addedMods,//
  setAddedMods,//
  time,
  writeStat,//
  inviteesPool,//
  invitees,//
  setInvitees,//
  eventDesc,
}) {
  const [{type: modType, val: modVal}, setModalVisible] = useState({
    val: false,
    type: 'Event Type',
  });
  const [{val: calStartVal}, setShowStartCalendar] = useState({
    val: Platform.OS == 'ios',
  });
  const [{val: calEndVal}, setShowEndCalendar] = useState({
    val: Platform.OS == 'ios',
  });
  const [showStartIos, setShowStartIos] = useState(false);
  const [showEndIos, setShowEndIos] = useState(false);
  const [modules, setModules] = useState({});

  const {title, location, eventType} = form;

  useFocusEffect(
    React.useCallback(() => {
      if (!eventDesc) {
        initializeState();
        fetchModules();
      }

      return () => {};
    }, []),
  );

  const initializeState = () => {
    setModalVisible({val: false, type: 'Event Type'});
    setShowStartCalendar({val: Platform.OS === 'ios'});
    setShowEndCalendar({val: Platform.OS === 'ios'});
  };

  const pickEventType = (val) => {
    setModalVisible({val: false});
    validate(val, 'eventType');
  };

  const pickInvitees = (val) => {
    setInvitees(val);
    // setModalVisible({val: false});
  };

  const fetchModules = async () => {
    const runNext = (data) => {
      // console.log('modules', data);
      setModules(...modules, {
        titles: {
          catTitle: data.modCategoryTitles,
          subCatTitle: data.modSubCategoryTitles,
        },
      });
    };
    await loadDefaults(user, runNext);
  };

  // console.log('Invites', invitees);
  const inviteesItems = inviteesPool.map((e) => {
    const desc =
      e === 'None'
        ? e
        : !e?.first_name && !e?.last_name
        ? e.email
        : `${e.first_name || ''} ${e.last_name || ''}`;
    return (
      <TextInfo
        key={JSON.stringify(e)}
        rightDull
        desc={desc}
        center
        handleShow={() => pickInvitees(e)}
        info={
          invitees.some((val) =>
            e === 'None' ? e === val : e.email === val.email,
          ) && '✓'
        }
      />
    );
  });
  // console.log('time', moment(`${endDate} ${endTime}`).format('llll'));
  const [Startdate, setStarDate] = useState(new Date());
  const [Starttime, setStarTime] = useState(new Date());
  const [modeStart, setModeStart] = useState('date');
  const [showStart, setShowStart] = useState(false);

  const onChangeStart = (event, selectedValue) => {
    setShowStart(Platform.OS === 'ios');
    if (modeStart == 'date') {
      const currentDate = selectedValue || new Date();
      setStarDate(currentDate);
      setModeStart('time');
      setShowStart(Platform.OS !== 'ios');
    } else {
      const selectedTime = selectedValue || new Date();
      setStarTime(selectedTime);
      setShowStart(Platform.OS === 'ios');
      setModeStart('date');
    }
  };

  const showModeStart = (currentMode) => {
    setShowStart(true);
    setModeStart(currentMode);
  };

  const showDatepickerStart = () => {
    showModeStart('date');
  };

  useEffect(() => {
    validate(
      moment(Startdate || new Date()).format('MM/DD/YYYY'),
      'starts',
      'date',
    );
    validate(
      moment(Starttime || new Date()).format('h:mm A'),
      'starts',
      'time',
    );
  }, [Starttime]);
  //End
  const [Enddate, setendDate] = useState(new Date());
  const [Endtime, setendTime] = useState(moment().add(1, 'hours').format('LTS'));
  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);
  const onChangeEnd = (event, selectedValue) => {
    setShowEnd(Platform.OS === 'ios');
    if (modeEnd == 'date') {
      const currentDate = selectedValue || new Date();
      setendDate(currentDate);
      setModeEnd('time');
      setShowEnd(Platform.OS !== 'ios');
    } else {
      const selectedTime = selectedValue || new Date();
      setendTime(selectedTime);
      setShowStart(Platform.OS === 'ios');
      setModeEnd('date');
    }
  };

  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setShowEnd(currentMode);
  };

  const showDatepickerEnd = () => {
    showModeEnd('date');
  };

  useEffect(() => {
    validate(moment(Enddate).format('MM/DD/YYYY'), 'ends', 'date');
    validate(moment(Endtime).format('h:mm A'), 'ends', 'time');
  }, [Endtime]);
  return (
    <ScrollView>
      <AwesomeAlert
        show={err?.val}
        showProgress={false}
        title={err.message || 'There is an error'}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Close"
        cancelButtonColor="red"
        onCancelPressed={() => setErr({val: false})}
      />
      <Modal
        isVisible={modVal}
        backdropColor="#000"
        backdropOpacity={0.3}
        onBackdropPress={() => setModalVisible({val: false})}>
        <View style={styles.modalCont}>
          <ScrollView style={{padding: 30}}>
            <Text style={styles.modText}>{modType}</Text>
            {modType === 'Event Type' ? (
              <View>
                <TextInfo
                  rightDull
                  desc="Private Lesson"
                  center
                  handleShow={() => pickEventType('Private Lesson')}
                  info={eventType.value == 'Private Lesson' && '✓'}
                />
                <View style={{marginBottom: 10}} />
                <TextInfo
                  rightDull
                  desc="Training"
                  center
                  handleShow={() => pickEventType('Training')}
                  info={eventType.value == 'Training' && '✓'}
                />
              </View>
            ) : (
              <View>{inviteesItems}</View>
            )}
          </ScrollView>
        </View>
      </Modal>
      {eventDesc ? (
        <TextInfo desc={title} eventDesc={eventDesc} handleShow={() => {}} />
      ) : (
        <Input
          value={title.value}
          required
          placeholder="Title"
          isValid={title.isValid}
          placeholderTextColor="grey"
          custStyles={customStyles}
          errorMessage="minimum 2 characters"
          onBlur={() => validate(title.value, 'title')}
          onChangeText={(val) => validate(val, 'title')}
        />
      )}
      {eventDesc ? (
        <TextInfo desc={location} eventDesc={eventDesc} handleShow={() => {}} />
      ) : (
        <Input
          value={location.value}
          placeholder="Location"
          isValid={location.isValid}
          placeholderTextColor="grey"
          custStyles={customStyles}
          errorMessage="minimum 2 characters"
          onBlur={() => validate(location.value, 'location')}
          onChangeText={(val) => validate(val, 'location')}
        />
      )}
      <TextInfo
        rightDull
        desc="Event Type"
        info={`${eventDesc ? eventType : eventType.value}`}
        eventDesc={eventDesc}
        handleShow={() => setModalVisible({val: true, type: 'Event Type'})}
      />
      <TextInfo
        rightDull
        eventDesc={eventDesc}
        desc="Invitees"
        info={`${
          eventDesc
            ? invitees
            : invitees
                .map((e) =>
                  e.first_name || e.last_name
                    ? `${e.first_name} ${e.last_name}`
                    : e,
                )
                .join(',')
        }`}
        handleShow={() => setModalVisible({val: true, type: 'Invitees'})}
      />
      <View style={styles.separator} />
      <TextInfo
        desc="Starts"
        compDate={
          <>
            {showStart && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={Startdate}
                mode={modeStart}
                is24Hour={false}
                display="default"
                onChange={onChangeStart}
              />
            )}
          </>
        }
        info={
          eventDesc
            ? moment(time?.start).format('llll')
            : !!startDate && !!startTime
            ? moment(`${startDate} ${startTime}`).format('llll')
            : `${startDate || (Platform.OS !== 'ios' ? 'Choose date' : '')} | ${
                startTime || (Platform.OS !== 'ios' ? 'Choose time' : '')
              }`
        }
        handleShow={() => {
          showDatepickerStart();
        }}
      />
      <TextInfo
        disabled={eventDesc ? false : !startDate || !startTime}
        desc="Ends"
        eventDesc={eventDesc}
        compDate={
          <>
            {showEnd && (
              <DateTimePicker
                testID="dateTimePicker"
                value={Enddate}
                mode={modeEnd}
                is24Hour={false}
                display="default"
                onChange={onChangeEnd}
              />
            )}
          </>
        }
        info={
          // moment(`${startTime}`).format('LT')
          moment(`${endDate} ${endTime}`).format('llll')

          // eventDesc
          //   ? moment(time?.end).format('LT')
          //   : !!endTime
          //   ? moment(`${endDate} ${endTime}`).format('llll')
          //   : `${endTime || (Platform.OS !== 'ios' ? 'Choose time' : '')}`
        }
        handleShow={() => {
          showDatepickerEnd();
        }}
        handleErr={() =>
          setErr({val: true, message: 'Please set start date and time!'})
        }
      />

      <TextInfo
        eventDesc={eventDesc}
        desc="Repeat"
        rightDull
        info={`${repeat}`}
        handleShow={handleShowRepeat}
      />
      <View style={styles.separator} />
      <TrainingModCont
        handleShowAddMod={handleShowAddMod}
        handleCollpAll={handleCollpAll}
        handleTogglDrop={handleTogglDrop}
        handleRemoveMod={handleRemoveMod}
        eventDesc={eventDesc}
        addedMods={addedMods}
        disabled={eventDesc || addedMods.length === 5}
        writeStat={writeStat}
        setAddedMods={setAddedMods}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  modalCont: {
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    minHeight: v_scale(300),
    width: scale(270),
  },
  modText: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Large,
    textAlign: 'center',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
});

const customStyles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.Pink,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    height: v_scale(60),
    marginHorizontal: 4,
  },
};
