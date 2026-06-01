import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {showMessage} from '../../utils/helpers/commonHelper';
const currentHeight = getStatusBarHeight();
const NetworkStatusBanner = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setIsConnected(false);
        setShowBanner(true);
        fadeIn();

        const message = 'No Internet Connection';
        showMessage(message);
      } else {
        if (!isConnected) {
          setIsConnected(true);
          fadeOut();
          setTimeout(() => setShowBanner(false), 2000);
          const message = 'Back Online';
          showMessage(message);
        }
      }
    });

    return () => unsubscribe();
  }, [isConnected]);

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  if (!showBanner) return null;

  return (
    <Animated.View
      style={[
        styles.banner,
        {opacity, backgroundColor: isConnected ? '#4CAF50' : '#F44336CC'},
      ]}>
      <Text style={styles.text}>
        {isConnected ? 'Back Online' : 'No Internet Connection'}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 10,
    zIndex: 9999,
    paddingTop: currentHeight + 10,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NetworkStatusBanner;
