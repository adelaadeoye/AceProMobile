import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import bkMark from 'sm/assets/bkmark.png';
import { scale, v_scale } from 'sm/utils/StylesConst'
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import RowItem from 'sm/screens/Training/components/rowItem';
import addCus from 'sm/assets/mod06.png';

export default function Boards({ boards, addBoard, handleShowBkPosts }) {
  const leftWing = boards.slice(0, Math.floor(boards.length / 2) + 1)
  const rightWing = boards.slice(Math.ceil(boards.length / 2))

  return <ScrollView style={styles.cont}>
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <RowItem src={bkMark} text='Bookmarked' handlePress={() => handleShowBkPosts('Bookmarked')} />
        {rightWing.map(e => <RowItem key={e} text={e} handlePress={() => handleShowBkPosts(e)} />)}
        {!!leftWing.length && <RowItem src={addCus} text='Add Custom Board' handlePress={addBoard} />}
      </View>
      <View style={styles.row}>
        {leftWing.map(e => <RowItem key={e} text={e} handlePress={() => handleShowBkPosts(e)} />)}
        {!leftWing.length && <RowItem src={addCus} text='Add Custom Board' handlePress={addBoard} />}
      </View>
    </View>
  </ScrollView>
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    minHeight: v_scale(500)
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: v_scale(20)
  },
  row: {
    marginHorizontal: scale(20),
    justifyContent: 'space-around'
  },
  navText: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: v_scale(5)
  },
})