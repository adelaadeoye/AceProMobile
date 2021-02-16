import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getHeight, graph1_data, getLineHeight, getLineRotation } from '../utils';
import { graph1_width, graph3_title, graph3_height } from '../utils/Constant';
import graph3_data from 'sm/placeholders/graph3';
import LinedHoles from './LinedHoles';

export default function Graph3() {
  var numbers = [0, 2, 4, 6, 8, 10];
  numbers = numbers.reverse()

  const colors = ['#e5604c', '#7e40e3', '#d640e3', '#f3a7a7', '#fad247'];
  const dataKeys = Object.keys(graph3_data);
  const items = dataKeys.map((e, i) => <LinedHoles key={e} values={graph3_data[e]} color={colors[i]} />);

  return (<View
    style={{ overflow: 'hidden', borderRadius: 3, marginVertical: 10, width: graph1_width, alignSelf: 'center', height: graph3_height, borderWidth: 1, borderColor: '#f4b7ae' }}>
    <View style={styles.side_bar_2}>
      {numbers.map((number) => { return (<Text key={number} style={{ color: '#e35540', paddingVertical: 5, paddingLeft: 8 }}>{number}</Text>) })}
    </View>
    <View style={styles.dates}>
      {graph1_data.map((date) => { return (<Text key={date.date} style={{ color: '#e35540', marginHorizontal: 5, fontSize: 11, paddingVertical: 8 }}>{date.date}</Text>) })}
    </View>
      {items}
    {/* <View style={styles.holes}>
      <View style={{ position: "absolute", width: graph1_width, borderColor: '#e5604c', bottom: getHeight(getLineHeight(graph3_data.serving), graph3_height), borderWidth: 1, transform: [{ rotate: `${getLineRotation(graph3_data.serving)}deg` }] }} />
      {graph3_data.serving.map((holes, index) => { return (<View key={index} style={{ postion: 'absolute', bottom: getHeight(holes, graph3_height), width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: '#e5604c', borderWidth: 2 }} />) })}
    </View>
    <View style={styles.holes}>
    <View style={{ position: "absolute", width: graph1_width, borderColor: '#7e40e3', bottom: getHeight(getLineHeight(graph3_data.returning), graph3_height), borderWidth: 1, transform: [{ rotate: `${getLineRotation(graph3_data.returning)}deg` }] }} />
      {graph3_data.returning.map((holes, index) => { return (<View key={index} style={{ bottom: getHeight(holes, graph3_height), width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: '#7e40e3', borderWidth: 2 }} />) })}
    </View>
    <View style={styles.holes}>
    <View style={{ position: "absolute", width: graph1_width, borderColor: '#d640e3', bottom: getHeight(getLineHeight(graph3_data.bothBack), graph3_height), borderWidth: 1, transform: [{ rotate: `${getLineRotation(graph3_data.bothBack)}deg` }] }} />
      {graph3_data.bothBack.map((holes, index) => { return (<View key={index} style={{ bottom: getHeight(holes, graph3_height), width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: '#d640e3', borderWidth: 2 }} />) })}
    </View>
    <View style={styles.holes}>
    <View style={{ position: "absolute", width: graph1_width, borderColor: '#f3a7a7', bottom: getHeight(getLineHeight(graph3_data.atNet), graph3_height), borderWidth: 1, transform: [{ rotate: `${getLineRotation(graph3_data.atNet)}deg` }] }} />
      {graph3_data.atNet.map((holes, index) => { return (<View key={index} style={{ bottom: getHeight(holes, graph3_height), width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: '#f3a7a7', borderWidth: 2 }} />) })}
    </View>
    <View style={styles.holes}>
    <View style={{ position: "absolute", width: graph1_width, borderColor: '#fad247', bottom: getHeight(getLineHeight(graph3_data.opponentAtNet), graph3_height), borderWidth: 1, transform: [{ rotate: `${getLineRotation(graph3_data.opponentAtNet)}deg` }] }} />
      {graph3_data.opponentAtNet.map((holes, index) => { return (<View key={index} style={{ bottom: getHeight(holes, graph3_height), width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: '#fad247', borderWidth: 2 }} />) })}
    </View> */}
  </View>)
}

const styles = StyleSheet.create({
  side_bar_2: {
    position: 'absolute',
    height: graph3_height,
    justifyContent: 'space-between',
    borderRightWidth: 1,
    borderColor: '#e35540',
    width: 50,
    paddingBottom: 50,
  },
  dates: {
    position: 'absolute',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#e35540',
    bottom: 0,
    marginLeft: 0,
    paddingLeft: 50,
    width: graph1_width
  },
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