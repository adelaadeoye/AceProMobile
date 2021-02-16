import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { windowHeight } from 'sm/utils/Dimensions';
import Colors from 'sm/utils/Colors';

export default function TopBar({ setActiveScreen, activeScreen }) {
  return <View style={styles.topBar}>
    <TouchableOpacity style={[styles.navItem, activeScreen == 'Schedule' && { backgroundColor: Colors.AmberRed}]}
    onPress={() => setActiveScreen('Schedule')}>
      <Text style={[{ color: Colors.AmberRed}, activeScreen == 'Schedule' && { color: '#fff' }]}>Schedule</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.navItem, activeScreen == 'Modules' && { backgroundColor: Colors.AmberRed}]}
    onPress={() => setActiveScreen('Modules')}>
      <Text style={[{ color: Colors.AmberRed}, activeScreen == 'Modules' && { color: '#fff' }]}>Modules</Text>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomColor: Colors.AmberRed,
    borderBottomWidth: 1
  },
  navItem: {
    borderColor: Colors.AmberRed,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'center'
  }
})