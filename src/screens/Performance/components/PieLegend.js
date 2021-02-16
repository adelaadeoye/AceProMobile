import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';

export default function Legend({ data, height }) {
  const items = data.map(e => <View key={e.name} style={styles.textWrap}>
    <View style={{ backgroundColor: e.color, width: 20, height: 20, borderRadius: 10 }} />
    <Text style={[styles.text, { flex: 0.2, marginLeft: 8 }]}>{e.percentage}</Text>
    <Text style={[styles.text, { flex: 0.8}]}>{e.name}</Text>
  </View>)

  return <View style={styles.wrapper}>
    {items}
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    marginTop: 30,
    paddingLeft: 5
  },
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: '100%'
  },
  text: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Regular,
  }
})