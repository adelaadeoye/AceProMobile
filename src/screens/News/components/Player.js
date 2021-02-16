import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';
import { windowWidth } from 'sm/utils/Dimensions';

export default function Player({ name, source }) {
  return <View>
    <Image source={ source } style={styles.img} />
    <Text style={styles.name}>{name}</Text>
  </View>
};

const styles = StyleSheet.create({
  img: {
    width: windowWidth * 0.3,
    height: 120,
    marginBottom: 5,
    marginHorizontal: 7,
  },
  name: {
    alignSelf: 'flex-start',
    textAlign: 'left'
  }
})