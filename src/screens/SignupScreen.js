import React, {useState, useContext} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import FormButton from 'sm/components/FormButton';
import Input from 'sm/components/FormInput';
import TopNavbar from '../components/TopNavbar';
import {AuthContext} from '../navigation/AuthProvider';
import LoginLogo from '../components/LoginLogo';
import {validateEmail, validateText, validatePassword} from 'sm/utils/Helpers';
import InputCal from '../components/InputCalendar';
import Textsizes from 'sm/utils/Textsizes';
import Colors from 'sm/utils/Colors';
import {v_scale, scale} from 'sm/utils/StylesConst';
import moment from 'moment';

export default function SignupScreen({
  navigation,
  route: {
    params: {userType},
  },
}) {
  const {register} = useContext(AuthContext);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isVisible, setisVisible] = useState(Platform.OS === 'ios');
  const [form, setForm] = useState({
    first_name: {
      value: '',
      isValid: null,
    },
    last_name: {
      value: '',
      isValid: null,
    },
    user_name: {
      value: '',
      isValid: null,
      error: '',
    },
    birth_day: {
      value: '',
      isValid: null,
      error: '',
    },
    zip_code: {
      value: '',
      isValid: null,
      error: '',
    },
    email: {
      value: '',
      isValid: null,
      error: '',
    },
    password: {
      value: '',
      isValid: null,
      error: 'Your password must be 6 characters',
    },
  });

  const {
    first_name,
    last_name,
    user_name,
    birth_day,
    zip_code,
    email,
    password,
  } = form;

  const typeGroup = (type) => {
    switch (type) {
      case 'Athlete':
        return 'coaches';
      case 'Coach':
        return 'athletes';
      default:
        return 'athletes';
    }
  };

  const handleRegister = () => {
    const {email, password} = form;

    checkFullValidate()
      .then(() => {
        setIsDisabled(true);
        let maskedPass = password.value
          .split('')
          .map(() => '*')
          .join('');
        let date = moment().format();
        register(email.value, password.value, {
          first_name: first_name.value,
          last_name: last_name.value,
          birth_day: birth_day.value,
          email: email.value,
          password: maskedPass,
          date_created: date,
          last_updated: date,
          last_login: date,
          zipcode: zip_code.value,
          user_type: userType,
          [typeGroup(userType)]: [],
        });
      })
      .catch((e) => {});
  };

  const validate = (val, name) => {
    switch (name) {
      case 'password':
        setForm({
          ...form,
          [name]: {
            ...form[name],
            value: val,
            isValid: validatePassword(val),
          },
        });
        break;
      case 'birth_day':
        setForm({
          ...form,
          [name]: {
            ...form[name],
            value: val,
            isValid: true,
          },
        });
        break;
      case 'zip_code':
        setForm({
          ...form,
          [name]: {
            ...form[name],
            value: val,
            isValid: val.length >= 4,
          },
        });
        break;
      default:
        setForm({
          ...form,
          [name]: {
            ...form[name],
            value: val,
            isValid:
              name === 'email' ? validateEmail(val) : validateText(val, 2),
          },
        });
        break;
    }
  };

  const checkFullValidate = async () => {
    const {
      first_name,
      last_name,
      user_name,
      birth_day,
      zip_code,
      email,
      password,
    } = form;

    let promise = new Promise((resolve, reject) => {
      setForm({
        ...form,
        first_name: {
          ...first_name,
          isValid: first_name.isValid === true,
        },
        last_name: {
          ...last_name,
          isValid: last_name.isValid === true,
        },
        email: {
          ...email,
          isValid: email.isValid === true,
        },
        birth_day: {
          ...birth_day,
          isValid: birth_day.isValid === true,
        },
        zip_code: {
          ...zip_code,
          isValid: zip_code.isValid === true,
        },
        user_name: {
          ...user_name,
          isValid: user_name.isValid === true,
        },
        password: {
          ...password,
          isValid: password.isValid === true,
        },
      });
      setTimeout(() => {
        const {
          first_name,
          last_name,
          email,
          password,
          birth_day,
          zip_code,
          user_name,
        } = form;

        first_name.isValid &&
        last_name.isValid &&
        email.isValid &&
        password.isValid &&
        user_name.isValid &&
        birth_day.isValid &&
        zip_code.isValid
          ? resolve(true)
          : reject(false);
      }, 0);
    });
    return promise;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopNavbar navigation={navigation} back={true} />
      <LoginLogo />

      <Text style={styles.text}>Enter your information:</Text>
      <KeyboardAwareScrollView>
      <Input
        placeholder="AA"
        value={first_name.value}
        required
        labelText="First name"
        isValid={first_name.isValid}
        errorMessage="minimum 2 characters"
        onBlur={() => validate(first_name.value, 'first_name')}
        onChangeText={(val) => validate(val, 'first_name')}
      />
      <Input
        placeholder="BB"
        value={last_name.value}
        required
        labelText="Last name"
        errorMessage="minimum 2 characters"
        isValid={last_name.isValid}
        onBlur={() => validate(last_name.value, 'last_name')}
        onChangeText={(val) => validate(val, 'last_name')}
      />
      <Input
        placeholder="AB"
        value={user_name.value}
        required
        labelText="Username"
        errorMessage="minimum 2 characters"
        isValid={user_name.isValid}
        onBlur={() => validate(user_name.value, 'user_name')}
        onChangeText={(val) => validate(val, 'user_name')}
      />
      <Input
        hideInput={() => setisVisible(true)}
        place_holder="04/21/1987"
        value={birth_day.value}
        compDate={
          isVisible ? 
            <InputCal
              onSelect={(val) => validate(val, 'birth_day')}
              setisVisible={setisVisible}
              value={birth_day.value}
              style={{flex: 1, backgroundColor: '#fff'}}
            /> : ((Platform.OS === 'ios') && <Text style={{color:Colors.AmberRed}}>{birth_day.value}</Text>)
        }
        required
        labelText="Birthday"
        isValid={birth_day.isValid}
      />

      <Input
        placeholder="111111"
        value={zip_code.value}
        required
        labelText="Zipcode"
        keyboardType="numeric"
        errorMessage="minimum 4 characters"
        isValid={zip_code.isValid}
        onBlur={() => validate(zip_code.value, 'zip_code')}
        onChangeText={(val) => validate(val, 'zip_code')}
      />
      <Input
        placeholder="ab@gmail.com"
        value={email.value}
        required
        labelText="Email"
        autoCorrect={false}
        errorMessage="email is invalid"
        keyboardType="email-address"
        isValid={email.isValid}
        onBlur={() => validate(email.value, 'email')}
        onChangeText={(val) => validate(val, 'email')}
      />
      <Input
        placeholder="******"
        value={password.value}
        required
        errorMessage="minimum 6 characters"
        labelText="Password"
        secureTextEntry={true}
        isValid={password.isValid}
        onBlur={() => validate(password.value, 'password')}
        onChangeText={(val) => validate(val, 'password')}
      />
      </KeyboardAwareScrollView>
      <FormButton
        buttonTitle="Sign up"
        disabled={isDisabled}
        onPress={handleRegister}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    // flex: 1,
    minHeight: v_scale(500),
    alignItems: 'center',
    paddingBottom: 100,
  },
  text: {
    fontSize: Textsizes.Large,
    marginBottom: 40,
    color: '#E35540',
  },
});
