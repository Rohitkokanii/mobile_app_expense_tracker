import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DefaultWrap from '../../../components/wrappers/DefaultWrap';
import layout from '../../../theme/layout';
import {Texts} from '../../../components/common/Texts';

const ProfileScreen = () => {
  return (
    <DefaultWrap MainContainer={layout.center}>
      <Texts.pt20
        children={'Profile Comming Soon...'}
        style={layout.fontWeight.extraBold}
      />
    </DefaultWrap>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
