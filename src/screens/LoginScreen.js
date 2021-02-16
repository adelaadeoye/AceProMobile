import React, { useState, useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import Input from '../components/FormInput';
import TopNavbar from '../components/TopNavbar';
import LoginLogo from '../components/LoginLogo';
import { validateEmail, validatePassword } from 'sm/utils/Helpers'
import updateUser from 'sm/navigation/firestore-updateUser';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: {
      value: '',
      isValid: null,
      error: ''
    },
    password: {
      value: '',
      isValid: null,
      error: 'Your password must be 6 characters'
    },
  })

  const { email, password } = form;

  const handleLogin = () => checkFullValidate().then(() => {
    setIsDisabled(true);
    login(email.value, password.value).then((res) => {
      const { user: { metadata: { lastSignInTime } } } = res
      updateUser(email.value, { last_login: lastSignInTime })
    }).catch((e) => {
      setIsDisabled(false);
      setError('Invalid email/password');
      setTimeout(() => {
        setError('')
      }, 5000);
    })
  }).catch((e) => { })

  const checkFullValidate = async () => {

    let promise = new Promise((resolve, reject) => {
      setForm({
        ...form,
        email: {
          ...email,
          isValid: (email.isValid === true)
        },
        password: {
          ...password,
          isValid: (password.isValid === true)
        }
      })
      setTimeout(() => {
        const { email, password } = form;

        (email.isValid && password.isValid) ? resolve(true) : reject(false)
      }, 0);
    });
    return promise
  }

  const validate = (val, name) => {
    switch (name) {
      case 'password':
        setForm({
          ...form,
          [name]: {
            ...form[name],
            value: val,
            isValid: validatePassword(val)
          },
        })
        break
      default:
        setForm({
          ...form,
          [name]: {
            ...form[name],
            value: val,
            isValid: validateEmail(val)
          }
        })
        break
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <TopNavbar navigation={navigation} back={true} />
        <LoginLogo />
        <Text style={styles.text}>Log in with</Text>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        <Input
          placeholder='ab@gmail.com'
          value={email.value}
          required
          labelText='Email'
          autoCorrect={false}
          errorMessage="email is invalid"
          keyboardType="email-address"
          isValid={email.isValid}
          onBlur={() => validate(email.value, 'email')}
          onChangeText={(val) => validate(val, 'email')}
        />
        <Input
          value={password.value}
          required
          placeholder="******"
          errorMessage="minimum 6 characters"
          labelText='Password'
          secureTextEntry={true}
          isValid={password.isValid}
          onBlur={() => validate(password.value, 'password')}
          onChangeText={(val) => validate(val, 'password')}
        />
        <FormButton
          buttonTitle="Login"
          disabled={isDisabled}
          onPress={handleLogin}
        />
        <Text style={styles.forgot} onPress={() => navigation.navigate('ForgotPass')}>Forgot Password?</Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center',
  },
  top: {
    backgroundColor: '#E35540',
    height: 30,
    width: 100,
  },
  text: {
    fontSize: 30,
    marginVertical: 20,
    color: '#E35540',
  },
  errorText: {
    color: 'red',
    fontSize: Textsizes.Regular,
    marginBottom: 8
  },
  forgot: {
    color: Colors.AmberRed,
    fontSize: Textsizes.xMedium,
    marginTop: 30
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 20,
    color: '#6646ee',
  },
});
