import axios from 'axios';
import ApiManager from './apiManager';
import polyline from '@mapbox/polyline';
export async function EditProfilePostApi(formData) {
  try {
    const formDataobj = new FormData();
    formDataobj.append('first_name', formData.firstName || '');
    formDataobj.append('last_name', formData.lastName || '');
    formDataobj.append('email', formData.email || '');
    formDataobj.append('contact_no', formData.contactNumber || '');
    formDataobj.append('about_me', JSON.stringify(formData.aboutID) || '');

    if (formData?.profilePhoto?.length) {
      formDataobj.append('profile_photo', {
        uri: formData?.profilePhoto[0]?.uri,
        type: formData?.profilePhoto[0]?.type,
        name: formData?.profilePhoto[0]?.fileName,
      });
    }

    formDataobj.append('Content-Type', 'image/jpeg');

    console.log('====================================');
    console.log('formday: ', formDataobj);
    console.log('====================================');
    const result = await ApiManager.post(
      'common/customer-auth/customer-update',
      formDataobj,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error, error.response);
    return error.response;
  }
}
export async function postImageApi(apiName, data) {
  try {
    const formDataObj = new FormData();
    Object.keys(data).forEach(key => {
      formDataObj.append(key, data[key] || '');
    });

    const result = await ApiManager.post(apiName, formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.info(JSON.stringify({apiName, data, result}));
    return result;
  } catch (error) {
    console.info({apiName, data, error});
    return error?.response;
  }
}

export async function postApi(apiName, data) {
  try {
    const result = await ApiManager.post(apiName, data);
    console.info(JSON.stringify({apiName, data, result}));
    return result;
  } catch (error) {
    console.info({apiName, data, error});
    return error?.response;
  }
}

export async function getRouteDistance2(formFields, apiKey) {
  const origin = `${formFields.pickup.latitude},${formFields.pickup.longitude}`;
  const destination = `${
    formFields.drops[formFields.drops.length - 1].latitude
  },${formFields.drops[formFields.drops.length - 1].longitude}`;

  const waypoints = formFields.drops
    .slice(0, -1)
    .map(drop => `${drop.latitude},${drop.longitude}`)
    .join('|');

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${apiKey}&optimize:false`;

  try {
    const response = await axios.get(url);

    const route = response.data.routes[0];

    if (!route) {
      console.warn('No routes found in response.');
      return null;
    }

    const totalDistance = route.legs.reduce(
      (sum, leg) => sum + leg.distance.value,
      0,
    );
    const totalDuration = route.legs.reduce(
      (sum, leg) => sum + leg.duration.value,
      0,
    );

    const overviewPolyline = route?.overview_polyline?.points;

    if (!overviewPolyline || typeof overviewPolyline !== 'string') {
      console.warn('No valid overview polyline found.');
      return null;
    }

    const points = polyline.decode(overviewPolyline);
    const coords = points.map(([latitude, longitude]) => ({
      latitude,
      longitude,
    }));

    return {
      distanceText: `${(totalDistance / 1000).toFixed(1)} km`,
      distanceValue: totalDistance,
      durationText: `${Math.round(totalDuration / 60)} mins`,
      durationValue: totalDuration,
      distanceInKM: totalDistance / 1000,
      coords: coords,
    };
  } catch (error) {
    console.error(
      'Error fetching route:',
      error.response?.data || error.message,
    );
    return null;
  }
}

export async function getRouteDistance(formFields, apiKey) {
  const origin = `${formFields.PickLocation.latitude},${formFields.PickLocation.longitude}`;

  const destination = `${formFields.DropLocation.latitude},${formFields.DropLocation.longitude}`;

  // Waypoints from AddStops
  const waypoints =
    formFields.AddStops && formFields.AddStops.length > 0
      ? formFields.AddStops.map(
          stop => `${stop.latitude},${stop.longitude}`,
        ).join('|')
      : '';

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}${
    waypoints ? `&waypoints=${waypoints}` : ''
  }&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const route = response?.data?.routes?.[0];

    if (!route) {
      console.warn('No routes found in response.');
      return null;
    }

    const totalDistance = route.legs.reduce(
      (sum, leg) => sum + leg.distance.value,
      0,
    );

    const totalDuration = route.legs.reduce(
      (sum, leg) => sum + leg.duration.value,
      0,
    );

    const overviewPolyline = route?.overview_polyline?.points;

    if (!overviewPolyline) {
      console.warn('No valid overview polyline found.');
      return null;
    }

    const points = polyline.decode(overviewPolyline);
    const coords = points.map(([latitude, longitude]) => ({
      latitude,
      longitude,
    }));

    return {
      distanceText: `${(totalDistance / 1000).toFixed(1)} km`,
      distanceValue: totalDistance,
      durationText: `${Math.round(totalDuration / 60)} mins`,
      durationValue: totalDuration,
      distanceInKM: totalDistance / 1000,
      coords,
    };
  } catch (error) {
    console.error(
      'Error fetching route:',
      error.response?.data || error.message,
    );
    return null;
  }
}
