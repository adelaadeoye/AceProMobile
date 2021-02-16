import React from 'react';
import { View, StyleSheet } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { scale, v_scale } from 'sm/utils/StylesConst';
import { windowWidth } from 'sm/utils/Dimensions';

export default function Loader({ profile = null }) {
  return <View style={{ flex: 1 }}>
    <SkeletonPlaceholder>
      {(profile == 'profile') ? <View style={styles.wrapper}>
        <View style={styles.topProf} />
        <View style={{ marginLeft: 20 }}>
          <View style={{ width: scale(200), height: v_scale(50), borderRadius: 4 }} />
          <View style={{ marginTop: 10, width: scale(150), height: v_scale(50), borderRadius: 4 }} />
        </View>
      </View> : <View style={styles.midWrap}>
          <View style={{ width: scale(300), height: v_scale(50), borderRadius: 4 }} />
          <View style={{ marginTop: 10, width: scale(250), height: v_scale(40), borderRadius: 4 }} />
          <View style={{ marginTop: 10, width: scale(200), height: v_scale(40), borderRadius: 4 }} />
        </View>}
      <View style={styles.midWrap}>
        <View style={{ width: scale(300), height: v_scale(40), borderRadius: 4 }} />
        <View style={{ marginTop: 10, width: scale(250), height: v_scale(40), borderRadius: 4 }} />
        <View style={{ marginTop: 10, width: scale(200), height: v_scale(40), borderRadius: 4 }} />
      </View>
      <View style={styles.midWrap}>
        <View style={{ width: scale(300), height: v_scale(40), borderRadius: 4 }} />
        <View style={{ marginTop: 10, width: scale(250), height: v_scale(40), borderRadius: 4 }} />
        <View style={{ marginTop: 10, width: scale(200), height: v_scale(40), borderRadius: 4 }} />
      </View>
    </SkeletonPlaceholder>
  </View>
};

const styles = StyleSheet.create({
  wrapper: {
    width: windowWidth,
    height: v_scale(200),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'
  },
  topProf: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50)
  },
  midWrap: {
    marginVertical: v_scale(40),
    marginLeft: scale(30),
  }
})