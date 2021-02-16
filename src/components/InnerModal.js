import React from 'react'
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { windowWidth, windowHeight } from 'sm/utils/Dimensions';

const InnerModal = ({ children, topModal }) => <ScrollView style={styles.editorWrap}>
  {topModal}
  {children}
  {Platform.OS == 'ios' && <View style={styles.topShadow} />}
</ScrollView>;

const styles = StyleSheet.create({
  editorWrap: {
    elevation: 4,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  topShadow: {
    position: 'absolute',
    backgroundColor: 'grey',
    height: 3,
    width: windowWidth * 0.99,
    opacity: 0.3,
    top: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  }

})

export default InnerModal;