import {StyleSheet, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {IMAGES} from '../../utils/constant/imageConstant';
import {rhp, rwp} from '../../utils/helpers/responsivePixelHelper';
const currentHeight = getStatusBarHeight();

const HomeDrawer = ({navigation}) => {
  const drawerOptions = [
    {
      title: `AboutUs`,
      image: IMAGES.WELCOME1,
      onPress: () => {
        navigation.navigate('');
      },
    },
  ];

  const drawerOptionsLength = drawerOptions.length;

  return (
    <>
      <View style={{flex: 1}}></View>
    </>
  );
};

export default HomeDrawer;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffffff',
//     // alignItems: 'flex-start',
//     width: rwp(276),
//     borderTopRightRadius: 25,
//     borderBottomRightRadius: 32,
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   backgroundImage: {
//     height: rhp(151),
//     width: '100%',
//     resizeMode: 'cover',
//     position: 'absolute',
//     bottom: 0,
//   },
//   profileContainer: {
//     borderTopRightRadius: 14,
//     backgroundColor: '#D4ECFF',
//     paddingTop: currentHeight,
//     height: rhp(110),
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     paddingRight: rhp(15),
//     elevation: 5,
//     alignItems: 'center',
//     paddingLeft: 15,
//   },
//   BlueView: {
//     backgroundColor: '#005AA1',
//     borderTopLeftRadius: 8,
//     borderBottomLeftRadius: 8,
//     width: rwp(8),
//     minHeight: rhp(47),
//   },
//   BlackCircle: {
//     height: rhp(20),
//     width: rhp(20),
//     borderRadius: rhp(20 / 2),
//     backgroundColor: '#202020',
//   },
//   EditIconView: {
//     position: 'absolute',
//     top: rhp(22), // adjust for vertical alignment
//     right: rwp(5), // half outside drawer
//     height: rhp(30),
//     width: rhp(30),
//     borderRadius: rhp(15),
//     backgroundColor: '#7D8B98',
//     borderWidth: responsiveHeight(0.5),
//     borderColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10, // higher than drawer background
//     elevation: 10, // Android shadow
//   },
//   profileImageContainer: {
//     height: rhp(52),
//     width: rhp(52),
//     borderRadius: rhp(52),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cross: {
//     position: 'absolute',
//     right: rwp(5),
//     top: rwp(5),
//   },
//   option: {
//     flexDirection: 'row',
//     backgroundColor: '#EEEEEE',
//     alignItems: 'center',
//     borderTopLeftRadius: 8,
//     borderBottomLeftRadius: 8,
//     marginBottom: rhp(16),
//     flex: 1,
//     minHeight: rhp(47),
//   },
//   optionImage: {
//     height: rhp(20),
//     width: rhp(20),
//     resizeMode: 'contain',
//   },
//   verticalLine: {
//     width: 1,
//     backgroundColor: '#000000',
//     marginHorizontal: rwp(8),
//     height: '100%',
//   },
//   image: {
//     borderRadius: rhp(52),
//     height: '85%',
//     width: '85%',
//     resizeMode: 'cover',
//   },
// });
