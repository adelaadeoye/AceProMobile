import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { graph3_height, graph1_width } from '../utils/Constant';
import { getHeight2 } from '../utils';
import graph4_data from 'sm/placeholders/graph4';

export default function Graph4() {
  var numbers = [0, 30, 60, 90, 120, 150];
  numbers = numbers.reverse()

  return (<View overflow="hidden" style={{ borderRadius: 3, marginVertical: 10, width: graph1_width, alignSelf: 'center', height: graph3_height, borderWidth: 1, borderColor: '#f4b7ae' }}>
    <View style={styles.side_bar_2}>
      {numbers.map((number) => { return (<Text key={number} style={{ color: '#e35540', paddingVertical: 5, paddingLeft: 8 }}>{number}</Text>) })}
    </View>
    <View style={styles.dates}>
      {graph4_data.map((date) => { return (<View key={date.year} style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 13 }}>
        <Text style={{ width: 30, color: '#e35540', fontSize: 11, paddingVertical: 8 }}>{date.year}</Text>
      </View>) })}
    </View>
    <View style={styles.bars}>
      {graph4_data.map((bars, index) => {
        return (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 30, height: getHeight2(bars.score, graph3_height), backgroundColor: '#e35540' }} />
        </View>)
      })}
    </View>
  </View>)
}

const styles = StyleSheet.create({
  dates: {
    position: 'absolute',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#e35540',
    bottom: 0,
    left: 50,
    width: graph1_width - (graph1_width * 0.15),
  },
  bars: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 50,
    left: 50,
    marginHorizontal: 5,
    width: graph1_width - (graph1_width * 0.15),
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  side_bar_2: {
    position: 'absolute',
    height: graph3_height,
    justifyContent: 'space-between',
    borderRightWidth: 1,
    borderColor: '#e35540',
    alignItems: 'center',
    width: '15%',
    paddingBottom: 50,
  }
})