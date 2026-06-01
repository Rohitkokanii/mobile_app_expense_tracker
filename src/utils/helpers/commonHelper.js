import {Alert, Linking, Platform, ToastAndroid} from 'react-native';

export function formatMinutesAway(seconds) {
  const minutes = Math.round(seconds / 60);
  return `${minutes} mins away`;
}

export const openURL = async url => {
  console.log('Link to Open : ', url);
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.warn(`Don't know how to open URI: ${url}`);
  }
};

export const makePhoneCall = phoneNumber => {
  Linking.openURL(`tel:${phoneNumber}`);
};

export function ValidateIFSC_Code2(
  ifscCode,
  errorMessage = 'Please enter IFSC code',
) {
  console.warn('Validating IFSC Code:', ifscCode);

  const ifscRegex = /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/;

  if (!ifscCode || ifscCode.trim() === '') {
    return errorMessage;
  }

  const trimmedCode = ifscCode.trim();

  if (!ifscRegex.test(trimmedCode)) {
    return 'Invalid IFSC code! It must be 11 characters: 4 letters, 0, and 6 alphanumeric characters.';
  }

  return false; // Valid
}

export function ValidateAnyInputWhiteSpace(input, errorMsg) {
  if (input && input?.trim().length > 0) {
    return false; // Valid input
  } else {
    return errorMsg || 'Please Enter Input!'; // Invalid input
  }
}

export function formatDateinDigit(inputDateStr) {
  if (inputDateStr) {
    const inputDate = new Date(inputDateStr);
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
    const year = inputDate.getFullYear().toString();
    return `${year}-${month}-${day}`;
  } else {
    return null;
  }
}

/**
 * Calculate fare with optional discount
 * @param {number} distance - Distance traveled
 * @param {object} item - Fare configuration object
 * @returns {{ finalFare: number, hasDiscount: boolean, baseFare: number,totalDiscount:number }}
 */
export function calculateFare(distance, item) {
  const baseFare = distance * item?.fare || 0;
  let finalFare = baseFare;
  let hasDiscount = false;

  if (item?.promo) {
    const minimumFare = parseFloat(item?.minimum_fare || 0);
    const discount = parseFloat(item?.discount || 0);

    if (baseFare > minimumFare) {
      if (item?.type === 'Percent') {
        finalFare = parseInt(baseFare - (baseFare * discount) / 100);
        hasDiscount = true;
      } else if (item?.type === 'Flat') {
        finalFare = parseInt(baseFare - discount);
        hasDiscount = true;
      } else if (item?.type === 'FreeKM') {
        const freeKmDiscount = discount * parseFloat(item?.fare || 0);
        finalFare = parseInt(baseFare - freeKmDiscount);
        finalFare = finalFare >= 0 ? finalFare : 0;
        hasDiscount = true;
      }
    }
  }

  return {
    baseFare,
    finalFare: finalFare,
    hasDiscount,
    totalDiscount: baseFare - finalFare,
  };
}

export const showMessage = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  } else {
    Alert.alert('Message', msg);
  }
};
export function formatDateWithMonthAndTime(dateString) {
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const date = new Date(dateString);

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight

  const formattedDate = `${day}.${month}.${year}  |  ${hours}:${
    minutes < 10 ? '0' + minutes : minutes
  } ${period}`;

  return formattedDate;
}
export function formatTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${period}`;
}
export function formatDateWithMonth(inputDate) {
  if (inputDate) {
    const originalDate = new Date(inputDate);

    // Format the date as "DD MMM YYYY" using the en-GB locale
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    const formattedDate = originalDate.toLocaleDateString('en-GB', options);

    // Convert the month to uppercase
    const formattedWithUppercaseMonth = formattedDate.replace(
      /\b[a-zA-Z]{3}\b/,
      month => month.toUpperCase(),
    );

    return formattedWithUppercaseMonth;
  } else {
    return null;
  }
}
export function calculateTripFareDetails(
  distanceInMeters,
  timeInSeconds,
  farePerKm,
) {
  const distanceInKm = distanceInMeters / 1000;
  const roundedDistnaceinKm = Math.round(distanceInKm);
  const timeInMinutes = timeInSeconds / 60;
  let timeFormatted;
  if (timeInMinutes < 60) {
    timeFormatted = timeInMinutes.toFixed(1);
  } else {
    const timeInHours = timeInMinutes / 60;
    timeFormatted = timeInHours.toFixed(1);
  }
  // Determine time unit
  const timeUnit =
    timeInMinutes < 60
      ? timeInMinutes === 1
        ? 'min'
        : 'mins'
      : timeInMinutes / 60 === 1
      ? 'hour'
      : 'hours';

  // Calculate total fare
  const totalFare = roundedDistnaceinKm * farePerKm;
  const roundedTotalFare = Math.round(totalFare);

  return {
    distanceInKm: roundedDistnaceinKm.toFixed(0),
    timeRequired: timeFormatted,
    timeUnit: timeUnit,
    totalFare: roundedTotalFare,
    timeRequiredMin: timeInMinutes,
    timeRequiredSec: timeInSeconds,
  };
}
export async function getDistanceBetweenPoints(
  StartLat,
  StartLong,
  EndLat,
  EndLong,
  waypoints = [],
) {
  console.warn({StartLat, StartLong, EndLat, EndLong, waypoints});
  // Format waypoints into a string suitable for the API request
  const waypointString = waypoints
    .map(point => `${point.lat},${point.long}`)
    .join('|');
  try {
    // const response = await axios.get(
    //   `https://maps.googleapis.com/maps/api/directions/json?origin=${StartLat},${StartLong}&waypoints=optimize:true|&destination=${EndLat},${EndLong}&key=${GOOGLE_MAPS_API_KEY}&mode=driving&language=en&region=undefined%22`,
    // );
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${StartLat},${StartLong}&waypoints=optimize:true|${waypointString}&destination=${EndLat},${EndLong}&key=${GOOGLE_MAPS_API_KEY}&mode=driving&language=en&region=undefined`,
    );
    // console.log(typeof response);

    // res?.data?.routes[0]?.legs[0]
    const route = response.data.routes[0];
    // console.log('************0', route);
    if (route && route.legs.length > 0) {
      // Calculate total distance and duration across all legs
      let totalDistance = 0;
      let totalDuration = 0;

      route.legs.forEach(leg => {
        totalDistance += leg.distance.value; // Sum up distances (in meters)
        totalDuration += leg.duration.value; // Sum up durations (in seconds)
      });

      return {
        distanceInMeters: totalDistance,
        timeInSeconds: totalDuration,
      };
    } else {
      throw new Error('No route found.');
    }
  } catch (error) {
    console.warn('Eerror while gettig distance', error);
    return error?.response;
  }
}
export async function calculateTripFareFromLatLong(
  pickupLatLng,
  farePerKm,
  allStops,
) {
  // console.log('pickuplatlngPoonam', pickupLatLng, {allStops});
  try {
    console.log(JSON.stringify({pickupLatLng, farePerKm, allStops}));
    // Extract dropLatLng from the last index of stops
    const dropLatLong = allStops[allStops.length - 1];
    // Check if pickup and drop locations are the same

    // Extract waypoints from the stops array (0 to second last index)
    const waypoints = allStops.slice(0, -1).map(stop => ({
      lat: stop.latitude,
      long: stop.longitude,
    }));

    console.log(JSON.stringify({pickupLatLng, dropLatLong, waypoints}));

    const {distanceInMeters, timeInSeconds} = await getDistanceBetweenPoints(
      pickupLatLng.latitude || pickupLatLng.Latitude,
      pickupLatLng.longitude || pickupLatLng.Longitude,
      dropLatLong.latitude,
      dropLatLong.longitude,
      waypoints,
    );
    // console.log(
    //   'distanceInMeters, timeInSeconds',
    //   distanceInMeters,
    //   timeInSeconds,
    // );

    // Step 3: Calculate fare details
    const fareDetails = calculateTripFareDetails(
      distanceInMeters,
      timeInSeconds,
      farePerKm,
    );

    return {
      ...fareDetails,
      pickupLatLng,
      dropLatLong,
      distanceInMeters,
    };
  } catch (error) {
    console.error('Error calculating trip fare:', error);
    throw error;
  }
}
export function calculateTotalFare(distanceInMeters, farePerKm) {
  const distanceInKm = distanceInMeters / 1000; // meters → km

  const totalFare = distanceInKm * farePerKm;
  console.log('totalFare', {totalFare}, {distanceInKm}, {farePerKm});

  return {
    totalFare: Math.round(totalFare), // rounded fare
    distanceInKm: parseFloat(distanceInKm.toFixed(0)), // rounded to 2 decimal km
  };
}
export function toISTDate(isoString) {
  const date = new Date(isoString);
  const ISTOffset = 5.5 * 60; // +5:30 hours in minutes
  return new Date(date.getTime() + ISTOffset * 60000);
}

export function extractISTTimeParts(isoString) {
  if (!isoString) return {time: '', ampm: ''};
  const date = toISTDate(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hour12 = ((hours + 11) % 12) + 1;
  return {
    time: ` ${hour12}:${String(minutes).padStart(2, '0')}`,
    ampm,
  };
}

/**
 * Convert 24-hour time to 12-hour time
 * @param {string} time24 - Time in 24-hour format (e.g., "14:30", "09:05", "00:00")
 * @returns {string} Time in 12-hour format (e.g., "2:30 PM", "9:05 AM", "12:00 AM")
 */
export const convert24to12 = time24 => {
  if (!time24) return '';

  // Split hours and minutes
  const [hourStr, minuteStr] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr || '00';

  let period = 'AM';

  if (hour === 0) {
    hour = 12; // 00:00 → 12:00 AM
    period = 'AM';
  } else if (hour === 12) {
    period = 'PM'; // 12:00 → 12:00 PM
  } else if (hour > 12) {
    hour = hour - 12;
    period = 'PM';
  }

  // Add leading zero to minutes if needed (already handled by input usually)
  const formattedMinute = minute.padStart(2, '0');

  return `${hour}:${formattedMinute} ${period}`;
};
