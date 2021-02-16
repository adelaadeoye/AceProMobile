import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TopNavbar from 'sm/components/TopNavbar';
import LoginLogo from 'sm/components/LoginLogo';
import FormButton from '../components/FormButton';
import Input from '../components/FormInput';
import auth from '@react-native-firebase/auth';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { validateEmail } from 'sm/utils/Helpers'

const passwordReset = email =>
  auth().sendPasswordResetEmail(email)

export default function ForgotPass({ navigation }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const [email, setEmail] = useState({
    value: '',
    isValid: null,
    error: ''
  })

  const handleSendEmail = () => checkFullValidate().then(() => {
    setIsDisabled(true);

    passwordReset(email.value).then(() => {
      setIsDisabled(false);
      setSuccess('Password reset link sent to email');
      setTimeout(() => {
        setSuccess('')
      }, 5000);

    }).catch((e) => {
      setIsDisabled(false);
      // alert(e)
      setError('Email not registered');
      setTimeout(() => {
        setError('')
      }, 5000);
    })
  }).catch((e) => { })
  const checkFullValidate = async () => {
    let promise = new Promise((resolve, reject) => {
      setEmail({
        email: {
          ...email,
          isValid: (email.isValid === true)
        }
      })
      setTimeout(() => {
        email.isValid ? resolve(true) : reject(false)
      }, 0);
    });
    return promise
  }

  const validate = (val) => {
    setEmail({
        ...email,
        value: val,
        isValid: validateEmail(val)
    })
  }

  return <KeyboardAwareScrollView>
    <View style={styles.wrapper}>
      <TopNavbar navigation={navigation} back={true} />
      <LoginLogo />
      <Text style={styles.text}>Forgot Password?</Text>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!!success && <Text style={[styles.errorText, { color: 'green', fontSize: Textsizes.Regular }]}>{success}</Text>}
      <Input
        placeholder='ab@gmail.com'
        value={email.value}
        required
        labelText='Email'
        autoCorrect={false}
        errorMessage="email is invalid"
        keyboardType="email-address"
        isValid={email.isValid}
        onBlur={() => validate(email.value)}
        onChangeText={(val) => validate(val)}
      />
      <FormButton
        buttonTitle="Send Email"
        disabled={isDisabled}
        onPress={handleSendEmail}
      />
    </View>
  </KeyboardAwareScrollView>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  text: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Large,
    textAlign: 'center',
    marginBottom: 50
  },
  errorText: { 
    color: 'red', 
    fontSize: Textsizes.Regular,
    marginBottom: 8
  }
})