import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { scale, v_scale } from 'sm/utils/StylesConst';
import Icon from 'react-native-vector-icons/Feather';

export default function TitleTab({ title, handleDelete, handleShow, highlighted }) {
  return <TouchableOpacity style={[styles.wrapper, {
    backgroundColor: highlighted ?
      Colors.AmberRed : Colors.LightAsh
  }]} onPress={handleShow}>
    <Text style={[styles.text, { color: highlighted ? '#fff' : '#000' }]}>
      {title}
    </Text>
    <Icon name="trash" size={25} color={highlighted ? '#fff' : Colors.AmberRed}
      style={styles.boxed} onPress={handleDelete} />
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingVertical: v_scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: Colors.AmberRed
  },
  text: {
    fontSize: Textsizes.xMedium
  }
})