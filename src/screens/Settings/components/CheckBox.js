import React from 'react'
import CheckBox from '@react-native-community/checkbox';
import Colors from 'sm/utils/Colors';

export default function Check(state, setNotif, setCheckState, value) {
  return <CheckBox
    // disabled={false}
    onCheckColor={Colors.AmberRed}
    tintColors={{ true: Colors.AmberRed }}
    value={state.includes(value)}
    onValueChange={() => setNotif(value, setCheckState, state)}
  />
}