import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Textsizes from 'sm/utils/Textsizes'

export default function ({ iconName, title, black }) {
  return <View style={styles.container}>
    <Icon size={20} color={'#000'} name={iconName} />
    <Text style={[styles.iconTitle, { color: black ? '#000' : 'gray'}]}>{title}</Text>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconTitle: {
    fontSize: Textsizes.xSmall
  }
})