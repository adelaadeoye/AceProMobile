import React from 'react'
import { View, Text } from 'react-native';
import TextInfo from './TextInfo';
import { repeatTypes } from 'sm/utils/Constants';

export default function ({ handleSetRepeat, repeat }) {
  const repLen = repeatTypes.length;
  const exceptCustom = repeatTypes.slice(0, repLen - 1)
  const items = exceptCustom.map(e => <TextInfo key={e} handleShow={() => handleSetRepeat(e)}
    desc={e} info={repeat == e && '✓'} rightOrange />)

  return <View>
    {items}
    <View style={{ height: 30 }}></View>
    {/* <TextInfo handleShow={() => handleSetRepeat('repeat')} info='>'
      desc={repeatTypes[repLen - 1]} rightOrange rightDull /> */}
  </View>
}