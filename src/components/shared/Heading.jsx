import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ text }) => (
  <div className="page-header">
    <h1>{text}</h1>
  </div>
);

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Heading;
