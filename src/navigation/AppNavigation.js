// AppNavigation.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import navigationService from '../utils/services/navigationService';
import InitialStackGroup from './InitialStackGroup';
import MyContextProvider from '../store/context-store/myContextProvider';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NetworkStatusBanner from '../components/models/NetworkStatusBanner';

import FlashMessage from 'react-native-flash-message';
import {navigationRef, pendingNavigation} from './RootNavigation';
const AppNavigation = () => {
  const insets = useSafeAreaInsets();
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        backgroundColor: '#FFFFFF',
      }}>
      <MyContextProvider>
        <AlertNotificationRoot>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              console.log('Navigation Ready');

              // HANDLE PENDING NAVIGATION
              if (pendingNavigation.screen) {
                navigationRef.navigate(
                  pendingNavigation.screen,
                  pendingNavigation.params,
                );

                // CLEAR DATA
                pendingNavigation.screen = null;
                pendingNavigation.params = null;
              }
            }}>
            <InitialStackGroup />
          </NavigationContainer>
          <FlashMessage position="center" />
          <NetworkStatusBanner />
        </AlertNotificationRoot>
      </MyContextProvider>
    </GestureHandlerRootView>
  );
};

export default AppNavigation;
