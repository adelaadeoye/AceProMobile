import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from 'sm/utils/Colors'

export default function ShadowDash({ val }) {
  return <View style={styles.wrapper}>
    <Text>{val}</Text>
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.LightYellow,
    paddingVertical: 5,
    paddingHorizontal: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
})