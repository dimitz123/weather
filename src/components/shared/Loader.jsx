import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ message }) => (
  <div className="loader">
    <h3>{message}</h3>
    <h3>Loading...</h3>
  </div>
);

Loader.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loader;
