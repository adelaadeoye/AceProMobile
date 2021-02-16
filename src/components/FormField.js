import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import FormInput from './FormInput';

export default function FormField({placeholderText, ...rest}) {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text>Email</Text>
      </View>
      <View style={styles.box2}>
        <FormInput placeholderText={placeholderText} rest={rest} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  box1: {
    width: windowWidth / 3,
    height: 50,
    backgroundColor: 'red',
  },
  box2: {
    width: (windowWidth / 3) * 2,
    height: 50,
    backgroundColor: 'skyblue',
  },
});
