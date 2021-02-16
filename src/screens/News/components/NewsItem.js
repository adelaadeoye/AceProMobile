import React from 'react'
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import news1 from 'sm/assets/news1.png';
import { windowWidth } from 'sm/utils/Dimensions';

export default function NewsItem() {
  return <View style={styles.wrapper}>
    <Text style={styles.date}>October 15th 2020</Text>
    <View style={styles.datebottomWrap}>
      <View style={styles.nameWrap}>
        <View style={styles.ashBg} />
        <Text>Ita</Text>
        <Icon name="checkcircle" color="#0695F0" size={20} />
      </View>
      <Icon name="ellipsis1" onPress={() => { }} size={25} color="grey" />
    </View>
    <Image source={news1} style={styles.img} />
    <View style={styles.likeSect}>
      <Button title="Like 0" style={styles.likeBut} />
      <Button title="Tweet" style={styles.likeBut} />
    </View>
    <Text style={styles.commentText}>0 comments</Text>
  </View>
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 15
  },
  date: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Large,
  },
  ashBg: {
    backgroundColor: 'grey',
    width: 25,
    height: 25,
    borderRadius: 25
  },
  nameWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 0.1,
    alignItems: 'center'
  },
  datebottomWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  img: {
    marginVertical: 15,
    alignSelf: 'center'
  },
  likeSect: {
    flexDirection: 'row',
    width: windowWidth * 0.5,
    justifyContent: 'space-between',
    marginLeft: 5
  },
  likeBut: {
    borderRadius: 15
  },
  commentText: {
    color: Colors.AmberRed,
    margin: 7
  }
})