import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  name, title, value, onChange,
}) => {
  const handleChange = (e) => onChange(name, e.target.value);
  const formId = `${name}_text_field`;

  return (
    <div className="form-field">
      <label htmlFor={formId}>
        <span className="label-text">{title}</span>
        <input id={formId} type="text" value={value} name={name} onChange={handleChange} />
      </label>
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextField;
