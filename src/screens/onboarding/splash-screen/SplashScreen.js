import React, {useEffect} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ToastAndroid,
  Linking,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import {checkVersion} from 'react-native-check-version';
import {VIDEOS} from '../../../utils/constant/videosConstant';
import {getToken} from '../../../store/local-store/localDB';
import {requestLocationPermissions} from '../../../utils/helpers/LocationPermissionHelper';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useIsFocused} from '@react-navigation/native';
import {useMyContext} from '../../../store/context-store/myContextProvider';
const SplashScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    requestLocationPermissions();
  }, [isFocused]);
  // const {updateProfileData} = useMyContext();
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
    if (navigation.isFocused()) {
      const token = await getToken();
      console.warn('token: ', token);

      // const profileData = await updateProfileData();
      if (token) {
        goToHome();
        console.log('got token');
      } else {
        navigation.replace('WelcomeScreen');
        // navigation.replace('SelectLanguageScreen');
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (navigation.isFocused()) {
        if (true) {
          handleNext();
        }
      }
    }, 1000); // check update after 1s

    const fallback = setTimeout(() => {
      handleNext();
    }, 11000); // fallback after 11 seconds in case video hangs

    return () => {
      clearTimeout(timeout);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleNext}>
      <Video
        muted
        source={VIDEOS.SPLASH}
        style={styles.video}
        resizeMode="cover"
        onError={e => console.error('Video error:', e)}
        onEnd={handleNext}
      />
    </TouchableWithoutFeedback>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  video: {
    height: responsiveHeight(101),
    backgroundColor: 'white',
  },
});
