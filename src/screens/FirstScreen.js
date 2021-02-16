import React, {useEffect} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {View, StyleSheet, LogBox} from 'react-native';
import {windowHeight} from '../utils/Dimensions';
import Button from '../components/Button';
import TopNavbar from '../components/TopNavbar';
import LoginLogo from '../components/LoginLogo';

export default function FirstScreen({navigation}) {
  useEffect(() => {
    LogBox.ignoreLogs([
      'Unhandled Promise Rejection',
      "Can't perform a React state update on an unmounted component",
    ]);
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <TopNavbar />
        <LoginLogo />
        <View style={styles.login}>
          <Button
            buttonTitle="Login"
            onPress={() => navigation.navigate('AuthOpts', {mode: 'Log in'})}
          />
        </View>
        <View style={styles.signup}>
          <Button
            buttonTitle="Register"
            onPress={() => navigation.navigate('AuthOpts', {mode: 'Sign up'})}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    marginTop: windowHeight * 0.1219,
  },
  signup: {
    marginTop: windowHeight * 0.0529,
  },
});
