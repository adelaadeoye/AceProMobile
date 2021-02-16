import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import Colors from 'sm/utils/Colors';

export default function TrashIcon({ removeLoading, ...props }) {
  return <TouchableOpacity {...props} disabled={removeLoading} style={{ backgroundColor: removeLoading ? '#fff' : '' }}>
    <Icon name="trash" size={20} color={Colors.AmberRed} />
    {removeLoading && <ActivityIndicator size="small" color="grey" style={styles.loader} />}
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute'
  }
})