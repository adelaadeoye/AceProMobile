import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { getHeight, graph1_data } from '../utils';
import { graph1_width, graph1_height, graph1_bars_width } from '../utils/Constant'

export default function Graph1() {
  let numbers = [0, 2, 4, 6, 8, 10];
  numbers = numbers.reverse()
  return (<View overflow="hidden" style={{ borderRadius: 3, marginVertical: 10, width: graph1_width, alignSelf: 'center', height: graph1_height, borderWidth: 1, borderColor: '#f4b7ae' }}>
    <View style={styles.side_bar_l}>
      {numbers.map((number) => { return (<Text key={number} style={{ color: '#e35540', paddingVertical: 5, paddingRight: 15 }}>{number}</Text>) })}
    </View>
    <View style={styles.dates}>
      {graph1_data.map((date) => { return (<Text key={date.date} style={{ color: '#e35540', marginHorizontal: 5, fontSize: 11, paddingVertical: 8 }}>{date.date}</Text>) })}
    </View>
    <View style={styles.bars}>
      {graph1_data.map((bars, index) => {
        return (<View key={index} style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ width: graph1_bars_width, height: getHeight(bars.coach, graph1_height), backgroundColor: '#e35540' }} />
          <View style={{ width: graph1_bars_width, height: getHeight(bars.athlete, graph1_height), backgroundColor: "#f0a69b" }} />
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
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  side_bar_l: {
    position:'absolute',
    height: graph1_height,
    justifyContent:'space-between',
    alignItems: 'center',
    borderRightWidth:1,
    borderColor:'#e35540',
    width:50,
    paddingBottom:50,
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

})
