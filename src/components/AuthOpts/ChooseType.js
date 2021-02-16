import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { userTypes } from 'sm/utils/Constants';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { scale, v_scale } from 'sm/utils/StylesConst'

export default function ChooseType({ setType }) {
  const items = userTypes.map(e => <TouchableOpacity key={e} style={styles.itemWrap} onPress={() => setType(e)}>
    <Text style={styles.text}>I'm {e === 'Athlete' ? 'an' : 'a'} {e}</Text>
  </TouchableOpacity>)

  return <View style={styles.wrapper}>
    {items}
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: -60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemWrap: {
    paddingVertical: v_scale(15),
    paddingLeft: scale(70),
    width: scale(250),
    marginBottom: v_scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(25),
    backgroundColor: Colors.AmberRed
  },
  text: {
    color: '#fff',
    fontSize: Textsizes.xMedium
  }
})