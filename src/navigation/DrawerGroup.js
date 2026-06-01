import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import LoginScreen from '../screens/auth/login/LoginScreen';
import {rwp} from '../utils/helpers/responsivePixelHelper';
const Drawer = createDrawerNavigator();

export default function DrawerGroup() {
  return (
    <Drawer.Navigator
      // initialRouteName="TabGroup"
      // drawerContent={props => <HomeDrawer {...props} />}
      screenOptions={{
        drawerType: 'slide',
        headerShown: false,
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        drawerStyle: {
          backgroundColor: '#FFFFFF00',
          width: rwp(276),
          overflow: 'visible',
          // borderTopRightRadius: 10,
          // borderBottomRightRadius: 10,
        },
      }}>
      {/* <Drawer.Screen name="TabGroup" component={TabGroup} /> */}
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
    </Drawer.Navigator>
  );
}
