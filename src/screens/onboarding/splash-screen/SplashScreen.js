import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ToastAndroid,
  Linking,
  Platform,
  Pressable,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import {VIDEOS} from '../../../utils/constant/videosConstant';
import {getToken} from '../../../store/local-store/localDB';
import {requestLocationPermissions} from '../../../utils/helpers/LocationPermissionHelper';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useIsFocused} from '@react-navigation/native';
import {IMAGES} from '../../../utils/constant/imageConstant';

const SplashScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const hasNavigated = useRef(false);

  // useEffect(() => {
  //   requestLocationPermissions();
  // }, [isFocused]);

  // Reset navigation hierarchy directly to HomeScreen inside TabGroup/DrawerGroup
  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'DrawerGroup',
          state: {
            routes: [
              {
                name: 'TabGroup',
                state: {
                  routes: [
                    {
                      name: 'HomeScreen',
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    });
  };

  const handleNext = async () => {
    // Prevent navigating multiple times from taps, video end, or timers
    if (hasNavigated.current) return;

    if (navigation.isFocused()) {
      hasNavigated.current = true;

      try {
        const token = await getToken();
        console.log('SplashScreen - Retrieved Token:', token);

        if (token) {
          console.log('Token exists -> Navigating to HomeScreen');
          goToHome();
        } else {
          console.log('No token found -> Navigating to WelcomeScreen');
          navigation.replace('LoginScreen'); // Change to 'LoginScreen' if preferred
        }
      } catch (error) {
        console.error('Error getting token on splash:', error);
        navigation.replace('LoginScreen');
      }
    }
  };

  useEffect(() => {
    // 1-second initial splash delay
    const timeout = setTimeout(() => {
      handleNext();
    }, 2000);

    // Fallback timer in case video loading hangs or takes too long
    const fallback = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Pressable onPress={handleNext} style={styles.container}>
      <Image source={IMAGES.Splash} style={styles.image} resizeMode="cover" />
    </Pressable>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },

  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
