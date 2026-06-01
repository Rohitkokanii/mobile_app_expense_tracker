import Geolocation from '@react-native-community/geolocation';
import {Platform, PermissionsAndroid} from 'react-native';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
export const GOOGLE_MAP_KEY = `AIzaSyCFpLxswv0W3PH69FJZruQnv2dxvCz8U-Q`;
/**
 * Request location permission
 */
export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    // iOS permissions are handled via Info.plist
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission Required',
        message: 'This app needs to access your location.',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

/**
 * Enable location if needed (Android only)
 */
const ensureLocationEnabled = async () => {
  if (Platform.OS === 'android') {
    try {
      await promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      });
    } catch (err) {
      console.warn('Location enabling failed:', err);
    }
  }
};

/**
 * Get current location (with retry)
 */
export const getCurrentLocation = async (options = {}, maxRetries = 3) => {
  await ensureLocationEnabled();

  const attemptToGetLocation = retriesLeft => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        async error => {
          if (retriesLeft <= 1) {
            reject(error);
          } else {
            await new Promise(r => setTimeout(r, 1000));
            resolve(attemptToGetLocation(retriesLeft - 1));
          }
        },
        {
          enableHighAccuracy: Platform.OS === 'ios', // better accuracy on iOS
          timeout: 15000,
          maximumAge: 10000,
          ...options,
        },
      );
    });
  };

  return attemptToGetLocation(maxRetries);
};

/**
 * Watch user's position (continuous tracking)
 */
export const watchPosition = (onPosition, onError, options = {}) => {
  const watchId = Geolocation.watchPosition(onPosition, onError, {
    enableHighAccuracy: true,
    distanceFilter: 10,
    interval: Platform.OS === 'android' ? 5000 : undefined, // Android only
    fastestInterval: Platform.OS === 'android' ? 2000 : undefined, // Android only
    ...options,
  });
  return watchId;
};

/**
 * Clear watch
 */
export const clearWatch = watchId => {
  if (watchId !== null && watchId !== undefined) {
    Geolocation.clearWatch(watchId);
  }
};

export const fetchLocationPlaceByID = async place_id => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${GOOGLE_MAP_KEY}`,
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data?.result?.geometry?.location;
  } catch (error) {
    return null;
  }
};

export const getCurrentLocationWithAddress = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    throw new Error('Location permission denied');
  }

  const position = await getCurrentLocation();
  console.log({position});

  const {latitude, longitude} = position.coords;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_KEY}`,
  );

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('Unable to retrieve address');
  }

  const address = data.results[0].formatted_address;
  console.log(
    'getCurrentLocationWithAddress',
    {latitude},
    {longitude},
    {address},
    {data},
  );

  return {
    latitude,
    longitude,
    address,
  };
};

// Haversine formula to calculate distance between 2 lat/lng points
export const getDistanceInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth radius in meters
  const toRad = deg => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const validateMinimumGap = formData => {
  const {pickup, drops} = formData;
  let errors = '';

  if (drops.length === 0) return '';

  // Compare pickup with first drop
  const distFromPickup = getDistanceInMeters(
    pickup.latitude,
    pickup.longitude,
    drops[0].latitude,
    drops[0].longitude,
  );
  if (distFromPickup < 100) {
    errors += `Pickup too close to ${
      drops.length === 1 ? 'drop' : 'drop 1'
    }.\n`;
  }

  // Compare each drop with the next drop
  for (let i = 0; i < drops.length - 1; i++) {
    const from = drops[i];
    const to = drops[i + 1];
    const distance = getDistanceInMeters(
      from.latitude,
      from.longitude,
      to.latitude,
      to.longitude,
    );

    if (distance < 100) {
      errors += `Drop ${i + 1} too close to drop ${i + 2}.\n`;
    }
  }

  return errors.trim(); // remove trailing newline if any
};
export const getLocationLatLong = () => {
  return new Promise(async (resolve, reject) => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        async position => {
          console.log('position', position);

          resolve({
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
          });
        },
        error => {
          console.error('Geolocation error in lat long:', error);
          reject(error);
        },
        {enableHighAccuracy: false, timeout: 20000},
      );
    } else {
      console.warn('Need permission for Location');
      reject('Permission denied for location');
    }
  });
};
export const getAddressFromCoordinates = async (latitude, longitude) => {
  console.warn('Fetching address for coordinates:', {latitude, longitude});

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_KEY}`,
    );
    const data = await response.json();
    if (data.status === 'OK' && data.results.length > 0) {
      const address = data.results[0]?.formatted_address;
      console.warn('Fetching address for address:', address);

      return address || 'No address found';
    } else {
      return 'No address found';
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return 'Error fetching address';
  }
};
