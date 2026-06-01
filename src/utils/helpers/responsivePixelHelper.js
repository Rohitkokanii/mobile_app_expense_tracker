import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {DESIGNXD} from '../constant/appConfigConst';

export function rwp(inputValue = 0) {
  let percentage = (inputValue / DESIGNXD.WIDTH) * 100;
  return responsiveWidth(percentage);
}

export function rhp(inputValue) {
  let percentage = (inputValue / DESIGNXD.HEIGHT) * 100;
  return responsiveHeight(percentage);
}
