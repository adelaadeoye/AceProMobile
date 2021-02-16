import React, { useState, useContext } from 'react'
import {
  ScrollView, View, Text, StyleSheet, Image,
  TextInput, TouchableOpacity, Button, ActivityIndicator
} from 'react-native';
import TopTabs from 'sm/components/TopTabs';
import { AuthContext } from 'sm/navigation/AuthProvider';
import { socialIcons } from 'sm/utils/Constants';
import { PostTab, Boards } from 'sm/components/Social';
import Colors from 'sm/utils/Colors';
import Container from '../components/Container';
import profile from 'sm/assets/31.png';
import { windowHeight, windowWidth } from 'sm/utils/Dimensions';
import Textsizes from 'sm/utils/Textsizes';
import DropDown from 'sm/components/DropDown';
import { shareTypes } from 'sm/utils/Constants';
import InnerModal from 'sm/components/InnerModal';
import TopModal from 'sm/components/TopModal';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import { uploadFileToFireBase } from 'sm/components/Goals/fb/firestore-uploadAssets';
import {
  savePost, getPost, saveBookMark, delBookMark, getBoardBookmark,
  getBoards, saveBoard, SearchedPosts, addBoardBookMark, getUser,
  delBoardBookMark, saveComm, saveLike, delLike, SearchIcon, getUsers
} from 'sm/components/Social';
import { scale, v_scale } from 'sm/utils/StylesConst'
import AwesomeAlert from 'react-native-awesome-alerts';
import useStateWithCallback from 'sm/utils/Helpers';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import Loader from 'sm/components/Loader';
import Icon from 'react-native-vector-icons/AntDesign';
import socIcon1 from 'sm/assets/soc-edit-icon1.png';
import socIcon2 from 'sm/assets/soc-edit-icon2.png';
import socIcon3 from 'sm/assets/soc-edit-icon3.png';
import socIcon32 from 'sm/assets/soc-edit-icon3-2.png';
import socIcon4 from 'sm/assets/soc-edit-icon4.png';
import socIcon42 from 'sm/assets/soc-edit-icon4-2.png';
import Modal from 'react-native-modal';
import Input from 'sm/components/FormInput';
import { validateText } from 'sm/utils/Helpers';
import FormButton from 'sm/components/FormButton';
import { runKeyBoardList } from 'sm/screens/GoalScreen';
import Divider from 'sm/components/Divider';
import { lowerCase } from 'lodash';

Geocoder.fallbackToGoogle("AIzaSyDmP1R_fuOWKOXP0O0YsoHDV-jn7nDFJc8");
// Remember to change to client's google Map API key 

export const formatTime = (val) => {
  if (val.includes('a few seconds')) {
    return `1s`
  } else if (val.includes('minutes')) {
    return `${val.split(' ')[0]}mins`;
  } else if (val.includes('minute')) {
    return `1min`
  } else if (val.includes('days')) {
    return `${val.split(' ')[0]}d`;
  } else if (val.includes('day')) {
    return `1d`;
  } else if (val.includes('hours')) {
    return `${val.split(' ')[0]}h`;
  } else if (val.includes('hour')) {
    return `1h`;
  } else if (val.includes('months')) {
    return `${val.split(' ')[0]}mons`
  } else if (val.includes('month')) {
    return `1mon`;
  } else {
    return val
  }
}

export default function ({ navigation }) {
  const { user } = useContext(AuthContext);

  const [activeScreen, setActiveScreen] = useState('Social');
  const [activeTab, setActiveTab] = useState('home');
  const [isOpen, setisOpen] = useState(false);
  const [shareType, setshareType] = useState('My Team:ios-people-outline');
  const [posts, setPosts] = useStateWithCallback([],
    () => setShowLoader(false))
  const [showMedia, setShowMedia] = useState(false);
  const [showSaveLoading, setShowSaveLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState([]);
  const [uploadErr, setUploadErr] = useState([]);
  const [topErr, setTopErr] = useState({});
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [assetsRef, setAssetsRef] = useState([])
  const [writeStatus, setWriteStatus] = useState('save');
  const [updateDesc, setUpdateDesc] = useState(null);
  const [totalFileSize, setTotalFileSize] = useState(0)
  const [pics, setPics] = useState([]);
  const [vids, setVids] = useState([]);
  const [description, setDescription] = useState('')
  const [showLoader, setShowLoader] = useState(true)
  const [delChk, setDelChk] = useState({})
  const [pickedBoard, setPickedBoard] = useState('Bookmarked');
  const [showBookboard, setShowBookboard] = useState(false);
  const [postToBook, setPostToBook] = useState(null);
  const [boardBookMarks, setBoardBookMarks] = useState({});
  const [boards, setBoards] = useState([]);
  const [cusInput, setCusInput] = useState({
    val: '', isValid: null, isDisabled: false
  });
  const [showCusInput, setShowCusInput] = useState(false);
  const [showGeo, setShowGeo] = useState('');
  const [commInput, setCommInput] = useState({
    val: '', isDisabled: false
  });
  const [showComm, setShowComm] = useState(false);
  const [search, setSearch] = useState({ open: false, result: [] });
  const [showMenu, setShowMenu] = useState(true);
  const [showBoardBkMk, setShowBoardBkMk] = useState('');
  const [userDets, setUserDets] = useState({});
  const [users, setUsers] = useState([]);
  const [tagUserSearch, setTagUserSearch] = useState('');
  const [taggedUser, setTaggedUser] = useState('');
  const [filtTaggedUsers, setFiltTaggedUsers] = useState([]);
  const [slideUp, setSlideUp] = useState('');
  const [places, setPlaces] = useState([]);
  const [taggedLoc, setTaggedLoc] = useState('');
  const [startSearch, setStartSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      fetchPost();
      onPressAddGeoTag();
      runKeyBoardList({ callback: setShowMenu });

      return () => {
        handleDestroyAssets();
        initializeState();
        runKeyBoardList({ event: 'remove', callback: setShowMenu });
      };
    }, [])
  );

  const initializeState = () => {
    setShowLoader(true)
    setShowSaveLoading(false)
    setshareType('My Team:ios-people-outline')
    setCommInput({ val: '', isDisabled: false })
    setPics([]);
    setVids([]);
    setDelChk({});
    setDescription('');
    setUploadSuccess([]);
    setDownloadUrls([]);
    setSearch({ open: false, result: [] })
    setPostToBook('');
    setSlideUp('');
    setStartSearch(false)
    setSearchInput('')
  }

  const validate = (val) => setCusInput({
    ...cusInput,
    val,
    isValid: validateText(val, 20, 'symbols')
  })

  const checkFullValidate = () => new Promise((resolve, reject) => {
    setCusInput({
      ...cusInput,
      isValid: cusInput.isValid === true
    })
    setTimeout(() => {
      cusInput.isValid ? resolve(true) : reject(false)
    }, 0);
  })

  const handleCheckWriteStatus = () => {
    if (writeStatus === 'edit') {
      return handleSaveOrUpdate(updateCallback)
    }

    handleSaveOrUpdate(saveCallback)
  }

  const handleSaveOrUpdate = (callback) => {
    setShowSaveLoading(true)
    if (!description) {
      setShowSaveLoading(false)
      return setTopErr({
        val: true,
        message: 'Please enter post desciption'
      })
    }

    let stillProcessing = uploadSuccess.map(i => Object.values(i)[0]).includes(false)
    if (stillProcessing) {
      setShowSaveLoading(false)
      return setTopErr({
        val: true,
        message: 'Still processing files. Kindly wait'
      })
    }

    setAssetsRef([]);
    callback();
  }

  const saveCallback = () => {
    const runNext = () => {
      setisOpen(false)
      initializeState()
      fetchPost()
      setShowSaveLoading(false)
    }
    const { displayName, email } = user;

    let postDetails = {
      share_with: shareType,
      author: {
        email,
        user_name: displayName
      },
      tagged_users: taggedUser,
      tagged_location: taggedLoc,
      comments: [],
      likers: [],
      description,
      bookMarks: [],
      assets: downloadUrls,
      created_at: moment().format(),
      updated_at: moment().format(),
    }
    savePost(postDetails, runNext)
  }

  const updateCallback = () => {
    const runNext = () => {
      initializeState()
      fetchPost()
      setShowSaveLoading(false)
      setUpdateDesc(null);
      setUpdateTimeStp(null);
    }
    let postDetails = {
      share_with: activeTab,
      description,
      // assets: downloadUrls,
      updated_at: moment().format(),
    }
    console.log(updateTimeStp);
    updatePost(user, postDetails, updateTimeStp, runNext)
  }

  const fetchPost = async () => {
    setShowLoader(true)
    fetchUser()
    fetchUsers()
    fetchBoardBookmarks()
    fetchBoards()
    const runNext = (data) => {
      setPosts(data);
    }
    if (!posts.length) {
      await getPost(runNext)
    }
  }

  const fetchUser = async () => {
    const runNext = (data) => {
      setUserDets(data);
    }
    await getUser(user, runNext);
  }

  const fetchUsers = async () => {
    const runNext = (data) => {
      setUsers(data);
    }
    await getUsers(runNext);
  }

  const fetchBoardBookmarks = async () => {
    const runNext = (data) => setBoardBookMarks(data);
    await getBoardBookmark(user, runNext)
  }

  const fetchBoards = async () => {
    const runNext = (data) => {
      setBoards(data)
      setShowCusInput(false)
      setCusInput({ val: '', isValid: null, isDisabled: false })
    }
    await getBoards(user, runNext)
  }

  const handleCancel = () => {
    handleDestroyAssets();
    setisOpen(false);
    setShowSaveLoading(false);
    setSlideUp('');
    setDescription('');
  }

  const handleDestroyAssets = () => {
    assetsRef.forEach(ar => {
      try {
        storage().ref(ar).delete()
      } catch (error) {
      }
    })
  }

  const monitorUpload = async (response, id, mediaType) => {

    setUploadSuccess([{ [`${id}-${response.fileName}`]: false }]);

    const uploadTask = uploadFileToFireBase(response, id, 'Social');
    uploadTask.then(async () => {
      const user = auth().currentUser;
      const { fileName } = response;
      const assetRef = `Social/${user.email}/${id}-${fileName}`;
      const downloadPath = await storage().ref(assetRef).getDownloadURL();
      setAssetsRef([assetRef, ...assetsRef]);
      console.log('download', downloadPath)
      setDownloadUrls([{ file: downloadPath, mediaType }, ...downloadUrls]);
      setUploadSuccess([{ [`${id}-${response.fileName}`]: true }, ...uploadSuccess]);
    }
    ).catch(e => {
      console.log('uploadErr', e.message);
      setUploadErr([{ [`${id}-${response.fileName}`]: true }, ...uploadErr])
    });
  };

  const validateSize = (size) => new Promise((resolve, reject) => {
    const maxTotalFileSize = 200000000000;
    (totalFileSize + size) > maxTotalFileSize ? reject(false) : resolve(true);
  })

  const onPressAddImage = () => {
    const id = Math.random().toString(36).slice(3);

    ImagePicker.launchImageLibrary({
      noData: true
    },
      (response) => {
        if (response.uri) {
          validateSize(response.fileSize).then(() => {
            setTotalFileSize(totalFileSize + response.fileSize)
            setPics([{ filePath: response.uri, fileName: response.fileName, id }, ...pics]);
            monitorUpload(response, id, 'image');
          }).catch(() => {
            setTopErr({ val: true, message: 'This file size exceeds total 200MB limit!' })
          });
        }
      })
  }

  const onPressOpenCam = () => {
    const id = Math.random().toString(36).slice(3);

    ImagePicker.launchCamera({
      noData: true,
      saveToPhotos: true
    },
      (response) => {
        if (response.uri) {
          validateSize(response.fileSize).then(() => {
            setTotalFileSize(totalFileSize + response.fileSize)
            setPics([{ filePath: response.uri, fileName: response.fileName, id }, ...pics]);
            monitorUpload(response, id, 'image');
          }).catch(() => {
            setTopErr({ val: true, message: 'This file size exceeds total 200MB limit!' })
          });
        }
      })
  }

  const onPressAddGeoTag = () => {
    try {
      Geolocation.getCurrentPosition(position => {
        const { coords: { latitude, longitude } } = position;
        fetchNearestPlacesFromGoogle(latitude, longitude);
      },
        error => { },
        { enableHighAccuracy: true, timeout: 20000 },
      );
    } catch (error) {

    }
  }

  const fetchNearestPlacesFromGoogle = (lat, lng) => {
    let radMetter = 2 * 1000; // Search withing 2 KM radius
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=' + radMetter + '&key=' + 'AIzaSyCw8KDvLHXpm6XHDleb6hL5_yesNo2Ab9U';
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        let places = [];
        for (let googlePlace of res.results) {
          let place = {}
          let lat = googlePlace.geometry.location.lat;
          let lng = googlePlace.geometry.location.lng;
          let coordinate = {
            latitude: lat,
            longitude: lng,
          }

          place['coordinate'] = coordinate
          place['placeId'] = googlePlace.place_id
          place['placeName'] = googlePlace.name

          places.push(place);
        }

        setPlaces(places);
      })
      .catch(error => {
        console.log('places-api-err', error);
      });
  }

  const handleCreateBoard = () => {
    try {
      checkFullValidate().then(() => {
        setCusInput({
          ...cusInput,
          isDisabled: true
        })
        if (boards.includes(cusInput.val) || (cusInput.val === 'Bookmarked')) {
          return setTopErr({
            val: true,
            message: 'This board already exists!!'
          })
        }
        const runNext = () => {
          setBoards([cusInput.val, ...boards]);
          // fetchBoards()
        }
        saveBoard(user, cusInput.val, runNext)
      })
    }
    catch (error) {

    }
  }

  const updatePostWithComm = (comm) => {
    const { commented_post: { post_creation } } = comm;

    const updatedPosts = posts.map(e => {
      if (e.created_at === post_creation) {
        return { ...e, comments: [comm, ...e.comments] }
      }
      return e
    })
    setPosts(updatedPosts)
  }

  const addComm = (post, comm) => {
    const { displayName, email } = user;
    let commDetails = {
      comment: comm,
      commented_post: {
        post_creation: post.created_at,
        post_desc: post.description
      },
      author: {
        user_name: displayName,
        email
      }
    }
    const runNext = () => {
      updatePostWithComm(commDetails)
      setCommInput({ val: '', isDisabled: false })
    }
    saveComm(commDetails, runNext)
  }

  const updatePostWithLike = (likeDet, post_creation, state) => {
    const updatedPosts = posts.map(e => {
      if (e.created_at === post_creation) {
        if (state === 'del') {
          return { ...e, likers: e.likers.filter(e => e === likeDet) }
        } else {
          return { ...e, likers: [likeDet, ...e.likers] }
        }
      }
      return e
    })
    setPosts(updatedPosts)
  }

  const handleAddOrDelLike = (post_creation) => {
    const { displayName, email } = user;
    let likeDet = {
      user_name: displayName,
      email
    }
    const runNext = (state) => {
      updatePostWithLike(likeDet, post_creation, state)
    }
    for (const e of posts) {
      if (e.created_at === post_creation) {
        if (e.likers.some(i => i.email === email)) {
          delLike(likeDet, post_creation, () => runNext('del'))
        } else {
          saveLike(likeDet, post_creation, runNext)
        }
        break;
      }
    }
  }

  const updatePostWithBkMark = (bkMkDet, postCreation, state) => {
    const updatedPosts = posts.map(e => {
      if (e.created_at === postCreation) {
        if (state === 'del') {
          return { ...e, bookMarks: e.bookMarks.filter(e => e === bkMkDet) }
        } else {
          return { ...e, bookMarks: [bkMkDet, ...e.bookMarks] }
        }
      }
      return e
    })
    setPosts(updatedPosts);
    setPostToBook('');
  }

  const handleAddOrDelBkMarks = (postCreation, board) => {
    const { displayName, email } = user;
    let bkMkDet = {
      user_name: displayName,
      email
    }
    const bkMkState = postToBook ? 'add' : 'del';
    console.log('bkMkState', bkMkState);
    const runNext = () => updatePostWithBkMark(bkMkDet, postCreation, bkMkState)
    if (bkMkState === 'del') {
      let getBoard = '';
      for (const boardBks of Object.keys(boardBookMarks)) {
        for (const bks of boardBookMarks[boardBks]) {
          if (bks.includes(postCreation)) {
            getBoard = boardBks;
            break;
          }
        }
        if (getBoard) break;
      }
      console.log('getBoard', getBoard);
      handleDelBoardBookMark(postCreation, getBoard);
      delBookMark(bkMkDet, postCreation, runNext);
    } else {
      handleAddBoardBookMark(board);
      saveBookMark(bkMkDet, postToBook, runNext);
    }
  }

  const handleAddBoardBookMark = (board) => {
    setPickedBoard(board);
    setShowBookboard(false);
    const runNext = () => fetchBoardBookmarks();
    addBoardBookMark(user, board, postToBook, runNext);
  }

  const handleDelBoardBookMark = (post, board) => {
    const runNext = () => fetchBoardBookmarks();
    console.log('post-creation1', post, 'board', board);
    delBoardBookMark(user, board, post, runNext);
  }

  const filtBookMarkedPosts = (board) => {
    const bkMarkedPosts = [];
    for (const bks of boardBookMarks[board]) {
      for (const post of posts) {
        if (post.created_at === bks) {
          bkMarkedPosts.push(post);
          break
        }
      }
    }
    return bkMarkedPosts;
  }

  const filtUsers = (val) => {
    setTagUserSearch(val);
    setTaggedUser('');
    const lowCaseVal = val.toLowerCase();
    if (val.startsWith('@')) lowCaseVal = lowCaseVal.slice(1);
    return setFiltTaggedUsers(users.filter(e =>
    (e.firstName.toLowerCase().includes(lowCaseVal.toLowerCase())
      || e.lastName.toLowerCase().includes(lowCaseVal.toLowerCase())))).slice(0, 15);
  }

  const filtPosts = (val) => {
    const lowCaseVal = val.toLowerCase();
    const postFilt = posts.filter(e => (e.author.user_name.toLowerCase().includes(lowCaseVal) ||
      e.description.toLowerCase().includes(lowCaseVal) || e.tagged_users.includes(lowCaseVal) ||
      e.tagged_location.includes(lowCaseVal)));
    return postFilt
  }

  const formatCount = (count) => {
    const runCalc = (div, suffix) => {
      let [first, second] = ((count / div).toString()).split('.')
      return `${first}.${second[0]}${!!(+second[1]) ? second[1] : ''}${suffix}`;
    }

    const len = count.toString().length;
    if (len > 3 && len < 7) {
      return runCalc(1000, 'K')
    } else if (len >= 7) {
      return runCalc(1000000, 'M')
    } else {
      return count;
    }
  }

  const boardCol = (e) => e === pickedBoard ? '#fff' : '#000';
  const boardBg = (e) => e === pickedBoard ? Colors.AmberRed : Colors.LightAsh;

  const leftText = <Icon name="close" size={25} color={Colors.AmberRed} onPress={() => handleCancel()} />
  const rightText = <TouchableOpacity disabled={showSaveLoading} onPress={() => handleCheckWriteStatus()}>
    <Text style={[styles.topTexts, styles.next]}>
      {writeStatus === 'edit' ? 'Update' : 'Next'}
    </Text>
    {showSaveLoading && <ActivityIndicator color="grey" />}
  </TouchableOpacity>

  const showItems = (items) => (!!showBoardBkMk && !items.length) ?
    <Text style={{
      color: Colors.AmberRed, fontSize: Textsizes.xMedium,
      padding: 20, paddingLeft: scale(40)
    }}>
      No bookmarked posts...
    </Text> //Items for posts and board bookmarked posts
    : items.map(e => <PostTab key={e.description} postCreation={e.created_at} commsNum={formatCount(e.comments.length)} assets={e?.assets} handleAddOrDelBkMarks={() => handleAddOrDelBkMarks(e.created_at)}
      title={`${e?.author?.user_name || e?.author?.email.slice(0, 15)}  ${formatTime(moment(e.created_at, '').fromNow())}`} content={e.description} isBookMarked={e.bookMarks.some(i => i.email === user.email)} comments={e.comments}
      handleAddComm={(val) => addComm(e, val)} comm={[commInput, setCommInput]} showComm={[showComm, setShowComm]} handleAddOrDelLike={() => handleAddOrDelLike(e.created_at)} likesNum={formatCount(e.likers.length)}
      setPostToBook={() => {
        setPostToBook(e.created_at)
        setShowBookboard(true)
      }} />);

  const iconStyles = {
    color: 'white',
    border: {
      backgroundColor: Colors.AmberRed,
      borderRadius: 50,
    },
  }

  const errObj = uploadErr.map(i => Object.values(i)[0] ? Object.keys(i)[0] : '')
  const mediaStat = (e) => errObj.includes(`${e.id}-${e.fileName}`);
  const succObj = uploadSuccess.map(i => Object.values(i)[0] ? Object.keys(i)[0] : '');
  const successStat = (e) => succObj.includes(`${e.id}-${e.fileName}`);

  const picItems = pics.map(e => <View key={e.id} style={{ marginVertical: 5 }}>
    <Image source={{ uri: e.filePath }} resizeMode='contain' style={{ width: scale(280), height: v_scale(200) }} />
    {!successStat(e) ? <View style={styles.mediaOverlay}>
      {mediaStat(e) ? <Icon name='exclamationcircle' size={35} color="red" /> : <ActivityIndicator color="#000" size="large" />}
    </View> : null}
  </View>)

  return <Container home={true} navigation={navigation} showMenu={(showMenu === false) ? false : !isOpen}
    activeScreen={activeScreen}>
    <View>
      <AwesomeAlert
        show={topErr?.val}
        showProgress={false}
        title={topErr?.message || 'There is an error'}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Close"
        cancelButtonColor="red"
        onCancelPressed={() =>
          setTopErr({ val: false })
        }
      />
      <AwesomeAlert
        show={!!showGeo}
        showProgress={false}
        title='Geo tag added'
        message={showGeo || ''}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Close"
        cancelButtonColor="red"
        onCancelPressed={() =>
          setShowGeo(false)
        }
      />
      <Modal // Add Custom Board Modal
        isVisible={showCusInput}
        backdropColor='#000'
        backdropOpacity={0.3}
        onBackdropPress={() => {
          setCusInput({ val: '', isValid: null, isDisabled: false })
          setShowCusInput(false)
        }}>
        <View style={{
          backgroundColor: '#fff', borderRadius: 10,
          borderWidth: 1, borderColor: Colors.AmberRed, alignItems: 'center',
          minHeight: v_scale(250), justifyContent: 'center'
        }}>
          <View style={{
            flexDirection: 'row', justifyContent: 'center',
            width: '100%'
          }}>
            <Text style={{ fontSize: Textsizes.xMedium, marginBottom: v_scale(20) }}>
              Add Custom Board
        </Text>
            <Icon name="close" size={25} color={Colors.AmberRed} style={{ position: 'absolute', right: 20 }} onPress={() => {
              setCusInput({ val: '', isValid: null, isDisabled: false })
              setShowCusInput(false)
            }} />
          </View>
          <View style={{ marginTop: v_scale(20) }}>
            <Input
              placeholder="My board"
              value={cusInput.val}
              required
              isValid={cusInput.isValid}
              onBlur={() => validate(cusInput.val)}
              onChangeText={(val) => validate(val)}
            />
          </View>
          <FormButton
            buttonTitle="Create Board"
            disabled={cusInput.isDisabled}
            onPress={handleCreateBoard}
          />
        </View>
      </Modal>
      <Modal // Show Media Modal
        isVisible={showMedia}
        backdropColor='#000'
        backdropOpacity={0.3}
        onBackdropPress={() => setShowMedia(false)}>
        <View style={{ alignItems: 'center', alignSelf: 'center', width: scale(300), backgroundColor: '#fff' }}>
          <View style={{ width: scale(180), paddingVertical: 20, }}>
            <Button title="Continue Editing" onPress={() => setShowMedia(false)}
              color={Colors.AmberRed} />
          </View>
          <ScrollView contentContainerStyle={{
            alignSelf: 'center', borderRadius: 20, marginBottom: 30, alignItems: 'center',
            backgroundColor: '#fff', paddingBottom: 60, paddingVertical: 15
          }}>
            {picItems}
          </ScrollView>
        </View>
      </Modal>
      <Modal // Bookmark Boards Modal
        isVisible={showBookboard}
        backdropColor='#000'
        backdropOpacity={0.3}
        onBackdropPress={() => setShowBookboard(false)}>
        <View style={{
          width: scale(250), backgroundColor: Colors.LightAsh, alignSelf: 'center',
          borderWidth: 1, borderColor: Colors.AmberRed, borderRadius: 10, minHeight: v_scale(400)
        }}>
          <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: Textsizes.Large, color: Colors.AmberRed }}>My Boards</Text>
            <Icon name="close" size={25} color={Colors.AmberRed} onPress={() => setShowBookboard(false)} />
          </View>
          {['Bookmarked', ...boards].map(e => <TouchableOpacity key={e} onPress={() => handleAddOrDelBkMarks(postToBook, e)}
            style={{ backgroundColor: boardBg(e), padding: 15 }}>
            <Text style={{ fontSize: Textsizes.xMedium, color: boardCol(e), fontWeight: '600' }}>
              {e}
            </Text>
          </TouchableOpacity>)}
        </View>
      </Modal>
      <>
        {isOpen ?
          <>
            <InnerModal topModal={<TopModal leftText={leftText}
              midText={<Text style={[styles.midText, styles.topTexts]}>New Post</Text>}
              rightText={rightText} />}>
              <View style={{ height: v_scale(638) }}>
                <View style={styles.dropWrap}>
                  <Image source={profile} style={styles.profileImg} resizeMode="contain" />
                  <Text style={styles.author}>{`${(userDets?.first_name || userDets?.last_name)
                    ? (userDets?.first_name + ' ' + userDets?.last_name) :
                    userDets.email.slice(0, 15)}`}</Text>
                </View>
                <DropDown goalType={shareType} dropWidth={0.4} colorMode
                  dropDownItems={shareTypes} withIcons position={{ left: scale(110), top: v_scale(8), zIndex: 200 }}
                  handleChange={(value) => setshareType(value)} />
                {(!!pics.length) && <View style={styles.nav}>
                  <Button title="Media" color={Colors.AmberRed}
                    onPress={() => setShowMedia(true)} />
                </View>}
                <TextInput style={styles.input}
                  placeholder='What would you like to share?'
                  value={description}
                  onChangeText={(val) => setDescription(val)}
                  multiline={true}
                />
              </View>
            </InnerModal>
            <View style={[styles.openView, !slideUp && { height: v_scale(90) }]}>
              <View style={[styles.line, !slideUp && { top: v_scale(15) }]} />
              <View style={styles.topModBar}>
                {!!slideUp && <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={[styles.author, { fontWeight: 'normal', textAlign: 'auto' }]}>
                    Tag a {slideUp === 'tag' ? 'friend' : 'location'}</Text>
                  <Icon name="close" size={25} color={Colors.AmberRed} onPress={() => {
                    setSlideUp('')
                    setFiltTaggedUsers([]);
                    setTagUserSearch('');
                  }} />
                </View>}
                <Divider color='grey' />
                {(slideUp === 'tag') ? <TextInput style={[styles.input, { height: v_scale(50), paddingLeft: scale(30), paddingTop: 0 }]}
                  placeholder='@...'
                  value={tagUserSearch}
                  onChangeText={(val) => filtUsers(val)}
                /> : <Text style={{
                  padding: 10, paddingTop: 0, paddingLeft: scale(20),
                  fontSize: Textsizes.Regular, color: 'grey', marginTop: v_scale(-10)
                }}>
                    Places nearby
                </Text>}
                <ScrollView style={styles.wrapLists}>
                  {(slideUp === 'tag') ? filtTaggedUsers.map(e =>
                    <Text style={[styles.tagList, (`${e.firstName} ${e.lastName}` === taggedUser) ?
                      { backgroundColor: 'green', color: '#fff' } : { color: '#000' }]}
                      key={e.email} onPress={() => setTaggedUser(`${e.firstName} ${e.lastName}`)}>
                      {e.firstName + ' ' + e.lastName}
                    </Text>) : places.map(e =>
                      <Text style={[styles.tagList, (e.placeName === taggedLoc) ?
                        { backgroundColor: 'green', color: '#fff' } : { color: '#000' }]}
                        key={e.placeId} onPress={() => setTaggedLoc(e.placeName)}>
                        {e.placeName}
                      </Text>)}
                </ScrollView>
              </View>
              <View style={styles.socIconWrap}>
                <TouchableOpacity onPress={() => onPressAddImage()}><Image source={socIcon1} /></TouchableOpacity>
                <TouchableOpacity onPress={() => onPressOpenCam()}><Image source={socIcon2} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setSlideUp((slideUp === 'tag') ? '' : 'tag')}>
                  <Image source={slideUp === 'tag' ? socIcon32 : socIcon3} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setSlideUp((slideUp === 'geoLoc') ? '' : 'geoLoc')}>
                  <Image source={slideUp === 'geoLoc' ? socIcon42 : socIcon4} /></TouchableOpacity>
              </View>
            </View>
          </>
          : <ScrollView>
            {showLoader ? <Loader /> :
              <>
                <TopTabs tabItems={socialIcons} length={4} handleIconPress={() => setisOpen(true)}
                  shrink isIconPresent searchPresent={() => {
                    setShowBoardBkMk('');
                    setActiveTab('home');
                    setSearch({ ...search, isOpen: true })
                  }} height={55} activeTab={activeTab} iconStyles={iconStyles} handleSetActive={(tab) => {
                    setShowBoardBkMk('');
                    setActiveTab(tab);
                  }} />
                {activeTab === 'home' && (startSearch ? showItems(filtPosts(searchInput)) : !!posts.length ? showItems(posts)
                  : <Text style={{ color: Colors.AmberRed, fontSize: Textsizes.Large, padding: 20 }}>
                    No Posts. Add new post...
                  </Text>)}
                {activeTab === 'appstore-o' && (!!showBoardBkMk ? showItems(filtBookMarkedPosts(showBoardBkMk))
                  : <Boards boards={boards} addBoard={() => setShowCusInput(true)} handleShowBkPosts={(board) => {
                    setShowBoardBkMk(board)
                  }} />)}
                {search.isOpen && <View style={{ position: 'absolute', top: 0}}>
                  <SearchIcon closeSearch={() => setSearch({ ...search, isOpen: false })}
                    input={[searchInput, setSearchInput]}
                    startSearch={(val) => setStartSearch(val)} />
                </View>}
              </>
            }
          </ScrollView>}
      </>
    </View>
  </Container>
}

const styles = StyleSheet.create({
  container: {

  },
  input: {
    width: scale(400),
    height: v_scale(420),
    textAlignVertical: 'top',
    alignSelf: 'center',
    padding: 10,
    paddingTop: 0,
    marginLeft: scale(15),
    fontSize: Textsizes.Regular,
  },
  wrapLists: {
    marginHorizontal: scale(20),
    maxHeight: v_scale(250),
  },
  topTexts: {
    textAlignVertical: 'bottom',
    fontSize: Textsizes.Medium
  },
  next: {
    color: 'grey'
  },
  midText: {
    fontWeight: 'bold'
  },
  profileImg: {
    width: windowWidth * 0.18,
    height: 90,
  },
  dropWrap: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 0,
    zIndex: 10
  },
  authorWrap: {
    height: 50,
  },
  tagList: {
    padding: 5,
    borderWidth: 1
  },
  author: {
    fontWeight: 'bold',
    fontSize: Textsizes.Medium,
    textAlign: 'center',
    marginLeft: scale(20),
    paddingTop: v_scale(10),
  },
  topModBar: {
    paddingHorizontal: scale(20),
    paddingTop: v_scale(20),
  },
  openView: {
    position: 'absolute',
    bottom: 0,
    left: scale(3),
    zIndex: 20,
    backgroundColor: '#fff',
    height: windowHeight * 0.57,
    width: windowWidth * 0.98,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  socIconWrap: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    alignSelf: 'center',
    paddingTop: v_scale(40),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    width: windowWidth * 0.98,
    height: windowHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  line: {
    height: 5,
    width: scale(70),
    backgroundColor: '#E5E3E3',
    position: 'absolute',
    left: scale(170),
    top: v_scale(10),
    zIndex: 10
  },
  mediaOverlay: {
    backgroundColor: 'grey',
    opacity: 0.8,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  nav: {
    margin: 5,
    width: scale(100)
  },
})