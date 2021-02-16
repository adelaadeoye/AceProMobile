import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import BackButton from './BackButton';
import bell from '../assets/bell.png';
import setting from '../assets/setting.png';
import logo from '../assets/menulogo.png';

export default function TopNavbar({ navigation, back, home, callback }) {
  const onGoBack = () => {
    navigation.goBack();
  };

  const goHome = () => {
    if (callback) callback();
    navigation.navigate('Home')
  }

  return (
    <View style={styles.top}>
      {back && <BackButton onPress={onGoBack} />}
      {home ? (
        <>
          <TouchableOpacity style={styles.menuStyle} onPress={goHome}>
            <Image source={logo} style={styles.menuImageStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellStyle} onPress={() => navigation.navigate('Alerts')}>
            <Image source={bell} style={{ resizeMode: 'contain' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingStyle} onPress={() => navigation.navigate('Settings')}>
            <Image source={setting} style={{ resizeMode: 'contain' }} />
          </TouchableOpacity>
        </>
      ) : <View style={{ width: windowWidth * 0.9 }} />}
      {!back && <View />}
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#E35540',
    height: windowHeight * 0.1157,
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 1
  },
  menuStyle: {
    marginTop: windowHeight * 0.035,
    marginLeft: windowWidth * 0.056,
  },
  menuImageStyle: {
    resizeMode: 'contain',
    width: windowWidth * 0.4,
  },
  bellStyle: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: windowWidth * 0.32,
    paddingBottom: windowWidth * 0.04,
    resizeMode: 'contain',
  },
  settingStyle: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: windowWidth * 0.016,
    paddingBottom: windowWidth * 0.05,
    resizeMode: 'contain',
  },
});
