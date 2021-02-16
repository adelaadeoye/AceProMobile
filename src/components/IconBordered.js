import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { windowWidth } from 'sm/utils/Dimensions';

export default function ({ iconStyles, shrink, handleIconPress, disabled }) {
  return <TouchableOpacity style={[styles.icon, { width: shrink ? windowWidth / 4 : 60 }, iconStyles?.cont && iconStyles.cont]}
    onPress={handleIconPress} disabled={disabled}>
    <View style={iconStyles?.border || {}}>
      <Icon name="plus" size={25} color={iconStyles?.color} />
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  }
})
