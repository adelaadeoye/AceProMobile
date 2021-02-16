import React from 'react'
import { View, StyleSheet } from 'react-native';
import { getHeight, getLineHeight, getLineRotation } from '../utils';
import { graph1_width, graph3_title, graph3_height } from '../utils/Constant';

export default function LinedHoles({ values, color }) {
  return <View style={styles.holes}>
    <View style={{ position: "absolute", width: graph1_width, borderColor: color, bottom: getHeight(getLineHeight(values), graph3_height), borderWidth: 1, transform: [{ rotate: `${getLineRotation(values)}deg` }] }} />
    {values.map((holes, index) => { return (<View key={index} style={{ bottom: getHeight(holes, graph3_height), width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: color, borderWidth: 2 }} />) })}
  </View>
}

const styles = StyleSheet.create({
  holes: {
    position: 'absolute',
    flexDirection: 'row',
    width: graph1_width - 50,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    left: 50,
    bottom: 50
  }
})