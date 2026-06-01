import React, {FunctionComponent, useMemo} from 'react';
import {Dimensions, Text, StyleSheet, TextStyle, TextProps} from 'react-native';
import {DESIGNXD} from '../../utils/constant/appConfigConst';
import colors from '../../theme/colors';
import {rhp} from '../../utils/helpers/responsivePixelHelper';

const {width, height} = Dimensions.get('window');
const DEVICE_BASE_WIDTH = DESIGNXD.WIDTH; // iPhone 6 width
const FONT_SIZE = 14;
const REAL_WIDTH = height > width ? width : height;

type ScaleText = {
  deviceBaseWidth?: number;
  fontSize?: number;
  lineHeight?: number;
  realWidth?: number;
  color?: any;
};

export const useScaleText = ({
  deviceBaseWidth = DEVICE_BASE_WIDTH,
  fontSize = FONT_SIZE,
  lineHeight = fontSize * 1.4, // Default line height is 120% of the font size.
  color = colors.text,
}: ScaleText) => {
  return useMemo(() => {
    return {
      fontSize: Math.round((fontSize * REAL_WIDTH) / deviceBaseWidth),
      lineHeight: Math.round((lineHeight * REAL_WIDTH) / deviceBaseWidth),
      color,
    };
  }, [deviceBaseWidth, fontSize, lineHeight]);
};

interface Props extends TextProps {
  deviceBaseWidth?: number;
  style?: TextStyle;
}

export const Texts: Record<string, FunctionComponent<Props>> = {};

const createScaledText = (TextfontSize: number) => {
  const ScaledText: FunctionComponent<Props> = ({
    deviceBaseWidth,
    style = {},
    children,
    ...props
  }) => {
    const {fontSize, lineHeight, color} = StyleSheet.flatten(style || {});
    const scaledText = useScaleText({
      deviceBaseWidth,
      fontSize: fontSize || TextfontSize,
      lineHeight,
      color,
    });

    return (
      <Text style={StyleSheet.flatten([style, scaledText])} {...props}>
        {children}
      </Text>
    );
  };

  return ScaledText;
};

for (let i = 5; i <= 45; i += 1) {
  const key = `pt${i}`;
  Texts[key] = createScaledText(i);
}

// export default {Texts};
