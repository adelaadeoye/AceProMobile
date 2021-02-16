import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import BottomIcon from './BottomIcons';
import { HotelsInfo } from 'sm/utils/Constants';
import { windowWidth } from 'sm/utils/Dimensions';
import Textsizes from 'sm/utils/Textsizes';

export default function ({ source, hotelName, hotelRate, distance }) {
  const items = HotelsInfo.iconsInfo.map(e => <BottomIcon key={e.title} black
    iconName={e.iconName} title={e.title} />);

  return <View style={styles.outerCont}>
    <View style={styles.container}>
      <Text style={styles.rateAd}>1 MORE RATE AVAILABLE</Text>
      <Image source={source} style={styles.hotelImage} />
      <View style={styles.sidesContainer}>
        <View styles={styles.leftSide}>
          <Text style={styles.hotelName}>{hotelName}</Text>
          <Text style={styles.regularRate}>Lowest Regular Rate from</Text>
          <View style={styles.rateCont}>
            <Text style={styles.largeRateText}>{hotelRate}</Text>
            <Text style={styles.smallRateText}>USD/Night</Text>
          </View>
          <Text style={styles.taxes}>Taxes and all fees included</Text>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.distHead}>DISTANCE</Text>
          <Text style={styles.distance}>{distance} miles</Text>
        </View>
      </View>
      <View style={styles.botIconsCont}>
        {items}
      </View>
    </View>
  </View>
}

const styles = StyleSheet.create({
  outerCont: {
    flex: 1,
    width: windowWidth * 0.9,
    alignItems: 'center',
  },
  container: {
    width: windowWidth * 0.82,
    justifyContent: 'center'
  },
  sidesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 5
  },
  leftSide: {
    width: windowWidth * 0.6,
  },
  taxes: {
    fontSize: Textsizes.xSmall,
    marginBottom: 3,
    color: 'gray'
  },
  rightSide: {
    borderLeftColor: 'gray',
    borderLeftWidth: 1,
    paddingLeft: 10,
    paddingTop: 10
  },
  hotelImage: {
    resizeMode: 'contain',
    width: windowWidth * 0.82,
    height: 140
  },
  hotelName: {
    fontSize: Textsizes.Medium,
    width: windowWidth * 0.5,
    fontWeight: 'bold'
  },
  distHead: {
    fontSize: Textsizes.Small,
    color: '#000',
  },
  distance: {
    fontWeight: 'bold'
  },
  rateAd: {
    color: 'gray',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: Textsizes.Small
  },
  largeRateText: {
    fontSize: Textsizes.Large,
    fontWeight: 'bold'
  },
  smallRateText: {
    alignSelf: 'flex-end',
    fontSize: Textsizes.Small,
    marginBottom: 5
  },
  regularRate: {
    color: 'gray',
    fontSize: Textsizes.xSmall
  },
  rateCont: {
    flexDirection: 'row'
  },
  botIconsCont: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    padding: 10
  }
})