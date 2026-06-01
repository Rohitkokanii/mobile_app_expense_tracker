import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {rhp, rwp} from '../../../../utils/helpers/responsivePixelHelper';
import {IMAGES} from '../../../../utils/constant/imageConstant';
import {Texts} from '../../../../components/common/Texts';

const GetStartedButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.rocketContainer}>
        <Image source={IMAGES.SHUTTLE} style={styles.rocket} />
      </View>
      <Texts.pt18 children={'Get Started'} style={{color: '#FCD128'}} />
      <Image source={IMAGES.THERE_ARROWS} style={styles.arrow} />
    </TouchableOpacity>
  );
};

export default GetStartedButton;

const styles = StyleSheet.create({
  container: {
    width: rwp(224),
    alignSelf: 'center',
    backgroundColor: 'gray',
    borderRadius: 21,
    padding: rwp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rocketContainer: {
    width: rwp(37),
    height: rwp(37),
    borderRadius: rwp(37),
    backgroundColor: '#FCD128',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rocket: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
  },
  arrow: {
    width: rwp(27),
    height: rhp(19),
    marginRight: rwp(10),
    resizeMode: 'contain',
  },
});
