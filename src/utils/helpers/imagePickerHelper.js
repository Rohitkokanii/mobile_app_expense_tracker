import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, Platform} from 'react-native';
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera to take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED
        ? 'GRANTED'
        : 'NOTGRANTED';
    } catch (err) {
      console.warn(err);
      return 'NOTGRANTED';
    }
  } else {
    // iOS: handled by Info.plist automatically
    return 'GRANTED';
  }
};

export const ImagePicker = async imageLimit => {
  try {
    return new Promise(async (resolve, reject) => {
      let options = {
        selectionLimit: imageLimit,
        mediaType: 'photo',
        storageOptions: {
          path: 'image',
        },
        quality: 0.2,
      };
      launchImageLibrary(options, response => {
        if (response.assets) {
          // console.warn(response.assets);
          resolve(response.assets);
        } else {
          reject(new Error('Failed to select image'));
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

export const VideoPicker = async imageLimit => {
  try {
    return new Promise(async (resolve, reject) => {
      let options = {
        selectionLimit: imageLimit,
        mediaType: 'video',
        storageOptions: {
          path: 'image',
        },
        quality: 0.5,
      };
      launchImageLibrary(options, response => {
        if (response.assets) {
          // console.warn(response.assets);
          resolve(response.assets);
        } else {
          reject(new Error('Failed to select image'));
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

export const CameraImagePicker = async (imageLimit, moreOptions = {}) => {
  try {
    return new Promise(async (resolve, reject) => {
      const permissionRes = await requestCameraPermission();
      if (permissionRes === 'GRANTED') {
        let options = {
          selectionLimit: imageLimit,
          mediaType: 'photo',
          quality: 0.8,
          ...moreOptions,
        };
        launchCamera(options, response => {
          if (response.assets) {
            resolve(response.assets);
          } else {
            reject(new Error('Failed to capture image'));
          }
        });
      } else {
        reject(new Error('Camera permission denied'));
      }
    });
  } catch (error) {
    throw error;
  }
};

export const CameraVideoPicker = async imageLimit => {
  try {
    return new Promise(async (resolve, reject) => {
      const permissionRes = await requestCameraPermission();
      if (permissionRes === 'GRANTED') {
        let options = {
          selectionLimit: imageLimit,
          mediaType: 'video',
          storageOptions: {
            path: 'image',
          },
          quality: 0.2,
        };
        launchCamera(options, response => {
          if (response.assets) {
            // console.warn(response.assets);
            resolve(response.assets);
          } else {
            reject(new Error('Failed to select image'));
          }
        });
      }
    });
  } catch (error) {
    throw error;
  }
};
