import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import BottomIcons from './BottomIcons';
import VideoTab from '../VideoTab';
import Colors from 'sm/utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import OpenIcon from './OpenIcon';
import profile from 'sm/assets/31.png';
import { windowWidth } from 'sm/utils/Dimensions';
import img from 'sm/assets/socialPost.png';
import { scale, v_scale } from 'sm/utils/StylesConst'
import CommentTab from './CommentTab';

export default function ({ assets, isBookMarked, title, content, setPostToBook, handleAddOrDelBkMarks,
  handleAddComm, comm, showComm, postCreation, commsNum, likesNum, handleAddOrDelLike, comments }) {
  const [commInput, setCommInput] = comm;
  const [showComment, setShowComment] = showComm;

  const commentTabs = comments.map(e => <CommentTab key={JSON.stringify(e)} comment={e.comment} commCreation={e.created_at} author={e.author} />);

  const checkFullValidate = () => new Promise((resolve, reject) => setTimeout(() => {
    commInput.val ? resolve(true) : reject(false)
  }, 0));

  return <View style={styles.container}>
    <View style={styles.topPostBar}>
      <Image source={profile} style={styles.profileImg} />
      <View style={styles.topContent}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.bookMark}>
            {isBookMarked ? <TouchableOpacity onPress={handleAddOrDelBkMarks}>
              <Icon name='bookmark' size={25} color={Colors.AmberRed} />
            </TouchableOpacity>
              : <TouchableOpacity onPress={setPostToBook}>
                <OpenIcon />
              </TouchableOpacity>}
          </View>
        </View>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
    {assets && assets.map(e => <Image source={e.file} style={{ width: windowWidth * 0.78, marginTop: v_scale(5) }} resizeMode='cover' />)}
    <BottomIcons handleShowComm={() => setShowComment(showComment ? '' : postCreation)} commsNum={commsNum} likesNum={likesNum} handleAddOrDelLike={handleAddOrDelLike} />
    <>
      {(showComment === postCreation) && <>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={commInput.val}
            onChangeText={(val) => setCommInput({
              ...commInput,
              val
            })}
          />
          <TouchableOpacity disabled={commInput.isDisabled} onPress={() => checkFullValidate().then(() => {
            setCommInput({ ...commInput, isDisabled: true })
            handleAddComm(commInput.val)
          })}>
            <Icon name='chevron-circle-right' size={35} color={commInput.isDisabled ? 'silver' : Colors.AmberRed} />
            {commInput.isDisabled && <ActivityIndicator color="grey" style={styles.savingInd} />}
          </TouchableOpacity>
        </View>
        {commentTabs}
      </>
      }
    </>
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.85,
    borderColor: Colors.AmberRed,
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 20,
  },
  inputWrap: {
    borderWidth: 2,
    borderColor: Colors.AmberRed,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: v_scale(5)
  },
  input: {
    width: scale(280)
  },
  savingInd: {
    position: 'absolute',
    left: scale(5),
    top: v_scale(8)
  },
  profileImg: {
    width: windowWidth * 0.2,
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
    marginBottom: 5,
    padding: 5,
  },
  title: {
    color: Colors.AmberRed,
    fontWeight: 'bold'
  },
  content: {
    width: windowWidth * 0.57,
    padding: 5
  }
})