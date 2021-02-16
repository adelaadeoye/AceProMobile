import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from 'sm/utils/Colors';
import { scale, v_scale } from 'sm/utils/StylesConst';

export default function Slide({ val, setVal }) {

  return <View style={{ height: 40, marginLeft: scale(60), width: scale(310), justifyContent: 'center' }}>
    <Slider
      minimumValue={1}
      maximumValue={10}
      minimumTrackTintColor={Colors.AmberRed}
      maximumTrackTintColor={Colors.AmberRed}
      thumbTintColor={Colors.AmberRed}
      onValueChange={val => setVal(Math.floor(val))}
    />
    <View style={styles.scoreWrap}>
      <Text style={[styles.score, { marginBottom: v_scale(10) }]}>Max</Text>
      <Text style={styles.score}>{val}</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  slider: {

  },
  score: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.AmberRed
  },
  scoreWrap: {
    position: 'absolute',
    zIndex: 5,
    top: -5,
    right: 1,
  }
})