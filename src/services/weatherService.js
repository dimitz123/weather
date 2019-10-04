import {
  weatherRequest,
  weatherSuccess,
  weatherError,
} from '../slices/WidgetEditorSlice';

import {
  degToCompass,
  mpsToKmph,
  kelvinToCel,
  kelvinToFar,
} from '../utils/unitConversions';

const APPID = '0f35c3e68c5743fbf2eb05e506ed4398';

const processWind = ({ deg, speed }) => ({
  windDirection: degToCompass(deg),
  windSpeed: mpsToKmph(speed),
});

const getIconLocation = ({ icon }) => (
  `http://openweathermap.org/img/wn/${icon}@2x.png`
);

const processTemp = ({ temp }) => ({
  celTemp: kelvinToCel(temp),
  farTemp: kelvinToFar(temp),
});

export const processResult = (result) => {
  const location = result.name;
  const { windDirection, windSpeed } = processWind(result.wind);
  const iconLocation = getIconLocation(result.weather[0]);
  const { celTemp, farTemp } = processTemp(result.main);

  return {
    location,
    windDirection,
    windSpeed,
    iconLocation,
    celTemp,
    farTemp,
  };
};

const requestWeather = (location) => (dispatch) => {
  dispatch(weatherRequest());

  const { latitude, longitude } = location;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APPID}`;

  const weatherCallSuccess = (result) => {
    dispatch(weatherSuccess(processResult(result)));
  };

  const weatherCallError = (error) => {
    console.log(`Weather API error occurred. ${error}`);
    dispatch(weatherError());
  };

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(weatherCallSuccess)
    .catch(weatherCallError);
};

export default requestWeather;
