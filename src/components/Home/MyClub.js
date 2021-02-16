import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import tennis from 'sm/assets/tennis.png';
import phone from 'sm/assets/phone.png';
import house from 'sm/assets/house.png';
import Textsizes from 'sm/utils/Textsizes';
import Colors from 'sm/utils/Colors';
import {windowWidth, windowHeight} from 'sm/utils/Dimensions';

export default function Club({handleCloseModal}) {
  return (
    <ScrollView contentContainerStyle={styles.cont}>
      <View style={styles.headRow}>
        <Text style={styles.headText}>My Club</Text>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <Text style={styles.headText}>X</Text>
        </TouchableWithoutFeedback>
      </View>
      <Image source={tennis} style={styles.img} />
      <Text style={styles.name}>DP Tennis Academy</Text>
      <Text style={styles.name}>Nellie Gail Ranch Tennis Club</Text>
      <View style={styles.adWrap}>
        <Image source={phone} style={styles.img} />
        <Text style={styles.adText}>(949) 831-6660</Text>
      </View>
      <View style={styles.adWrap}>
        <Image source={house} style={styles.img} />
        <Text style={styles.adText}>
          25281 Empty Saddle Dr., Languna Hills, CA 92653
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#FFFAF9',
    minHeight: windowHeight,
  },
  headRow: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.05,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  headText: {
    fontSize: Textsizes.Large,
    color: Colors.AmberRed,
    fontWeight: 'bold',
  },
  img: {
    marginVertical: 15,
    alignSelf: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: Textsizes.Medium,
    marginLeft: 30,
  },
  adWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adText: {
    maxWidth: windowWidth * 0.5,
  },
});
