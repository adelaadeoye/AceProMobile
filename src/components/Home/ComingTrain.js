import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DashBoardCal } from 'sm/components/Schedule'
import Colors from 'sm/utils/Colors';

export default function ComingTrain({ navigation }) {
  return <View>
    <Text style={styles.headText}>Upcoming Training</Text>
    <DashBoardCal navigation={navigation} />
  </View>
}

const styles = StyleSheet.create({
  headText: {
    color: Colors.AmberRed,
    fontSize: 27,
    fontWeight: '700',
    margin: 10,
    marginLeft: 20
  },
})