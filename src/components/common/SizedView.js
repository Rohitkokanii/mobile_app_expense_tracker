import {memo} from 'react';
import {View} from 'react-native';
import {rhp, rwp} from '../../utils/helpers/responsivePixelHelper';

const SizedView = ({height, width, style}) => {
  return (
    <View
      style={[
        {height: height ? rhp(height) : null, width: width ? rwp(width) : null},
        style,
      ]}
    />
  );
};

export default memo(SizedView);
