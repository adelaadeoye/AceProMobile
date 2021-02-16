import React from 'react'
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { windowHeight } from 'sm/utils/Dimensions';
import { v_scale } from 'sm/utils/StylesConst';
import TopNavbar from 'sm/components/TopNavbar';
import BottomNavBar from 'sm/components/BottomNavbar';

export default function Container({ children, navigation, home, callback, showMenu = true, activeScreen }) {
  return <View style={{ flex: 1 }}>
    <TopNavbar home={home} navigation={navigation} callback={callback} />
    <View style={{ flex: 1 }}>
      {children}
    </View>
    {showMenu && <BottomNavBar navigation={navigation} activeScreen={activeScreen} />}
  </View>
}