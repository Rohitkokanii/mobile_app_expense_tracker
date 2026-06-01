import {PermissionsAndroid, Platform, Alert} from 'react-native';

/**
 * Requests necessary location permissions for Android devices.
 * @returns {Promise<boolean>} - true if all permissions granted, false otherwise.
 */
export async function requestLocationPermissions() {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    console.log('granted', granted);

    const foregroundGranted =
      granted['android.permission.ACCESS_FINE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED ||
      granted['android.permission.ACCESS_COARSE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED;

    if (!foregroundGranted) {
      Alert.alert(
        'Permission required',
        'Location permission is required to use this app.',
      );
      return false;
    }

    return true;
  } catch (err) {
    console.warn('Permission error:', err);
    return false;
  }
}
