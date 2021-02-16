import React, { useContext, useState, useEffect } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, LogBox } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { AuthContext } from '../navigation/AuthProvider';
import { KeyStats, ComingTraining, ComingTour, EditProfile, MyCoaches, MyClub } from 'sm/components/Home';
import image from '../assets/headerImage.png';
import girl from '../assets/player.png';
import Container from 'sm/components/Container';
import circle1 from 'sm/assets/circle1.png';
import circle2 from 'sm/assets/circle2.png';
import Icon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import Loader from 'sm/components/Loader';
import useStateWithCallback from 'sm/utils/Helpers';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [activeScreen, setActiveScreen] = useState('');
  const [showLoader, setShowLoader] = useState(true);
  const [showMod, setShowMod] = useState({ visible: false });
  const [userDet, setUserDet] = useStateWithCallback({}, () => {
    setShowLoader(false)
  })

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        setUserDet({ displayName: user?.displayName })
      }
      LogBox.ignoreLogs(['Unhandled Promise Rejection', 
      "Can't perform a React state update on an unmounted component", "Deprecation warning:"]);

      return () => {
        setShowLoader(true)
      }
    }, [user]))

  return (
    <Container home={true} navigation={navigation} activeScreen={activeScreen}>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        {showLoader ? <Loader profile='profile' /> :
          <>
            <ImageBackground source={image} style={styles.image}>
              <Image source={girl} style={styles.avatarImage} />
              <View style={styles.detailStyle}>
                <Icon name="edit" size={20} color="#fff" onPress={() => setShowMod({ visible: true, type: 'editProf' })} style={styles.edit} />
                <View style={styles.nameStyle}>
                  <Text style={styles.nameText}>{userDet?.displayName}</Text>
                  <Text style={styles.rankText}>Sectional Ranking   #5</Text>
                  <Text style={styles.rankText}>National Ranking   #24</Text>
                </View>
                <View style={styles.items}>
                  <TouchableOpacity onPress={() => setShowMod({ visible: true, type: 'myCoaches' })}
                    style={styles.itemOne}>
                    <Text style={styles.nameText}>My Coaches</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowMod({ visible: true, type: 'myClub' })}
                    style={styles.itemTwo}>
                    <Text style={styles.nameText}>My Club</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.circlesWrap}>
                  <View style={styles.utrScore}>
                    <Text style={styles.rankText}>15.95</Text>
                    <Text style={styles.rankText}>UTR</Text>
                  </View>
                  <Image source={circle2} style={styles.circle2} />
                  <Image source={circle1} style={styles.circle1} />
                </View>
              </View>
            </ImageBackground>
            <KeyStats />
            <ComingTraining navigation={navigation} />
            <ComingTour />
            <Modal animationType="none"
              visible={showMod.visible}>
              {showMod?.type == 'editProf' && <EditProfile navigation={navigation} handleCloseModal={() => setShowMod({ visible: false })} callback={() => setShowMod({ visible: false })} />}
              {showMod?.type == 'myCoaches' && <MyCoaches navigation={navigation} handleCloseModal={() => setShowMod({ visible: false })} />}
              {showMod?.type == 'myClub' && <MyClub navigation={navigation} handleCloseModal={() => setShowMod({ visible: false })} />}
            </Modal>
          </>
        }
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f1',
  },
  image: {
    width: windowWidth * 1.05,
    resizeMode: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20
  },
  edit: {
    alignSelf: 'flex-end',
    marginRight: 15,
    paddingLeft: 30
  },
  avatarImage: {
    width: windowWidth * 0.4,
    resizeMode: 'contain',
    marginHorizontal: windowWidth * 0.04,
    marginTop: windowHeight * 0.06
  },
  nameStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: windowWidth * 0.45,
    paddingVertical: 7,
    paddingHorizontal: 15
  },
  nameText: {
    color: '#FFF6F4',
    fontWeight: 'bold',
    fontSize: 15,
  },
  rankText: {
    color: '#FFF6F4',
    fontSize: 13,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  itemOne: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
    marginRight: windowWidth * 0.01
  },
  itemTwo: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8
  },
  detailStyle: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 30
  },
  circlesWrap: {
    alignSelf: 'flex-end',
    marginTop: 5,
    width: windowWidth * 0.3
  },
  circle1: {
    top: 5,
    left: 10,
    position: 'absolute',
  },
  utrScore: {
    position: 'absolute',
    top: 18,
    left: 25,
    zIndex: 5
  }
});

export default HomeScreen;

const getUser = (setState, setShowLoader, user) => {
  firestore().doc(`Users/${user.email}`).get().then(query => {
    const { first_name, last_name } = query.data();
    setState({
      displayName: `${first_name} ${last_name}`
    })
    setShowLoader(false)
  }).catch(() => {
    setState({
      displayName: 'user-test'
    })
    setShowLoader(false)
  });

}