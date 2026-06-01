import React from 'react';
import {View} from 'react-native';

const DottedLine = () => {
  const dotCount = 30; // Adjust based on how tall the line is
  const dotHeight = 4;
  const dotSpacing = 4;

  return (
    <View style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
      {Array.from({length: dotCount}).map((_, index) => (
        <View
          key={index}
          style={{
            width: 1,
            height: dotHeight,
            backgroundColor: '#202020',
            marginBottom: dotSpacing,
          }}
        />
      ))}
    </View>
  );
};

export default DottedLine;
