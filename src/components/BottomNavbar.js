import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { bottomNavItems } from 'sm/utils/Constants';
import Goals from 'sm/assets/goals.png';
import Training from 'sm/assets/training.png';
import Social from 'sm/assets/social.png';
import Tournaments from 'sm/assets/Tournament.png';
import Performance from 'sm/assets/performance.png';
import Goals2 from 'sm/assets/goals2.png';
import Training2 from 'sm/assets/training2.png';
import Social2 from 'sm/assets/social2.png';
import Tournaments2 from 'sm/assets/tournaments2.png';
import Performance2 from 'sm/assets/performance2.png';
import { windowWidth, windowHeight } from 'sm/utils/Dimensions';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';

export default function BottomNavBar({ navigation, activeScreen }) {
  const assets = [Goals, Training, Social, Tournaments, Performance];
  const activeAssets = [Goals2, Training2, Social2, Tournaments2, Performance2];

  const goToScreen = (path) => navigation.navigate(path);

  const items = bottomNavItems.map((e, i) => <TouchableOpacity style={[styles.items, i == 0 && { borderTopLeftRadius: 10 },
  i == assets.length - 1 && { borderTopRightRadius: 10 }]}
    key={e} onPress={() => goToScreen(e)}>
    <Image source={activeScreen === e ? activeAssets[i] : assets[i]} style={styles.navImg} />
    <Text style={[styles.navText, (activeScreen === e) && { color: Colors.AmberRed} ]}>{e}</Text>
  </TouchableOpacity>);

  return <View style={styles.container}>
    {items}
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    borderTopEndRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: windowHeight * 0.11,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0
  },
  items: {
    marginTop: 5,
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: windowHeight * 0.101,
  },
  navImg: {
    width: windowWidth * 0.2,
    resizeMode: 'contain',
    height: windowHeight * 0.05,
  },
  navText: {
    fontSize: Textsizes.Small,
    color: Colors.LightOrange
  },
  leftNav: {
    fontSize: 8
  }
})