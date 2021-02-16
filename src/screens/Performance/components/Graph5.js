import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { graph1_width, graph3_height, graph1_bars_width, } from '../utils/Constant';
import { getHeight, graph1_data } from '../utils';
import graph5_data from 'sm/placeholders/graph5';

export default function Graph5 () {
  var numbers = [0, 1, 2, 3, 4, 5];
  numbers = numbers.reverse()

  return (<View overflow="hidden" style={{ borderRadius: 3, marginVertical: 10, width: graph1_width, alignSelf: 'center', height: graph3_height, borderWidth: 1, borderColor: '#f4b7ae' }}>
    <View style={styles.side_bar_2}>
      {numbers.map((number) => { return (<Text key={number} style={{ color: '#e35540', paddingVertical: 5, paddingLeft: 8 }}>{number}</Text>) })}
    </View>
    <View style={styles.dates}>
      {graph5_data.days.map((date, index) => { return (<Text key={index} style={{ color: '#e35540', fontSize: 11, paddingVertical: 8 }}>{date.year}</Text>) })}
    </View>
    <View style={styles.bars}>
      {graph1_data.map((bars, index) => {
        return (<View key={index} style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ width: graph1_bars_width, height: getHeight(bars.coach, graph3_height), backgroundColor: '#e35540' }} />
          <View style={{ width: graph1_bars_width, height: getHeight(bars.athlete, graph3_height), backgroundColor: "#9a12b3" }} />
        </View>)
      })}
    </View>
  </View>)
}

const styles = StyleSheet.create({
  bars: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 50,
    left: 50,
    marginHorizontal: 5,
    width: graph1_width - 50,
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
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
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#e35540',
    bottom: 0,
    marginLeft: 0,
    paddingLeft: 50,
    width: graph1_width
  },
})