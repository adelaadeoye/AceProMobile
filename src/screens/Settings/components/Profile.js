import React, { useContext } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import TextTab from './TextTab';
import Colors from 'sm/utils/Colors';
import fb from 'sm/assets/fb.png';
import gl from 'sm/assets/gl.png';
import Textsizes from 'sm/utils/Textsizes';
import { AuthContext } from 'sm/navigation/AuthProvider';
import { v_scale, scale } from 'sm/utils/StylesConst';

export default function () {
  const { logout } = useContext(AuthContext);

  return <View>
    <View style={styles.sectionedText}>
      <TextTab title='Email' info='example@acepro.com' />
      <TextTab title='Password' info='example@acepro.com' />
    </View>
    <View style={styles.sectionedText}>
      <TextTab title='Parent Email' info='parent@acepro.com' />
      <TextTab title='Coach Email' info='coach@acepro.com' />
    </View>
    <View style={styles.sectionedText}>
      <TextTab title='Billing' info='coach@acepro.com' />
    </View>
    <TouchableOpacity onPress={logout} style={styles.logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.socialButton]}>
      <Text style={styles.socialText}>Connect with facebook</Text>
      <Image source={fb} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.socialButton}>
      <Text style={styles.socialText}>Connect with google</Text>
      <Image source={gl} />
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  sectionedText: {
    marginTop: 40
  },
  socialButton: {
    backgroundColor: Colors.AmberRed,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: scale(15),
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    marginVertical: scale(8),
    width: scale(280)
  },
  socialText: {
    color: '#fff',
    marginRight: 10
  },
  logout: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: v_scale(50),
    marginVertical: scale(8),
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.AmberRed,
    alignSelf: 'center',
    width: scale(280),
    borderRadius: scale(15)
  },
  logoutText: {
    fontStyle: 'italic',
    fontSize: Textsizes.xMedium,
    color: Colors.AmberRed,
  }
})