import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNavbar from 'sm/components/TopNavbar';
import LoginLogo from 'sm/components/LoginLogo';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { Options, ChooseType } from 'sm/components/AuthOpts';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { createUser } from 'sm/navigation/firestore-updateUser';
import moment from 'moment';

export default function AuthOpts({ navigation, route: { params: { mode } } }) {
  const [userType, setUserType] = useState('null');
  const [isDisabled, setIsDisabled] = useState({
    loading: '',
    value: false
  })

  const handleGoogleSign = () => {
    setIsDisabled({ loading: 'Google', value: true });
    onGoogleButtonPress(setIsDisabled, userType, mode).then(() => { });
  }

  const handleFacebookSignIn = () => {
    setIsDisabled({ loading: 'Facebook', value: true });
    onFacebookButtonPress(setIsDisabled, userType, mode).then(() => { })
  }

  return <View style={styles.wrapper}>
    <TopNavbar navigation={navigation} back={true} />
    <LoginLogo />
    {((userType !== 'null') || (mode === 'Log in')) && <Text style={styles.text}>{mode} with:</Text>}
    {((userType === 'null') && (mode === 'Sign up')) ? <ChooseType setType={setUserType} />
      : <Options navigation={navigation}
        gooScn={handleGoogleSign}
        fbScn={handleFacebookSignIn}
        mailParams={userType}
        params={mode} disabled={isDisabled}
        mailScn={mode === 'Sign up' ? 'Signup' : 'Login'} />}
    {((userType !== 'null') && (mode === 'Sign up')) && <Text style={styles.logText}
      onPress={() => navigation.navigate('AuthOpts', { mode: 'Log in' })}>
      Have an account? Login
        </Text>}
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: Colors.AmberRed,
    fontSize: Textsizes.xLarge,
    textAlign: 'center'
  },
  logText: {
    textAlign: 'center',
    color: Colors.AmberRed,
    fontSize: Textsizes.Medium,
    fontStyle: 'italic',
    marginTop: -30,
  }
})

GoogleSignin.configure({
  webClientId: '229339801783-uh5c4fi165gmj6nkpf5n99qgoa588290.apps.googleusercontent.com',
});

const typeGroup = (type) => {
  switch (type) {
    case 'Athlete':
      return 'coaches'
    case 'Coach':
      return 'athletes'
    default:
      return 'athletes';
  }
}

const getInfoFromToken = (accessToken, userType, res) => {
  const params = {
    fields: {
      string: 'email, picture, id, first_name, last_name, birthday'
    }
  }

  const { user: { metadata: { lastSignInTime, creationTime } } } = res
  let created = moment(creationTime).format();
  let lastLogged = moment(lastSignInTime).format();

  const myProfileRequest = new GraphRequest(
    '/me',
    { accessToken, parameters: params },
    (error, myProfileInfoResult) => {
      if (error) {
        // alert('Login info has error: ' + error.toString());
      } else {
        const { first_name, last_name, email, birthday = '-/-/-' } = myProfileInfoResult;

        let userDetails = {
          first_name,
          last_name,
          birthday,
          email,
          password: '******',
          date_created: created,
          last_updated: lastLogged,
          last_login: lastLogged,
          zipcode: '.....',
          user_type: userType,
          [typeGroup(userType)]: []
        }
        createUser(email, userDetails)
      }
    }
  );
  new GraphRequestManager().addRequest(myProfileRequest).start();
}

async function onFacebookButtonPress(setState, userType, mode) {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      return setState({ loading: '', value: false })
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      // alert('Something went wrong obtaining access token');
      return setState({ loading: '', value: false })
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    return auth().signInWithCredential(facebookCredential).then((res) => {
      if (mode === 'Sign up') {
        getInfoFromToken(data.accessToken, userType, res)
      }
      // alert(JSON.stringify(res, null, 2))
    });

  } catch (e) {
    // alert(e)
    setState({ loading: '', value: false })
  }
}

async function onGoogleButtonPress(setState, userType, mode) {
  try {
    const resp = await GoogleSignin.signIn();

    // alert(JSON.stringify(resp, null, 2))
    const googleCredential = auth.GoogleAuthProvider.credential(resp?.idToken);

    return auth().signInWithCredential(googleCredential).then(res => {
      const { user: { familyName, givenName, email, birthday = '-/-/-' } } = resp
      const { user: { metadata: { lastSignInTime, creationTime } } } = res
      let created = moment(creationTime).format();
      let lastLogged = moment(lastSignInTime).format();

      let userDetails = {
        first_name: givenName,
        last_name: familyName,
        birthday,
        email,
        password: '******',
        date_created: created,
        last_updated: lastLogged,
        last_login: lastLogged,
        zipcode: '.....',
        user_type: userType,
        [typeGroup(userType)]: []
      }
      if (mode === 'Sign up') createUser(email, userDetails)
    });

  } catch (e) {
    if (e.code === statusCodes.SIGN_IN_CANCELLED) {
      setState({ loading: '', value: false })
    }
  }
}
