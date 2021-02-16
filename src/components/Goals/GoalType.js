import React from 'react'
import { windowWidth, windowHeight } from 'sm/utils/Dimensions';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from 'sm/utils/Colors';

export default function GoalType({ handleSetGoal, goal, title }) {
  const backgroundColor = goal == title && Colors.AmberRed || '#fff';
  const color = goal == title && '#fff' || '#000';

  return <TouchableOpacity
    style={[styles.button, { backgroundColor }]}
    onPress={handleSetGoal}>
    <Text style={[styles.innerText, { color }]}>
      {title}
    </Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: Colors.AmberRed,
    width: windowWidth / 4.5,
    height: 50,
  },
  innerText: {
    fontSize: 15,
    alignContent: 'center'
  }
})