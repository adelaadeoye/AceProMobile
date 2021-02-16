import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from 'sm/utils/Colors';
import CheckBox from '@react-native-community/checkbox';

export default function AlertPanel() {
  return <View style={styles.cont}>
    <Text style={[styles.text, { flex: 0.3}]}>Alarm lorem ipsum...</Text>
    <Text style={[styles.text, { flex: 0.2}]}>10/27</Text>
    <View style={{ flex: 0.2}}>
    <CheckBox tintColors={{ true: Colors.AmberRed }}/>
    </View>
    <Icon name="trash" size={25} color={Colors.AmberRed} style={styles.boxed} />
  </View>
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10
  },
  text: {
    color: Colors.AmberRed,
    textAlign: 'center'
  },
  boxed: {
    flex: 0.1,
  }
})