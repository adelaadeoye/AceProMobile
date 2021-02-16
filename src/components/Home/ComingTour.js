import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import tour from 'sm/assets/tour.png';
import { windowWidth } from 'sm/utils/Dimensions';
import Colors from 'sm/utils/Colors';

export default function ComingTour() {
  return (<>
    <Text style={styles.headText}>Upcoming Tournament</Text>
    <View style={styles.wrapper}>
      <Image source={tour} style={styles.img} />
    </View>
  </>)
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: 'silver',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  headText: {
    color: Colors.AmberRed,
    fontSize: 27,
    fontWeight: '700',
    marginTop: 70,
    marginLeft: 20
  },
  img: {
    width: windowWidth * 0.9,
    height: 180,
    resizeMode: 'contain'
  }
})