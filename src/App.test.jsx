/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { connect } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { configureStore } from 'redux-starter-kit';
import { WidgetForm } from './containers/WidgetForm';
import widgetEditor, {
  locationSuccess, FormState, formUpdate, locationRequest, weatherRequest, weatherSuccess,
} from './slices/WidgetEditorSlice';
import { processResult } from './services/weatherService';

Enzyme.configure({ adapter: new Adapter() });

const testLocation = { latitude: 150, longitude: -33 };

const testResponse = {
  coord: { lon: 150.97, lat: -33.74 },
  weather: [{
    id: 800, main: 'Clear', description: 'clear sky', icon: '01n',
  }],
  base: 'stations',
  main: {
    temp: 302.7, pressure: 1017, humidity: 32, temp_min: 299.82, temp_max: 304.26,
  },
  visibility: 10000,
  wind: { speed: 2.1, deg: 90 },
  clouds: { all: 0 },
  dt: 1570146832,
  sys: {
    type: 1, id: 9599, message: 0.009, country: 'AU', sunrise: 1570131004, sunset: 1570175994,
  },
  timezone: 36000,
  id: 2172111,
  name: 'Castle Hill',
  cod: 200,
};

it('end to end test with settings updates', () => {
  // set up the store
  const store = configureStore({
    reducer: {
      widgetEditor,
    },
  });

  // mock the services
  const mockLocation = jest.fn();
  const mockWeather = jest.fn();

  // create a connected instance of the widget editor using mocked service calls
  const TestWidgetEditor = connect(
    (state) => ({
      formState: state.widgetEditor.formState,
      formValues: state.widgetEditor.formValues,
      location: state.widgetEditor.currentLocation,
      weatherData: state.widgetEditor.weatherData,
    }),
    {
      onFormUpdate: formUpdate,
    },
  )((props) => <WidgetForm {...props} getLocation={mockLocation} getWeather={mockWeather} />);

  const wrapper = mount(
    <TestWidgetEditor store={store} />,
  );
  // verify that the location service has been invoked and test render the first state
  expect(mockLocation).toHaveBeenCalledTimes(1);
  expect(wrapper).toMatchSnapshot();

  // supply location data to the store, verify store is updated
  act(() => {
    store.dispatch(locationRequest());
    store.dispatch(locationSuccess(testLocation));
  });
  expect(store.getState().widgetEditor.currentLocation).toEqual(testLocation);
  expect(store.getState().widgetEditor.formState).toEqual(FormState.GETTING_WEATHER);

  // test render the second state
  wrapper.update();
  expect(wrapper).toMatchSnapshot();
  expect(mockWeather).toHaveBeenCalledTimes(1);

  // supply weather data to the store, verify the store is updated
  act(() => {
    store.dispatch(weatherRequest());
    store.dispatch(weatherSuccess(processResult(testResponse)));
  });
  expect(store.getState().widgetEditor.weatherData).toMatchSnapshot();
  expect(store.getState().widgetEditor.formState).toEqual(FormState.READY);

  // render the form
  wrapper.update();
  expect(wrapper).toMatchSnapshot();

  // change the title, verify the widget is updated
  act(() => {
    wrapper.find('#title_text_field').simulate('change', { target: { value: 'New Title' } });
  });
  wrapper.update();
  expect(wrapper).toMatchSnapshot();

  // change the untis, verify the widget is updated
  act(() => {
    wrapper.find('label[htmlFor="temp_far"] input').simulate('change');
  });
  wrapper.update();
  expect(wrapper).toMatchSnapshot();

  // change the wind display, verify the widget is updated
  act(() => {
    wrapper.find('label[htmlFor="wind_false"] input').simulate('change');
  });
  wrapper.update();
  expect(wrapper).toMatchSnapshot();
});
