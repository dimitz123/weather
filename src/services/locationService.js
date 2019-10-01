import {
  locationRequest,
  locationSuccess,
  locationError,
} from '../slices/WidgetEditorSlice';

const defaultLocation = {
  latitude: 150,
  longitude: -33,
};

const requestLocation = () => (dispatch) => {
  dispatch(locationRequest());

  const geoSuccess = (position) => {
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    dispatch(locationSuccess(location));
  };

  const geoError = (error) => {
    console.log(`Geolocation error occurred. Error code: ${error.code}`);
    dispatch(locationError(defaultLocation));
  };

  if (!navigator.geolocation) {
    geoError({ code: '2' });
    return;
  }

  const geoOptions = {
    timeout: 10 * 1000,
  };
  try {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  } catch (error) {
    geoError(error);
  }
};

export default requestLocation;
