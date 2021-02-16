import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Colors from 'sm/utils/Colors';
import DropDown from 'sm/components/DropDown';
import { postCommentorTypes } from 'sm/utils/Constants';
import { windowHeight } from 'sm/utils/Dimensions';
import Textsizes from 'sm/utils/Textsizes';
import { scale, v_scale } from 'sm/utils/StylesConst'

export default function Community() {
  const [postCommentor, setPostCommentor] = useState('Only me');

  return <View style={styles.container}>
    <Text style={styles.text}>Who can comment on my posts</Text>
    <DropDown goalType={postCommentor} dropWidth={0.7}
      position={{ left: scale(65), top: v_scale(65), zIndex: 200 }}
      dropDownItems={postCommentorTypes}
      handleChange={setPostCommentor} />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight * 0.7,
    alignItems: 'center'
  },
  text: {
    fontSize: Textsizes.Medium,
    fontWeight: 'bold',
    color: Colors.AmberRed,
    marginTop: 60,
    marginBottom: 20
  }
})