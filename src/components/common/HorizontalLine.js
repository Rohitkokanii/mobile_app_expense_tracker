import React from 'react';
import {View} from 'react-native';

const HorizontalLine = ({
  width = '100%',
  height = 1,
  color = '#D3D3D3',
  marginVertical = 10,
  style,
}) => {
  return (
    <View
      style={[
        {
          width: width,
          height: height,
          backgroundColor: color,
          marginVertical: marginVertical,
        },
        style,
      ]}
    />
  );
};

export default HorizontalLine;
