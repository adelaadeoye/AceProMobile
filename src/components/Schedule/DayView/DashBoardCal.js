import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, View, StyleSheet, ScrollView, Text, LogBox } from 'react-native';
import EventCalendar from './EventCalendar';
import { AuthContext } from 'sm/navigation/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { v_scale, scale } from 'sm/utils/StylesConst';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { getEvents } from 'sm/screens/Training/utils/fb-saveEvents';
import Loader from 'sm/components/Loader';
import useStateWithCallback from 'sm/utils/Helpers';
import AwesomeAlert from 'react-native-awesome-alerts';

let { width } = Dimensions.get('window');

export default function DashBoardCal({ navigation }) {
  const { user } = useContext(AuthContext);

  const [showLoader, setShowLoader] = useState(true);
  const [events, setEvents] = useStateWithCallback([], () => {
    setShowLoader(false)
  });
  const [timeLine, setTimeLine] = useState({ start: 0, end: 4 });
  const [err, setErr] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(['Unhandled Promise Rejection']);
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      fetchEvent();

      return () => {
        initializeState()
      };
    }, [])
  );

  const initializeState = () => {
    setShowLoader(true)
  }

  const _eventTapped = (event) => {
    if (event?.isInvited) {
      return setErr(true)
    }
    navigation.navigate('Event', { event })
  }

  const fetchEvent = async () => {
    const runNext = (data) => {
      handleSetLimit(data)
    }

    await getEvents(user, runNext)
  }

  const handleSetLimit = (data) => {
    try {
      let start = 0, end = 4;
      for (let e of data) {
        if ((moment(e.start_date).format('L') === moment().format('L')) &&
          (+(moment(e.start_date).format('HH')) > +(moment().format('HH')))) {
          start = +(moment(e.start_date).format('HH'))
          break;
        }
      }
      end = (start + 4) > 24 ? 24 : (start + end);
      console.log('start-end', start, end);
      setTimeLine({ start, end })
      setEvents(data)
    } catch (e) {
      console.log('calendar-error', e.message);
    }
  }

  const handleSetDateChangeLim = (timeEntry) => {
    let start = 0, end = 4;
    try {
      for (let e of events) {
        if ((moment(e.start_date).format('L') === moment(timeEntry).format('L')) &&
          (+(moment(e.start_date).format('HH')) > +(moment(timeEntry).format('HH')))) {
          start = +(moment(e.start_date).format('HH'))
          break;
        }
      }
      end = (start + 4) > 24 ? 24 : (start + end);
      console.log('start-end', start, end);
      setTimeLine({ start, end });
    } catch (e) {
      console.log('calendar-error', e.message);
    }
  }

  const handleShowUpdatedEv = (timeEntry) => {
    const filtDiffCreator = events.filter(e => (moment(e.created_at).format('L') ===
      moment(timeEntry).format('L')) && e.isInvited);

  }

  return showLoader ? <Loader /> :
    <View style={{ flex: 1 }}>
      <AwesomeAlert
        show={err}
        showProgress={false}
        title="You were invited to this event. You can't edit it!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Close"
        cancelButtonColor="red"
        onCancelPressed={() => setErr(false)}
      />
      <EventCalendar
        eventTapped={_eventTapped}
        events={events}
        width={width}
        initDate={new Date()}
        scrollToFirst
        upperCaseHeader
        uppercase
        dateChanged={(entry) => handleSetDateChangeLim(entry)}
        start={timeLine.start}
        end={timeLine.end}
        scrollToFirst={false}
        navigation={navigation}
      />
    </View>
}

const styles = StyleSheet.create({
  separator: {
    height: 12
  },
  modalCont: {
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    minHeight: v_scale(300),
    width: scale(300)
  },
  modText: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Large,
    textAlign: 'center',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  infoPanel: {
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginVertical: 7,
    padding: 10,
    backgroundColor: Colors.LightAsh
  },
  infoText: {
    fontSize: Textsizes.Medium
  }
})