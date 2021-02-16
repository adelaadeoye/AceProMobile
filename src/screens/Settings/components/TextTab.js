import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Colors from 'sm/utils/Colors';
import { windowWidth } from 'sm/utils/Dimensions';

export default function TextTab({ title, info }) {
  return <View style={styles.tab}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.info}>{info}</Text>
  </View>
}

const styles = StyleSheet.create({
  tab: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 30,
    color: Colors.AmberRed
  },
  info: {
    color: Colors.AmberRed,
  }
})