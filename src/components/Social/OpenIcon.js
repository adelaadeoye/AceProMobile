import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import Colors from 'sm/utils/Colors';

export default function ({ setPostToBook }) {
  return <Icon name='bookmark' size={25} color={Colors.AmberRed} onPress={setPostToBook} />
}