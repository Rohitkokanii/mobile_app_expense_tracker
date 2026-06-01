import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { showMessage } from './commonHelper';

export const checkPermissionAndDownloadFile = async FILE_URL => {
  if (Platform.OS === 'ios') {
    downloadFile(FILE_URL);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        await downloadFile(FILE_URL);
        console.log('Storage Permission Granted.');
      } else {
        // If permission denied then show alert
        console.log('Error', 'Storage Permission Not Granted');
        if (Platform.Version >= 33) {
          await downloadFile(FILE_URL);
        }
      }
    } catch (err) {
      // To handle permission related exception
      console.log('++++' + err);
    }
  }
};

const downloadFile = async FILE_URL => {
  // Get today's date to add the time suffix in filename
  let date = new Date();

  // Get file extension
  let file_ext = getFileExtention(FILE_URL);

  file_ext = file_ext ? '.' + file_ext[0] : '';

  // config: To get response by passing the downloading related options
  // fs: Root directory path to download
  const {config, fs} = RNFetchBlob;
  let RootDir = fs.dirs.LegacyDCIMDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      path:
        RootDir +
        '/file_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        file_ext,
      description: 'Downloading file...',
      notification: true,
      useDownloadManager: true,
    },
  };

  // Handle local file URI scenario
  const isLocalFile = FILE_URL.startsWith('file:///');
  if (isLocalFile) {
    const filePath = FILE_URL.replace('file://', ''); // Remove the `file://` prefix
    const destinationPath =
      RootDir +
      '/file_' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      file_ext;

    try {
      await fs.cp(filePath, destinationPath); // Copy local file to the desired location
      showMessage('File Downloaded Successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error copying file: ', error);
    }
  } else {
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        showMessage('File Downloaded Successfully', ToastAndroid.SHORT);
      })
      .catch(error => {
        console.error('Error downloading file: ', error);
      });
  }
};

const getFileExtention = fileUrl => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};
