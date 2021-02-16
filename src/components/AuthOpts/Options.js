import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import fbIcon from 'sm/assets/fbIcon.png';
import mailIcon from 'sm/assets/mailIcon.png';
import gooIcon from 'sm/assets/gooIcon.png';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { scale, v_scale } from 'sm/utils/StylesConst'

export default function Options({ navigation: { navigate }, mailScn, gooScn, fbScn, disabled, mailParams }) {
  return <View style={styles.wrapper}>
    <TouchableOpacity style={styles.button} disabled={disabled.value}
      onPress={() => navigate(mailScn, { userType: mailParams })}>
      <Image source={mailIcon} resizeMode="contain" style={styles.img} />
      <Text style={styles.butText}>Email</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}
      onPress={gooScn} disabled={disabled.value}>
      <Image source={gooIcon} resizeMode="contain" style={styles.img} />
      <Text style={styles.butText}>Google</Text>
      {disabled.loading === 'Google' && <ActivityIndicator size='small' color='#fff' />}
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}
      onPress={fbScn} disabled={disabled.value}>
      <Image source={fbIcon} resizeMode="contain" style={styles.img} />
      <Text style={styles.butText}>Facebook</Text>
      {disabled.loading === 'Facebook' && <ActivityIndicator size='small' color='#fff' />}
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: v_scale(60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingVertical: v_scale(15),
    paddingLeft: scale(55),
    width: scale(250),
    marginBottom: v_scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(25),
    backgroundColor: Colors.AmberRed
  },
  butText: {
    color: '#fff',
    fontSize: Textsizes.xMedium
  },
  img: {
    height: 25,
    marginRight: scale(15),
  }
})