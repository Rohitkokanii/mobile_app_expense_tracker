import {StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {rhp, rwp} from '../helpers/responsivePixelHelper';

export const commonStyles = StyleSheet.create({
  meduimBoldText: {
    fontWeight: '700',
  },
  SubMeduimboldGreyText: {
    color: '#202020',
    fontWeight: '500',
    // textAlign: 'center',
  },
  BoldText: {
    fontWeight: '700',
  },
  ExtraBoldText: {
    fontWeight: '800',
  },
  smallGreyBoldText: {
    fontWeight: '500',
    color: '#323232',
  },
  meduimText: {
    fontWeight: '500',
    color: 'black',
  },
  meduimGreyText: {
    fontWeight: '500',
    color: '#707070',
  },
  horizontalRow: {
    flexDirection: 'row',
  },
  meduimBoldYellowText: {
    fontWeight: '600',
    color: '#FCD128',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  NoDataText: {
    color: '#202020',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    alignSelf: 'center',
  },
  MainStyleLoading: {
    backgroundColor: null,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  paddingHorizontalSmall: {
    paddingHorizontal: 10,
  },
  horizontalContainerSB: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  BlueView: {
    backgroundColor: '#005AA1',
    height: rhp(24),
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WhiteCircle: {
    backgroundColor: '#D4ECFF',
    padding: rhp(3),
    borderRadius: 25,
  },
  greenDot: {
    width: 8,
    height: 8,
    backgroundColor: 'green',
    borderRadius: 5,
    // marginRight: 10, // Space between dot and input
  },
  redDot: {
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 5,
    marginRight: 0, // Space between dot and input
  },
  dashedLine: {
    width: 1,
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#202020',
    zIndex: 1,
    flex: 1,
  },
  GreenCircle: {
    height: rhp(28),
    width: rhp(28),
    backgroundColor: '#177102',
    borderRadius: rhp(28 / 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainerSBNoCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems: 'center',
  },
  paddingHorizontalLarge: {
    paddingHorizontal: 20,
  },
  BlueVerticalLine: {
    backgroundColor: '#005AA1',
    width: rwp(1.5),
    height: '100%',
    marginRight: rwp(3),
  },
});
