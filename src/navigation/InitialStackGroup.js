// navigation/InitialStackGroup.js
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/auth/login/LoginScreen';
import SplashScreen from '../screens/onboarding/splash-screen/SplashScreen';
import WelcomeScreen from '../screens/onboarding/welcome-screen/WelcomeScreen';
import DrawerGroup from './DrawerGroup';
import TabGroup from './TabGroup';
import SignupScreen from '../screens/auth/signup/SignupScreen';

// const AccountVerificationScreen = React.lazy(() =>
//   import('../screens/app/profile-screen/AccountVerificationScreen'),
// );

const Stack = createStackNavigator();

export default function InitialStackGroup() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      {/* // * ONBOARDING  RELATED*/}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      <Stack.Screen name="DrawerGroup" component={DrawerGroup} />
      <Stack.Screen name="TabGroup" component={TabGroup} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
}
