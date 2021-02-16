import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import profile from 'sm/assets/31.png';
import moment from 'moment';
import { formatTime } from 'sm/screens/SocialScreen';
import { windowWidth } from 'sm/utils/Dimensions';
import Colors from 'sm/utils/Colors';
import { scale, v_scale } from 'sm/utils/StylesConst'

export default function CommentTab({ comment, commCreation, author }) {
  return <View style={styles.container}>
    <View style={styles.topPostBar}>
      <Image source={profile} style={styles.profileImg} />
      <View style={styles.topContent}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>
            {`${author?.user_name || author?.email.slice(0, 15)}  ${formatTime(moment(commCreation).fromNow())}`}
          </Text>
          <View />
        </View>
        <Text style={styles.content}>{comment}</Text>
      </View>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.75,
    borderColor: Colors.AmberRed,
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: scale(7),
    marginTop: v_scale(10),
  },
  profileImg: {
    resizeMode: 'contain',
    width: windowWidth * 0.1,
    height: 70,
  },
  topPostBar: {
    flexDirection: 'row',
  },
  topContent: {
    marginLeft: 10,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: v_scale(7),
    padding: 5,
  },
  title: {
    color: Colors.AmberRed,
    fontWeight: 'bold'
  },
  content: {
    width: windowWidth * 0.57,
    marginLeft: scale(7)
  }
})