import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function FormButton({ buttonTitle, disabled, ...rest }) {
  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={[styles.buttonText, { opacity }]}>{buttonTitle}</Text>
      {disabled && <ActivityIndicator size="small" color='#fff'/>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: windowWidth * 0.6,
    backgroundColor: '#E35540',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 24,
    color: '#ffffff',
    marginRight: 15
  },
});
