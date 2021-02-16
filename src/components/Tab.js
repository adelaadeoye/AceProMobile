import React from 'react'
import { windowWidth, windowHeight } from 'sm/utils/Dimensions';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';

export default function Tab({ handleSetGoal, goal, title, length, iconName, isIconPresent, isActive, searchPresent }) {
  const backgroundColor = isIconPresent ? Colors.LightAsh : goal == title ? Colors.AmberRed : '#fff';
  const color = goal == title && '#fff' || Colors.AmberRed;
  const width = windowWidth / length || 4

  return <TouchableOpacity
    style={[styles.button, {
      backgroundColor, borderColor: isIconPresent ? Colors.LightAsh : Colors.AmberRed,
      width: width
    }]}
    onPress={() => {
      if (iconName === 'search1') {
        return searchPresent()
      }
      handleSetGoal()
    }}>
    {isIconPresent ? <Icon name={iconName} size={25} color={isActive ? Colors.AmberRed : '#000'} /> :
      <Text style={[styles.innerText, { color }]}>
        {title}
      </Text>}
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    height: 50,
  },
  innerText: {
    fontSize: Textsizes.Regular,
    alignContent: 'center'
  }
})