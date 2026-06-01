import {responsiveHeight} from 'react-native-responsive-dimensions';
import {rhp, rwp} from '../utils/helpers/responsivePixelHelper';

const layout = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowBetween2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreen: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  dottedLine: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#202020',
    borderStyle: 'dotted',
  },
  fullWidthHeight: {
    width: '100%',
    height: '100%',
  },
  fullscreenWhite: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fontWeight: {
    thin: {fontWeight: '100'},
    extraLight: {fontWeight: '200'},
    light: {fontWeight: '300'},
    regular: {fontWeight: '400'}, // or 'normal'
    medium: {fontWeight: '500'},
    semiBold: {fontWeight: '600'},
    bold: {fontWeight: '700'}, // or 'bold'
    extraBold: {fontWeight: '800'},
    black: {fontWeight: '900'},
  },
  MobileNumberView_1: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignSelf: 'flex-start',
    height: rhp(40),
  },
  MobileNumberView_2: {
    flexDirection: 'row',
    paddingHorizontal: rwp(6),
    marginRight: rwp(10),
    borderColor: '#707070',
    shadowColor: '#0000006E',
    backgroundColor: '#FFFFFF',
    borderWidth: rwp(0.5),
    borderRadius: 5,
    alignItems: 'center',
    height: rhp(40),
  },
  bottomText: {
    color: '#F9B917',
    fontWeight: '800',
    opacity: 0.3,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
  },
  paddingHorizontalSmall: {
    paddingHorizontal: rhp(10),
  },
  MainStyleLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  WhiteCircle: {
    height: rhp(18),
    width: rhp(18),
    borderRadius: rhp(18 / 2),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: responsiveHeight(0.05),
  },
  greenDot: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    // marginRight: 10, // Space between dot and input
  },
  redDot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginRight: 0, // Space between dot and input
  },
  dashedLine: {
    width: 2,

    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'black',
    zIndex: 1,
    flex: 1,
  },
  AbsoluteView: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  ProceedButton: {
    width: rwp(315),
    borderRadius: 8,
    height: rhp(38),
  },
  loaderstyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
};

export default layout;
