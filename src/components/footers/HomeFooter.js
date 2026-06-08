import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {IMAGES} from '../../utils/constant/imageConstant';
import {rhp} from '../../utils/helpers/responsivePixelHelper';

const HomeFooter = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {width: windowWidth} = useWindowDimensions();

  const currentRouteName = getFocusedRouteNameFromRoute(route) || 'HomeScreen';

  const options = [
    {title: 'Profile', image: IMAGES.AccountIcon, screenName: 'ProfileScreen'},
    {title: 'Home', image: IMAGES.HomeIcon, screenName: 'HomeScreen'},
    {title: 'History', image: IMAGES.HistoryIcon, screenName: 'HistoryScreen'},
  ];

  const selectedIndex = options.findIndex(
    item => item.screenName === currentRouteName,
  );

  const animX = useRef(
    new Animated.Value(selectedIndex !== -1 ? selectedIndex : 1),
  ).current;

  useEffect(() => {
    if (selectedIndex !== -1) {
      Animated.spring(animX, {
        toValue: selectedIndex,
        useNativeDriver: true, // Switched to true for ultra-smooth 60fps performance
        damping: 12, // Controls how fast the elastic stretch stabilizes
        mass: 0.9, // Lighter mass gives it a quick, bouncy, bubble feel
        stiffness: 110, // Adds extra elasticity to the spring physics
      }).start();
    }
  }, [selectedIndex]);

  // Calculate pixel layout boundaries for absolute transformations
  const containerWidth = windowWidth * 0.8;
  const tabWidth = containerWidth / 3;

  // 1. Movement logic (moves the bubble horizontally)
  const translateX = animX.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, tabWidth, tabWidth * 2],
  });

  // 2. Bubble Stretch effect logic (stretches width when between tabs, squashes when landing)
  const scaleX = animX.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2],
    outputRange: [1, 1.35, 1, 1.35, 1], // Expands to 135% width when perfectly mid-transit
  });

  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, {width: containerWidth}]}>
        {/* Animated Background Bubble Selector */}
        <Animated.View
          style={[
            styles.selectedBar,
            {
              width: tabWidth,
              transform: [{translateX: translateX}, {scaleX: scaleX}],
            },
          ]}
        />

        {options.map((item, index) => {
          const isSelected = currentRouteName === item.screenName;

          return (
            <Pressable
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
                tintColor={isSelected ? '#FFFFFF' : '#94A3B8'}
              />

              <Text
                style={{
                  color: isSelected ? '#FFFFFF' : '#94A3B8',
                  fontWeight: '700',
                  textAlign: 'center',
                  fontSize: responsiveFontSize(1.5),
                }}>
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default HomeFooter;

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
    flexDirection: 'row',
    borderRadius: 28,
    backgroundColor: 'rgba(17,24,39,0.92)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 18,
    alignItems: 'center',
    position: 'relative',
  },
  option: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: rhp(4),
    zIndex: 2,
  },
  optionImage: {
    height: rhp(22),
    width: rhp(22),
    resizeMode: 'contain',
  },
  selectedBar: {
    position: 'absolute',
    left: 0,
    height: rhp(52),
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    zIndex: 1,
    top: (rhp(62) - rhp(52)) / 2,
  },
});
