/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';

export const FormState = {
  GETTING_LOCATION: 'GETTING_LOCATION',
  GETTING_WEATHER: 'GETTING_WEATHER',
  WEATHER_ERROR: 'WEATHER_ERROR',
  READY: 'READY',
};

const widgetEditorSlice = createSlice({
  slice: 'widgetEditor',
  initialState: {
    formState: FormState.GETTING_LOCATION,
    currentLocation: {},
    weatherData: {},
    formValues: {
      title: 'Title of widget',
      temp: 'cel',
      wind: true,
    },
  },
  reducers: {
    locationRequest(state) {
      state.formState = FormState.GETTING_LOCATION;
    },
    locationSuccess(state, action) {
      state.currentLocation = action.payload;
      state.formState = FormState.GETTING_WEATHER;
    },
    locationError(state, action) {
      state.currentLocation = action.payload;
      state.formState = FormState.GETTING_WEATHER;
    },

    weatherRequest(state) {
      state.formState = FormState.GETTING_WEATHER;
    },
    weatherSuccess(state, action) {
      state.weatherData = action.payload;
      state.formState = FormState.READY;
    },
    weatherError(state) {
      state.formState = FormState.WEATHER_ERROR;
    },

    formUpdate(state, action) {
      const { key, value } = action.payload;
      state.formValues[key] = value;
    },
  },
});

const { actions, reducer } = widgetEditorSlice;

export const {
  locationRequest,
  locationSuccess,
  locationError,
  weatherRequest,
  weatherSuccess,
  weatherError,
  formUpdate,
} = actions;

export default reducer;
