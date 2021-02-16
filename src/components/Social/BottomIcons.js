import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Textsizes from 'sm/utils/Textsizes';
import Colors from 'sm/utils/Colors';
import { windowWidth } from 'sm/utils/Dimensions';
import { scale, v_scale } from 'sm/utils/StylesConst';

export default function BottomIcons({ handleShowComm, commsNum, likesNum, handleAddOrDelLike }) {
  return <View style={styles.container}>
    <TouchableOpacity onPress={handleAddOrDelLike} style={styles.iconWrap}>
      <Text>{likesNum}</Text>
      <Icon name='like' size={25} />
      <Text style={styles.iconText}>React</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconWrap} onPress={handleShowComm}>
      <Text>{commsNum}</Text>
      <Icon name='comment' size={25} />
      <Text style={styles.iconText}>Comment</Text>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    width: windowWidth * 0.57,
    marginTop: 5
  },
  iconText: {
    color: Colors.AmberRed,
    fontWeight: 'bold',
    fontSize: Textsizes.Regular
  },
  iconWrap: {
    alignItems: 'center',
    flexDirection: 'row'
  },
})