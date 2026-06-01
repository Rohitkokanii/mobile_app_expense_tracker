import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const currentHeight = getStatusBarHeight();
const DefaultWrap = ({children, MainContainer}) => {
  return <View style={[styles.View_1, MainContainer]}>{children}</View>;
};

export default DefaultWrap;

const styles = StyleSheet.create({
  View_1: {
    flex: 1,
    backgroundColor: 'transparent',
    // paddingTop: currentHeight, commented as in acc verification screen it was taking alot space
  },
});
