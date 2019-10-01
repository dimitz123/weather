import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ children }) => (
  <div className="panel">
    {children}
  </div>
);

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Panel;
