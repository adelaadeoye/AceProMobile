import React, { useState, useEffect } from 'react'
import {
  ScrollView, View, Text, Image,
  StyleSheet, ImageBackground, TouchableOpacity
} from 'react-native';
import image from 'sm/assets/headerImage.png';
import girl from 'sm/assets/player.png';
import Icon from 'react-native-vector-icons/AntDesign';
import { windowWidth, windowHeight } from 'sm/utils/Dimensions';
import ImagePicker from 'react-native-image-picker';
import TopNavbar from 'sm/components/TopNavbar';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';

export default function EditProfile({ handleCloseModal, navigation, callback }) {
  const [sources, setSources] = useState({});

  useEffect(() => {
    return () => {
      setSources({})
    }
  }, [])

  const chooseImg = (type) => ImagePicker.launchImageLibrary(
    {
      mediaType: 'photo',
      // includeBase64: false,
      noData: true,
      // maxHeight: windowWidth * 0.4,
      // maxWidth: windowWidth * 0.4,
    },
    (response) => {
      if (response.uri)
        setSources(state => ({ ...state, [type]: response }))
      // handleSaveImage(response);
    },
  )
  const { profile, profileBg } = sources

  return <View>
    <TopNavbar home={true} navigation={navigation} callback={callback} />
    <ScrollView>
      <ImageBackground source={profileBg?.uri ? { uri: profile.uri } : image} style={styles.image}>
        <View style={{ marginBottom: 50, marginRight: 50 }}>
          <TouchableOpacity style={styles.ltIconWrap} onPress={() => chooseImg('profile')}>
            <Icon name="camerao" size={30} color="#fff" />
          </TouchableOpacity>
          <Image source={profile?.uri ? { uri: profile.uri } : girl} style={styles.avatarImage} />
        </View>
        <TouchableOpacity style={styles.rtIconWrap} onPress={() => chooseImg('profileBg')}>
          <Icon name="camerao" size={30} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.detailsText}>
        <View style={styles.textRow}>
          <Text style={styles.detTextbd}>Name</Text>
          <Text style={styles.detText}>Micheal Dobbs</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.detTextbd}>Nationality</Text>
          <Text style={styles.detText}>American</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.detTextbd}>Sectional Ranking</Text>
          <Text style={styles.detText}>5</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.detTextbd}>National Ranking</Text>
          <Text style={styles.detText}>24</Text>
        </View>
      </View>
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
          <Text style={styles.butText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCloseModal}
          style={[styles.button, { backgroundColor: Colors.AmberRed }]}>
          <Text style={[styles.butText, { color: '#fff' }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
}

const styles = StyleSheet.create({
  image: {
    height: windowHeight * 0.35,
    width: windowWidth * 1.05,
    resizeMode: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarImage: {
    width: windowWidth * 0.4,
    resizeMode: 'contain',
    marginHorizontal: windowWidth * 0.04,
    marginTop: windowHeight * 0.06
  },
  rtIconWrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
    marginRight: 60
  },
  ltIconWrap: {
    position: 'absolute',
    top: 100,
    left: 65,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 100,
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.AmberRed
  },
  butText: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Medium
  },
  detailsText: {
    marginVertical: 30
  },
  textRow: {
    paddingVertical: 10,
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  detText: {
    color: Colors.AmberRed
  },
  detTextbd: {
    color: Colors.AmberRed,
    fontWeight: 'bold'
  }
})