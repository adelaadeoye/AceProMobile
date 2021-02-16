import React from 'react'
import { View, StyleSheet } from 'react-native';
import { windowWidth } from 'sm/utils/Dimensions';

export default function ({ color }) {
  return <View style={[styles.separator, color && { borderColor: color, marginTop: 2 }]} />
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 20,
    borderWidth: 0.3,
    width: windowWidth * 0.8,
    borderColor: '#CFD1D3',
    alignSelf: 'center'
  }
})