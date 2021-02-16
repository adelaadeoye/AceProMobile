import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Colors from 'sm/utils/Colors'
import ShadowDash from './ShadowDash';
import { windowWidth } from 'sm/utils/Dimensions';
import flag1 from 'sm/assets/flag1.png';
import flag2 from 'sm/assets/flag2.png';

const firstPlayer = ['Rafael Nadal', '15', '7', '1'];
const secondPlayer = ['Roger Federer', '30', '9', '1'];

export default function TopPlayers() {
  const firstItem = firstPlayer.map(e => <ShadowDash key={e} val={e} />);
  const secondItem = secondPlayer.map(e => <ShadowDash key={e} val={e} />);

  return <View style={styles.wrapper}>
    <View style={styles.barWrap}>
      <Image source={flag1} />
      {firstItem}
    </View>
    <View style={styles.barWrap}>
      <Image source={flag2} />
      {secondItem}
    </View>
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
  },
  barWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    width: windowWidth * 0.7,
    justifyContent: 'space-around'
  }
})