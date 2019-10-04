import React from 'react';
import renderer from 'react-test-renderer';
import Widget from './Widget';

const tempData = {
  location: 'Sydney',
  windDirection: 'NE',
  windSpeed: '10',
  iconLocation: 'http://openweathermap.org/img/wn/01d@2x.png',
  celTemp: '20',
  farTemp: '65',
};

it('correctly displays temperature in Celcius', () => {
  const component = renderer.create(
    <Widget title="Title of Widget" units="cel" showWind data={tempData} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('correctly displays temperature in Fahrenheit', () => {
  const component = renderer.create(
    <Widget title="Title of Widget" units="far" showWind data={tempData} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('correctly displays a different title', () => {
  const component = renderer.create(
    <Widget title="New title" units="cel" showWind data={tempData} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('correctly displays without wind information', () => {
  const component = renderer.create(
    <Widget title="Title of Widget" units="cel" showWind={false} data={tempData} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
