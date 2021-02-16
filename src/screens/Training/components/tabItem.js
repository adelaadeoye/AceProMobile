import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from 'sm/utils/Colors';
import { scale, v_scale } from 'sm/utils/StylesConst';
import Textsizes from 'sm//utils/Textsizes';

export default function TabItem({ text, handlePress, pickedMod }) {
  const modCol = (mod) => pickedMod === mod ? '#fff' : '#000';
  const modBgCol = (mod) => pickedMod === mod ? Colors.AmberRed : Colors.LightAsh

  return <Text onPress={() => handlePress(text)}
    style={[styles.modText, {
      color: modCol(text), backgroundColor: modBgCol(text)
    }]}>
    {text}
  </Text>
}

const styles = StyleSheet.create({
  modText: {
    fontSize: Textsizes.Medium,
    marginHorizontal: scale(5),
    paddingVertical: v_scale(15),
    paddingLeft: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: Colors.AmberRed
  }
})