import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { scale, v_scale } from 'sm/utils/StylesConst';


export default function TabItem({ src, text, textStyle, handlePress }) {
  return <TouchableOpacity style={styles.rowItem} onPress={handlePress}>
    {src && <Image source={src} resizeMode="contain" style={styles.img} />}
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  rowItem: {
    backgroundColor: Colors.AmberRed,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    marginVertical: v_scale(10),
    borderRadius: 15,
    width: scale(120),
    height: v_scale(125)
  },
  img: {
    width: scale(50),
    height: v_scale(50)
  },
  text: {
    fontSize: scale(15),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  }
})