import {useEffect} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidStyle, EventType} from '@notifee/react-native';
import {navigate, navigationRef} from '../../navigation/RootNavigation';
const getNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED
        ? 'GRANTED'
        : 'NOTGRANTED';
    } else {
      // iOS
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        await messaging().registerDeviceForRemoteMessages();
      }

      return enabled ? 'GRANTED' : 'NOTGRANTED';
    }
  } catch (err) {
    console.warn(err);
    return 'NOTGRANTED';
  }
};

export const getNotificationDeviceKey = async () => {
  await messaging().registerDeviceForRemoteMessages();

  // 👇 wait until APNs token is available
  if (Platform.OS === 'ios') {
    const apnsToken = await messaging().getAPNSToken();
    if (!apnsToken) {
      console.warn('APNs token not yet available');
      return null;
    }
    console.log('APNs Token:', apnsToken);
  }

  // 👇 only call getToken after APNs exists
  const deviceKey = await messaging().getToken();
  console.log('FCM Token:', deviceKey);
  return deviceKey;
};

const useNotifications = () => {
  useEffect(() => {
    getNotificationPermission();
    // getNotificationDeviceKey();
  }, []);

  // Foreground FCM handler
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.info(
        'Message handled in the Foreground!',
        JSON.stringify(remoteMessage),
      );
      DisplayNotifications(
        remoteMessage?.notification?.title,
        remoteMessage?.notification?.body,
        {...remoteMessage?.data},
        remoteMessage?.notification?.android?.imageUrl ||
          remoteMessage?.notification?.ios?.imageUrl,
      );
    });
    return unsubscribe;
  }, []);

  const DisplayNotifications = async (title, body, data, image) => {
    await notifee.requestPermission();

    const channelId =
      Platform.OS === 'android'
        ? await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
          })
        : undefined;

    await notifee.displayNotification({
      title,
      body,
      data,
      android:
        Platform.OS === 'android'
          ? {
              channelId,
              style: image
                ? {type: AndroidStyle.BIGPICTURE, picture: image}
                : undefined,
              color: '#000000',
              smallIcon: 'ic_stat_name',
              pressAction: {id: 'default'},
            }
          : undefined,
      ios:
        Platform.OS === 'ios'
          ? {
              foregroundPresentationOptions: {
                badge: true,
                sound: true,
                banner: true,
                list: true,
              },
            }
          : undefined,
    });
  };
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(async ({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log('Foreground Notification Click');

        handleNotificationNavigation(detail?.notification?.data);
      }
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Background Notification Click');

      handleNotificationNavigation(remoteMessage?.data);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    checkInitialNotification();
  }, []);

  const checkInitialNotification = async () => {
    try {
      const remoteMessage = await messaging().getInitialNotification();

      if (remoteMessage) {
        console.log('Quit State Notification Click');

        handleNotificationNavigation(remoteMessage?.data);
      }
    } catch (error) {
      console.log('Initial Notification Error => ', error);
    }
  };
  const handleNotificationNavigation = data => {
    try {
      console.log('Notification Data => ', data);

      if (!data) {
        return;
      }

      // CHAT SCREEN
      if (data?.type === 'chat') {
        navigate('ChatWithDriverScreen', {
          bookingId: data?.id,
          receiverId: data?.reciever_id,
          senderId: data?.sender_id,
        });
      }

      // BOOKING SCREEN
      if (data?.type === 'booking') {
        navigate('BookingDetailsScreen', {
          bookingId: data?.booking_id,
        });
      }
    } catch (error) {
      console.log('Navigation Error => ', error);
    }
  };
  return null;
};

export default useNotifications;
