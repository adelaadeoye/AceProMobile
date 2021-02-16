import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, ScrollView, Text, LogBox } from 'react-native';
import EventCalendar from './EventCalendar';
import { v_scale, scale } from 'sm/utils/StylesConst';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import Loader from 'sm/components/Loader';
import AwesomeAlert from 'react-native-awesome-alerts';

let { width } = Dimensions.get('window');

export default function Calendar({ navigation, events, showLoader }) {
  const [err, setErr] = useState(false);

  const _eventTapped = (event) => {
    if (event?.isInvited) {
      return setErr(true)
    }
    navigation.navigate('Event', { event })
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