import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import TopPlayers from './TopPlayers';

export default function TopBar() {

  return <View style={styles.wrapper}>
    <Icon name="left" size={35} />
      <TopPlayers/>
    <Icon name="right" size={35} />
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
})