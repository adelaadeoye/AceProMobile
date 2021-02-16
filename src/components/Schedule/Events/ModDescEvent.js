import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import InnerModal from 'sm/components/InnerModal';
import TopModal from 'sm/components/TopModal';
import VideoTab from 'sm/components/VideoTab';
import ModDescBody from './ModDescBody';
import ModInputBody from './ModInputBody';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { windowWidth } from 'sm/utils/Dimensions';

export default function ({ handleHideMod, handleAddMod, modules, deepNav: { cat, subCat }, setShowMod, showMod }) {
  let modDescDets = {};
  if (modules[cat] && modules[cat][subCat]) modDescDets = modules[cat][subCat].filter(e => e.title === showMod?.name)

  const { description, assets, ...modToAdd } = modDescDets[0];

  const rightText = <Text onPress={() => handleAddMod(modToAdd)} style={styles.text}>Add to Event</Text>;
  const leftText = <Text onPress={handleHideMod} style={[styles.text, { color: Colors.Orange }]}>Cancel</Text>

  return <InnerModal topModal={<TopModal leftText={leftText}
      midText={<Text style={{ flexGrow: 0.4 }} />}
      rightText={rightText} />}>
      <ScrollView>
      <ModDescBody details={modDescDets[0]}
        handleGoBack={() => setShowMod({ show: false })}
        shouldUpdate={() => setWriteStatus('edit')} />
      </ScrollView>
    </InnerModal>
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  vidWrap: {
    alignSelf: 'center',
    width: windowWidth * 0.8
  },
  bottomText: {
    marginBottom: 50
  },
  text: {
    fontSize: Textsizes.Medium
  }
})