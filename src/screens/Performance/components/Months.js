import React from 'react';
import { View, Text } from 'react-native';
import { monthTypes } from '../utils/Constant';

export default function Months () {
  return (<View style={{marginLeft: 10}}>
    {monthTypes.map((month) => { return (<Text key={month} style={{color: "#e35540", fontSize: 17, fontWeight: 'bold', padding: 5 }}>{month}</Text>) })}
  </View>)
}
