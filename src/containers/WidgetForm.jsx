import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  formUpdate,
  FormState,
} from '../slices/WidgetEditorSlice';

import requestLocation from '../services/locationService';
import requestWeather from '../services/weatherService';

import Error from '../components/shared/Error';
import Loader from '../components/shared/Loader';
import RadioField from '../components/shared/forms/RadioField';
import TextField from '../components/shared/forms/TextField';
import Widget from '../components/weatherWidget/Widget';

const tempOptions = [
  {
    name: '°C',
    value: 'cel',
  },
  {
    name: '°F',
    value: 'far',
  },
];

const windOptions = [
  {
    name: 'On',
    value: true,
  },
  {
    name: 'Off',
    value: false,
  },
];

export const WidgetForm = (props) => {
  const {
    formState,
    formValues,
    location,
    weatherData,
  } = props;
  const { getLocation, getWeather, onFormUpdate } = props;
  const { title, temp, wind } = formValues;
  const handleUpdate = (key, value) => onFormUpdate({ key, value });

  if (formState === FormState.GETTING_LOCATION) {
    getLocation();
    return (<Loader message="Requesting location information" />);
  }

  if (formState === FormState.GETTING_WEATHER) {
    getWeather(location);
    return (<Loader message="Requesting weather information" />);
  }

  if (formState === FormState.WEATHER_ERROR) {
    return (<Error message="Weather data is currently not available. Please try again later." />);
  }

  return (
    <div className="widget-form">
      <div className="widget-settings">
        <TextField name="title" title="Title" value={title} onChange={handleUpdate} />
        <RadioField name="temp" title="Temperature" options={tempOptions} value={temp} onChange={handleUpdate} />
        <RadioField name="wind" title="Wind" options={windOptions} value={wind} onChange={handleUpdate} />
      </div>
      <div className="vertical-separator" />
      <div>
        <Widget title={title} units={temp} showWind={wind} data={weatherData} />
      </div>
    </div>
  );
};

WidgetForm.propTypes = {
  formState: PropTypes.string.isRequired,
  formValues: PropTypes.shape({
    title: PropTypes.string,
    temp: PropTypes.string,
    wind: PropTypes.bool,
  }).isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  weatherData: PropTypes.shape({
    location: PropTypes.string,
    windDirection: PropTypes.string,
    windSpeed: PropTypes.string,
    iconLocation: PropTypes.string,
    celTemp: PropTypes.string,
    farTemp: PropTypes.string,
  }).isRequired,
  getLocation: PropTypes.func.isRequired,
  getWeather: PropTypes.func.isRequired,
  onFormUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  formState: state.widgetEditor.formState,
  formValues: state.widgetEditor.formValues,
  location: state.widgetEditor.currentLocation,
  weatherData: state.widgetEditor.weatherData,
});

const mapDispatchToProps = {
  getLocation: requestLocation,
  getWeather: requestWeather,
  onFormUpdate: formUpdate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WidgetForm);
