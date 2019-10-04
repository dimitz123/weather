/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import TextField from './TextField';
import RadioField from './RadioField';

Enzyme.configure({ adapter: new Adapter() });

const textProps = {
  title: 'Test Text',
  name: 'test_text',
  value: 'Testing text field',
  onChange: jest.fn(),
};

it('correctly renders initial TextField properties', () => {
  const textfield = renderer.create(
    <TextField {...textProps} />,
  );

  const tree = textfield.toJSON();
  expect(tree).toMatchSnapshot();
});

it('correctly fires its callback on TextField change', () => {
  const textfield = mount(<TextField {...textProps} />);
  textfield.find('input').simulate('change', { target: { value: 'New Text' } });

  expect(textProps.onChange).toHaveBeenCalledWith('test_text', 'New Text');
});

const radioProps = {
  title: 'Radio Test',
  name: 'test_radio',
  value: 'op1',
  options: [
    { name: 'Op1', value: 'op1' },
    { name: 'Op2', value: 'op2' },
    { name: 'Op3', value: 'op3' },
    { name: 'Op4', value: 'op4' },
  ],
  onChange: jest.fn(),
};

it('renders the RadioField correctly based on the selected value', () => {
  let radiofield = renderer.create(
    <RadioField {...radioProps} />,
  );

  let tree = radiofield.toJSON();
  expect(tree).toMatchSnapshot();

  // Change the selected value and make sure the component correctly re-renders
  radiofield = renderer.create(
    <RadioField {...radioProps} value="op3" />,
  );
  tree = radiofield.toJSON();
  expect(tree).toMatchSnapshot();
});

it('correctly fires RadioField callbacks on change', () => {
  const radiofield = mount(<RadioField {...radioProps} />);

  // Select the current option and make sure no change event is fired
  radiofield.find('label[htmlFor="test_radio_op1"] input').simulate('change');
  expect(radioProps.onChange).toHaveBeenCalledWith('test_radio', 'op1');
  expect(radiofield).toMatchSnapshot();

  radiofield.find('label[htmlFor="test_radio_op3"] input').simulate('change');
  expect(radioProps.onChange).toHaveBeenCalledWith('test_radio', 'op3');
  expect(radiofield).toMatchSnapshot();
});
