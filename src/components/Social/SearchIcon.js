import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { scale, v_scale } from 'sm/utils/StylesConst'
import Colors from 'sm/utils/Colors';

export default function SearchIcon({ closeSearch, startSearch, input: [searchInput, setSearchInput] }) {
  return <View style={styles.container}>
    <View style={styles.searchWrap}>
      <Icon name="search1" color={Colors.AmberRed} size={22} onPress={() => startSearch(true)} />
      <TextInput style={styles.input}
        value={searchInput}
        autoCapitalize='none'
        onChangeText={(val) => setSearchInput(val)} />
      <Icon name="close" size={22} onPress={() => {
        startSearch(false)
        setSearchInput('')
        closeSearch()
      }} />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: v_scale(5),
    left: scale(17),
    zIndex: 10,
    backgroundColor: Colors.LightAsh
  },
  searchWrap: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: scale(5),
    borderWidth: 1,
    borderColor: Colors.AmberRed,
    borderRadius: 20,
    width: scale(380),
    height: scale(45),
  },
  input: {
    width: scale(300),
    borderRadius: 20,
  }
})