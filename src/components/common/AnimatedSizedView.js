import {memo} from 'react';
import {rhp, rwp} from '../../utils/helpers/responsivePixelHelper';
import Animated, {LinearTransition} from 'react-native-reanimated';

const AnimatedSizedView = ({height, width, style}) => {
  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        {height: height ? rhp(height) : null, width: width ? rwp(width) : null},
        style,
      ]}
    />
  );
};

export default memo(AnimatedSizedView);
