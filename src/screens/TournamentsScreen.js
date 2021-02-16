import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native';
import TopNavbar from 'sm/components/TopNavbar';
import TopTabs from 'sm/components/TopTabs';
import { windowWidth } from 'sm/utils/Dimensions';
import { tournamentTypes } from 'sm/utils/Constants';
import { Day } from 'sm/components/Schedule'
import { HotelsSlide } from 'sm/components/Tournaments';
import cup from 'sm/assets/cup.png';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import Container from '../components/Container';

export default function ({ navigation }) {
  const [activeScreen, setActiveScreen] = useState('Tournaments');
  const [activeTab, setActiveTab] = useState('Week')

  const Icon = <View style={styles.iconWrap}><Image source={cup} style={styles.topIcon} /></View>;

  return <Container home={true} navigation={navigation} activeScreen={activeScreen}>
  <ScrollView>
    <TopTabs tabItems={tournamentTypes} Icon={Icon}
      handleIconPress={() => { }} height={55} length={4}
      activeTab={activeTab} handleSetActive={setActiveTab} />
      <Day/>
      <View style={styles.hotelWrap}>
      <Text style={styles.hotelHeadText}>Partnering Hotels</Text>
      <HotelsSlide/>
      </View>
  </ScrollView>
  </Container>
}

const styles = StyleSheet.create({
  topIcon: {
    width: 50,
    height: 50,
    marginLeft: 20
  },
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
    width: windowWidth / 4,
    height: 50,
    backgroundColor: '#fff'
  },
  hotelHeadText: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Large,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 30
  },
  hotelWrap: {
    backgroundColor: '#fff'
  }
})