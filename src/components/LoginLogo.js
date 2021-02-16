import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import logo from '../assets/logo.png';

export default function LoginLogo() {
  return <Image source={logo} style={styles.logoStyle} />;
}

const styles = StyleSheet.create({
  logoStyle: {
    marginTop: windowHeight * 0.049,
    height: windowHeight * 0.1194,
    width: windowWidth * 0.832,
    resizeMode: 'contain',
  },
});
