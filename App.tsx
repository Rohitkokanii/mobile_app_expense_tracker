import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';

if (Platform.OS === 'ios') {
  AvoidSoftInput.setShouldMimicIOSBehavior(true);
}

const App = () => {
  StatusBar.setBarStyle('dark-content');
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setTranslucent(true);
  }
  // useNotifications();
  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
};

export default App;
