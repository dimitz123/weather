import React from 'react';
import PropTypes from 'prop-types';

const RadioOption = ({
  name, groupName, value, active, onChange,
}) => {
  const radioLabel = `${groupName}_${value}`;
  return (
    <label htmlFor={radioLabel} className="radio-option">
      {name}
      <input
        id={radioLabel}
        type="radio"
        name={groupName}
        checked={active}
        onChange={() => onChange(value)}
      />
      <span className="checkmark" />
    </label>
  );
};

RadioOption.propTypes = {
  name: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const RadioField = ({
  name, title, value, options, onChange,
}) => {
  const handleChange = (val) => onChange(name, val);
  const formId = `${name}_radio_field`;

  return (
    <div className="form-field">
      <label htmlFor={formId}>
        <span className="label-text">{title}</span>
        <div className="radio-options">
          {options.map((opt) => (
            <RadioOption
              key={opt.value}
              name={opt.name}
              groupName={name}
              value={opt.value}
              active={value === opt.value}
              onChange={handleChange}
            />
          ))}
        </div>
      </label>
    </div>
  );
};

RadioField.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]).isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioField;
