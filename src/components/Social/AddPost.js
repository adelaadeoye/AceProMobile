import React, { useState, createRef } from 'react'
import { ScrollView, Modal, View, Text, StyleSheet, Image } from 'react-native';
import Colors from 'sm/utils/Colors';
import { windowHeight, windowWidth } from 'sm/utils/Dimensions';
import Textsizes from 'sm/utils/Textsizes';
import profile from 'sm/assets/31.png';
import { RichEditor } from 'sm/components/Goals';
import botIcons from 'sm/assets/addposticons.png'
import DropDown from 'sm/components/DropDown';
import { shareTypes } from 'sm/utils/Constants';
import InnerModal from 'sm/components/InnerModal';
import TopModal from 'sm/components/TopModal';

export default function ({ closeModal, isOpen, setshareType, shareType }) {


  return <Modal animationType="fade"
    visible={isOpen}
    onRequestClose={closeModal} >
    <ScrollView style={{ backgroundColor: Colors.LightAsh }}>
      
    </ScrollView>
  </Modal>
}

const styles = StyleSheet.create({
  container: {

  },
  topbar: {
    height: windowHeight * 0.13,
    backgroundColor: Colors.AmberRed,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  topTexts: {
    textAlignVertical: 'bottom',
    fontSize: Textsizes.Medium
  },
  next: {
    textAlignVertical: 'bottom',
  },
  profileImg: {
    width: windowWidth * 0.25,
    marginRight: 20,
    height: 90
  },
  dropWrap: {
    flexDirection: 'row',
    margin: 20,
    marginLeft: 50,
    zIndex: 10
  },
  authorWrap: {
    height: 50,
  },
  author: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  botIconWrap: {
    borderTopWidth: 1,
    borderTopColor: 'grey',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  }
})