import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { graph2_height, graph1_width, chartConfig } from '../utils/Constant';
import { pie_data } from '../utils'
import Months from './Months';
import { PieChart } from 'react-native-chart-kit';
import Colors from 'sm/utils/Colors';
import PieLegend from './PieLegend';

export default function Graph2() {
  return (<View style={{ height: graph2_height, borderColor: '#e35540', borderWidth: 1, borderRadius: 5, width: graph1_width, alignSelf: 'center' }}>
    <View style={{ flexDirection: 'row', height: 70, justifyContent: 'flex-end', paddingRight: 20, alignItems: 'center' }}>
      <TouchableOpacity style={{ backgroundColor: '#e35540', height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#ffffff', fontSize: 20, marginHorizontal: 20, fontWeight: 'bold', padding: 5 }}>Total</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center', marginLeft: 20, height: 30, borderRadius: 10, justifyContent: 'center' }}>
        <Text style={{ color: '#e35540', fontSize: 20 }}>Monthly</Text>
      </TouchableOpacity>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ paddingTop: 10, }}>
        <TouchableOpacity style={{ backgroundColor: "#e35540", margin: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Text style={{ color: '#ffffff', padding: 7 }}>2020</Text>
        </TouchableOpacity>
        <Months />
      </View>
      <View style={{ width: '60%' }}>
        <PieChart
          data={pie_data}
          width={graph1_width}
          height={graph2_height / 2.8}
          chartConfig={chartConfig}
          accessor="percentage"
          paddingLeft="15"
          hasLegend={false}
          absolute
        />
        <PieLegend data={pie_data} />
      </View>
    </View>

  </View>)
}
