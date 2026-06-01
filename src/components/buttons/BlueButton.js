import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Texts} from '../common/Texts';
import {rhp, rwp} from '../../utils/helpers/responsivePixelHelper';
const BlueButton = ({ButtonName, ButtonStyle, TextStyle, onPress, icon}) => {
  return (
    <Pressable onPress={onPress} style={[styles.Button_1, ButtonStyle]}>
      {icon}
      {ButtonName ? (
        <Text style={[{color: '#FFF', fontWeight: '500'}, TextStyle]}>
          {ButtonName}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default BlueButton;

const styles = StyleSheet.create({
  Button_1: {
    height: rhp(38),
    width: rwp(150),
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#005AA1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005AA1',
    alignSelf: 'center',
  },
});
