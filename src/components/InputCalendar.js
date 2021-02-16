import React from 'react';
import { StyleSheet, Platform } from 'react-native'
import moment from 'moment';
// import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scale } from 'sm/utils/StylesConst';

export default function InputCal({ onSelect, setisVisible, mode = 'date', display = "default",
  defaultDate = new Date('1990'), value, ...props }) {

  return <DateTimePicker
    value={(value && new Date(value)) || defaultDate}
    mode={mode}
    is24Hour={false}
    display={display}
    dateFormat='longdate'
    onChange={(event, selectedDate) => {
      setisVisible();
      if ((mode === 'date') || (mode === 'calendar')) {
        let day = moment(selectedDate || new Date()).format('MM/DD/YYYY')
        onSelect(day);
      } else {
        let time = moment(selectedDate || new Date()).format('h:mm A')
        onSelect(time)
      }
    }}
    {...props}
  />
}
