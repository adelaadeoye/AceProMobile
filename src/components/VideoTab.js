import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import Colors from 'sm/utils/Colors';
import { windowWidth } from 'sm/utils/Dimensions';

export default class VideoPlayerWrapper extends Component {
  constructor() {
    super()
    this.player = React.createRef();
  }
  // state = { playPressed: false };
  render() {
    const { source = 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4', style, shouldPlay, setPlay = () => {} } = this.props;

    if (!shouldPlay)
      this.player.current?.pause()

    return (
      <View style={[styles.container, style]}>
        <VideoPlayer
          video={{ uri: source }}
          ref={r => this.player.current = r}
          onStart={() => setPlay(source)}
          onPlayPress={() => setPlay(source)}
          pauseOnPress={true}
          fullScreenOnLongPress={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.8,
    marginVertical: 15,
  }
})