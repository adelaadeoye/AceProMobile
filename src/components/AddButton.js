import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import Textsizes from 'sm/utils/Textsizes';

export default function AddButton({buttonTitle, style, ...rest}) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
    marginRight: 40,
    backgroundColor: '#E35540',
    padding: 15,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: Textsizes.Medium,
    color: '#ffffff',
  },
});
