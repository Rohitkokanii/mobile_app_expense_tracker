import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../../../../utils/constant/imageConstant';
import {rhp, rwp} from '../../../../utils/helpers/responsivePixelHelper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const currentHeight = getStatusBarHeight();
const LogoView = () => {
  return (
    <View style={styles.WhiteView}>
      <Image style={styles.image} source={IMAGES.LOGO} />
    </View>
  );
};

export default LogoView;

const styles = StyleSheet.create({
  image: {
    width: rwp(75),
    height: rhp(75),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  WhiteView: {
    width: '100%',
    height: rhp(115),
    backgroundColor: 'white',
    borderBottomRightRadius: rhp(15),
    borderBottomLeftRadius: rhp(15),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: currentHeight,
  },
});
