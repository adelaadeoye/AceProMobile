import React from 'react'
import { StyleSheet, View } from 'react-native'
import { v_scale, scale } from 'sm/utils/StylesConst';

export default function TopModal({ leftText, midText, rightText }) {
  return <View style={styles.container}>
      {leftText}
      {midText}
      {rightText}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: v_scale(80),
    maxHeight: v_scale(90),
    marginHorizontal: scale(20),
  },
})