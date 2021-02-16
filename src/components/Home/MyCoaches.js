import React from 'react'
import {
  ScrollView, TouchableWithoutFeedback,
  View, Text, Image, StyleSheet
} from 'react-native';
import Textsizes from 'sm/utils/Textsizes';
import coach1 from 'sm/assets/coach1.png';
import coach2 from 'sm/assets/coach2.png';
import { windowHeight } from 'sm/utils/Dimensions';
import Colors from 'sm/utils/Colors';

export default function Coaches({ handleCloseModal }) {
  return <ScrollView contentContainerStyle={styles.cont}>
  <View style={styles.headRow}>
      <Text style={styles.headText}>My Coaches</Text>
      <TouchableWithoutFeedback  onPress={handleCloseModal}>
      <Text style={styles.headText}>X</Text>
      </TouchableWithoutFeedback>
    </View>
    <View style={styles.imgWrap}>
      <Image source={coach1} style={styles.img} />
      <Text style={styles.sideText}>Anna Smith</Text>
      <Text style={styles.sideText}>Tennis Coach</Text>
    </View>
    <View style={styles.imgWrap}>
      <Image source={coach2} style={styles.img} />
      <Text style={styles.sideText}>Anna Smith</Text>
      <Text style={styles.sideText}>Tennis Coach</Text>
    </View>
  </ScrollView>
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#FFFAF9',
    minHeight: windowHeight
  },
  headRow: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.05,
    justifyContent: 'space-around',
    marginBottom: 20
  },
  headText: {
    fontSize: Textsizes.Large,
    color: Colors.AmberRed,
    fontWeight: 'bold'
  },
  imgWrap: {
    alignItems: 'center',
    marginVertical: 20,
  },
  img: {
    height: 170,
    width: 170,
    resizeMode: 'contain',
  },
  sideText: {
    marginRight: 80,
  }
})