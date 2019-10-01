export const degToCompass = (degrees) => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N',
  ];

  const dirIndex = ((degrees % 360) / 22.5).toFixed(0);
  return directions[dirIndex];
};

export const mpsToKmph = (mps) => (
  ((mps * 60 * 60) / 1000).toFixed(0)
);

export const kelvinToCel = (kelvin) => (
  (kelvin - 273.15).toFixed(0)
);

export const kelvinToFar = (kelvin) => (
  ((kelvin - 273.15) * 1.8 + 32).toFixed(0)
);
