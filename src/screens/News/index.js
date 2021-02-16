import React from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import Container from 'sm/components/Container';
import TopBar from './components/TopBar';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import colleges from 'sm/assets/colleges.png';
import Player from './components/Player';
import player1 from 'sm/assets/Ellipse1.png';
import player2 from 'sm/assets/Ellipse2.png';
import player3 from 'sm/assets/Ellipse3.png';
import Divider from 'sm/components/Divider';
import NewsItem from './components/NewsItem';
import College from './components/Colleges';

const players = ['Venus Williams', 'Andy Murray', 'Maria Sharapova'];
const playersImg = [player1, player2, player3];

export default function News({ navigation }) {
  const playersItem = players.map((e, i) =>
    <Player key={e} source={playersImg[i]} name={e} />)

  return <Container home={true} navigation={navigation}>
    <ScrollView style={styles.container}>
      <TopBar />
      <Text style={styles.playIntro}>Players</Text>
      <ScrollView horizontal={true}
        contentContainerStyle={styles.playWrap}>
        {playersItem}
      </ScrollView>
      <Divider />
      <NewsItem />
      <College/>
      <NewsItem />
    </ScrollView>
  </Container>
}

const styles = StyleSheet.create({
  container: {
  },
  playIntro: {
    color: Colors.AmberRed,
    paddingLeft: 10,
    marginVertical: 15,
    fontSize: Textsizes.xMedium
  },
  playWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 10
  }
})