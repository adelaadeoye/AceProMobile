import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import Colors from 'sm/utils/Colors';
import { scale, v_scale } from 'sm/utils/StylesConst';
import Textsizes from 'sm/utils/Textsizes';
import Icon from 'react-native-vector-icons/AntDesign';

const TextInfo = ({
  info,
  desc,
  leftDull,
  rightDull,
  handleShow,
  center,
  disabled,
  handleErr,
  compDate,
  eventDesc
}) => (
  <TouchableOpacity
    onPress={disabled ? handleErr : handleShow}
    style={[
      styles.container,
      center && { justifyContent: 'center' },
      disabled && { backgroundColor: '#f9dbd7' },
      eventDesc && { backgroundColor: Colors.Pink },
    ]} disabled={eventDesc} >
    <Text
      style={[styles.text,
      { color: leftDull || disabled ? 'gray' : '#000' },
      eventDesc && { color: '#000' }
      ]}>
      {desc}
    </Text>
    {compDate ? (
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={[
            styles.text,
            { color: rightDull || disabled ? 'gray' : '#000' },
            center && { marginLeft: 10 },
            compDate && { fontSize: 13, paddingTop: v_scale(10) },
            eventDesc && { color: '#000' },
          ]}>
          {info}
        </Text>
        {compDate}
      </View>
    ) : (
        <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', },
        desc === 'Invitees' && { marginLeft: scale(20), width: scale(285) }]}>
          {(desc === 'Event Type') &&
            <View style={{
              borderRadius: 50, backgroundColor: '#9A12B3',
              width: scale(5), height: v_scale(5), marginRight: scale(5)
            }} />}
          <Text
            style={[
              styles.text,
              { color: rightDull || disabled ? 'gray' : '#000' },
              center && { marginLeft: 10 },
            ]}>
            {info}
          </Text>
          {((desc === 'Event Type') || (desc === 'Invitees')) && <Icon name="down" size={15} color="gray" />}
          {desc === 'Repeat' && <Icon name="right" size={15} color="gray" />}
        </View>
      )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.Pink,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    height: v_scale(55),
    marginHorizontal: 4,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: Textsizes.Regular,
    marginRight: scale(5)
  },
});

export default TextInfo;
