import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';

const BackButton = (props) => {
  return (
    <TouchableOpacity {...props} style={{ alignSelf: 'flex-start' }}>
      <Text
        style={{
          marginTop: windowHeight * 0.07,
          marginLeft: windowWidth * 0.072,
          fontSize: 20,
        }}>
        Back
      </Text>
    </TouchableOpacity>
  );
};

export default BackButton;
