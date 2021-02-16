import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import colleges from 'sm/assets/colleges.png';

export default function College() {
  return <View style={styles.container}>
    <Image source={colleges}/>
  </View>
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    alignItems: 'center'
  }
})