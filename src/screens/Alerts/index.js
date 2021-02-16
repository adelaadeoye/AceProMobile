import React, { useState } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import AlertPanel from './components/AlertPanel';
import Container from 'sm/components/Container';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { windowWidth } from 'sm/utils/Dimensions';

export default function Alerts({ navigation }) {
  const [activeScreen, setActiveScreen] = useState('');

  return <Container home={true} navigation={navigation} activeScreen={activeScreen}>
    <ScrollView style={styles.cont}>
      <View style={styles.headRow}>
        <Text style={[styles.text, styles.headText]}>Alerts</Text>
        <Text style={styles.text}>Date</Text>
        <Text style={styles.text}>Viewed</Text>
        <Text style={styles.text}>Delete All</Text>
      </View>
      <View style={styles.divider}></View>
      <AlertPanel />
      <AlertPanel />
      <AlertPanel />
    </ScrollView>
  </Container>
}

const styles = StyleSheet.create({
  cont: {
    marginHorizontal: 10
  },
  headRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    marginBottom: 10,
    marginTop: 30
  },
  headText: {
    fontSize: Textsizes.xLarge,
    fontWeight: 'bold',
    flex: 0.3,
  },
  text: {
    color: Colors.AmberRed,
    flex: 0.2,
    textAlign: 'center'
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: windowWidth * 0.8,
    marginBottom: 10,
    alignSelf: 'center'
  }
})