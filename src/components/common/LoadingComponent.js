import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {LOTTIE} from '../../utils/constant/lottieConstant';

const LoadingComponent = ({Loader}) => {
  return Loader ? (
    <View style={styles.MainStyle}>
      {/* <ActivityIndicator size="large" color={'#009B00'} /> */}
      <LottieView
        source={LOTTIE.CarLoader}
        autoPlay={true}
        loop={true}
        style={{height: 200, width: 200}}
      />
    </View>
  ) : null;
};

export default LoadingComponent;

const styles = StyleSheet.create({
  MainStyle: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
