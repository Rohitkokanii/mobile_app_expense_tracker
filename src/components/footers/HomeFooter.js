import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {IMAGES} from '../../utils/constant/imageConstant';
import {rhp, rwp} from '../../utils/helpers/responsivePixelHelper';
import {Texts} from '../common/Texts';

const HomeFooter = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const currentRouteName = getFocusedRouteNameFromRoute(route) || 'HomeScreen';

  const getTheme = () => {
    switch (currentRouteName) {
      case 'HomeScreen':
        return {
          bg: '#050816',
          card: '#031b50dc',
          active: '#8B5CF6',
          inactive: '#94A3B8',
          text: '#FFFFFF',
        };

      case 'HistoryScreen':
        return {
          bg: '#050816',
          card: '#031b50dc',
          active: '#8B5CF6',
          inactive: '#94A3B8',
          text: '#FFFFFF',
        };

      case 'ProfileScreen':
        return {
          bg: '#050816',
          card: '#031b50dc',
          active: '#8B5CF6',
          inactive: '#94A3B8',
          text: '#FFFFFF',
        };

      default:
        return {
          bg: '#050816',
          card: '#111827',
          active: '#8B5CF6',
          inactive: '#94A3B8',
          text: '#FFFFFF',
        };
    }
  };

  const theme = getTheme();

  const options = [
    {
      title: 'Profile',
      image: IMAGES.AccountIcon,
      screenName: 'ProfileScreen',
    },
    {
      title: 'Home',
      image: IMAGES.HomeIcon,
      screenName: 'HomeScreen',
    },
    {
      title: 'History',
      image: IMAGES.HistoryIcon,
      screenName: 'HistoryScreen',
    },
  ];

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.subContainer,
          {
            backgroundColor: theme.card,
          },
        ]}>
        {options.map((item, index) => {
          const isSelected = currentRouteName === item.screenName;

          return (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() =>
                navigation.navigate('TabGroup', {
                  screen: item.screenName,
                })
              }>
              <Image
                source={item.image}
                style={styles.optionImage}
                tintColor={isSelected ? theme.text : theme.inactive}
              />

              <Texts.pt12
                style={{
                  color: isSelected ? theme.text : theme.inactive,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                {item.title}
              </Texts.pt12>

              {isSelected && (
                <View
                  style={[
                    styles.selectedBar,
                    {
                      backgroundColor: theme.active,
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default HomeFooter;

// const styles = StyleSheet.create({
//   container: {
//     // position: 'absolute',
//     height: rhp(Platform.OS === 'ios' ? 65 : 60),
//     paddingBottom: rhp(Platform.OS === 'ios' ? 10 : 0),
//     backgroundColor: 'transparent',
//   },

//   subContainer: {
//     height: rhp(58),
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     // borderTopLeftRadius: 24,
//     // borderTopRightRadius: 24,

//     borderRadius: 24,
//     width: '90%',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 12,

//     elevation: 25,
//     alignSelf: 'center',
//   },

//   option: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',

//     rowGap: rhp(4),

//     overflow: 'hidden',
//   },

//   optionImage: {
//     height: rhp(22),
//     width: rhp(22),
//     resizeMode: 'contain',
//   },

//   selectedBar: {
//     position: 'absolute',

//     width: rwp(78),
//     height: rhp(54),

//     borderRadius: 18,

//     bottom: 2,

//     zIndex: -1,
//   },
// });

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    bottom: Platform.OS === 'ios' ? 25 : 18,

    left: 0,
    right: 0,

    backgroundColor: 'transparent',

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 999,
    elevation: 999,
  },

  subContainer: {
    height: rhp(62),

    width: '90%',

    flexDirection: 'row',

    borderRadius: 28,

    backgroundColor: 'rgba(17,24,39,0.92)',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.35,

    shadowRadius: 18,

    elevation: 18,

    alignItems: 'center',

    overflow: 'hidden',
  },

  option: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    rowGap: rhp(4),
  },

  optionImage: {
    height: rhp(22),
    width: rhp(22),
    resizeMode: 'contain',
  },

  selectedBar: {
    position: 'absolute',

    width: rwp(82),
    height: rhp(52),

    borderRadius: 20,

    backgroundColor: '#8B5CF6',

    bottom: -5,

    zIndex: -1,
  },
});
