import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from 'sm/utils/Colors';
import { windowHeight, windowWidth } from 'sm/utils/Dimensions';
import { scale } from 'sm/utils/StylesConst';
import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';
import Textsizes from 'sm/utils/Textsizes';

const { AmberRed, LightAsh } = Colors;

const TextTab = ({ title, desc }) => {
  const DEFAULT_PROPS = {
    WebView,
    onLinkPress(evt, href) {
      Linking.openURL(href);
    },
  };

  return <View style={styles.container}>
    <Text style={styles.topHeadText}>Notes</Text>
    <Text style={styles.lowHeadText}>"{title}"</Text>
    <HTML
      {...DEFAULT_PROPS}
      source={{ html: desc }}
      containerStyle={{ backgroundColor: LightAsh }}
      baseFontStyle={{ fontSize: Textsizes.Regular }}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: windowHeight * 0.3,
    width: scale(340),
    borderWidth: 2,
    borderColor: AmberRed,
    borderRadius: 15,
  },
  topHeadText: {
    color: AmberRed,
    fontSize: Textsizes.Medium
  },
  lowHeadText: {
    marginTop: 5,
    fontWeight: 'bold'
  }
});

export default TextTab;