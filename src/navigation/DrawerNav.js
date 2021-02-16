import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  DrawerContentScrollView,
  // DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';

export default function CustomDrawerContent(props) {
  const [show, setshow] = useState(false)

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.topBar}>
        <Text style={styles.topText}>Dashboard</Text>
      </View>
      <DrawerItem label="Home" onPress={() => props.navigation.navigate('Home')} />
      <DrawerItem label="Goal" onPress={() => props.navigation.navigate('Goal')} />
      <TouchableOpacity style={styles.toggleContainer} onPress={() => setshow(!show)}>
        <Text style={styles.toggleText}>Training</Text>
        <Icon color='gray' name="right" size={18} />
      </TouchableOpacity>
      {show && <View style={styles.navDropWrap}>
        <DrawerItem label="Schedule" onPress={() => props.navigation.navigate('Schedule')} />
        <DrawerItem label="Modules" onPress={() => props.navigation.navigate('Modules')} />
      </View>}
      <DrawerItem label="Tournaments" onPress={() => props.navigation.navigate('Tournaments')} />
      <DrawerItem label="Social" onPress={() => props.navigation.navigate('Social')} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 10
  },
  navDropWrap: {
    marginHorizontal: 20
  },
  toggleText: {
    color: 'gray'
  },
  topBar: {
    marginTop: -10,
    backgroundColor: Colors.AmberRed,
    padding: 20,
  },
  topText: {
    textAlign: 'center',
    fontSize: Textsizes.Large,
    color: '#fff'
  }
})