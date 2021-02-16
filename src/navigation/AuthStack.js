import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import FirstScreen from '../screens/FirstScreen';
import AuthOptsScreen from '../screens/AuthOptsScreen';
import ForgotPassScreen from '../screens/ForgotPassScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="First">
      <Stack.Screen name="First" component={FirstScreen} />
      <Stack.Screen name="AuthOpts"
        component={AuthOptsScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}/>
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPassScreen}/>
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
