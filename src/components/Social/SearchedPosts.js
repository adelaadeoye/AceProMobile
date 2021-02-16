import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function SearchedPosts({ posts, showItems, children }) {
  return <View style={{ position: 'absolute', top: 0 }}>
    {children}
  </View>
}
