// navigation/TabGroup.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeFooter from '../components/footers/HomeFooter';
import HomeScreen from '../screens/app/home-screen/HomeScreen';
import HistoryScreen from '../screens/app/history-screen/HistoryScreen';
import ProfileScreen from '../screens/app/profile-screen/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabGroup() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBar={props => <HomeFooter {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="HistoryScreen" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
