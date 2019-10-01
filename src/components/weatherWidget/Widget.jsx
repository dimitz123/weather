import React from 'react';
import PropTypes from 'prop-types';
import Card from '../shared/Card';

const WindInformation = ({ speed, direction }) => (
  <p className="caption">
    <b className="right-spaced">Wind</b>
    {`${direction} ${speed}km/h`}
  </p>
);

WindInformation.propTypes = {
  direction: PropTypes.string.isRequired,
  speed: PropTypes.string.isRequired,
};

const Widget = ({
  title, units, showWind, data,
}) => (
  <Card>
    <div className="weather-widget">
      <h3>{title}</h3>
      <div className="widget-container">
        <div className="widget-icon">
          <img src={data.iconLocation} alt="weather conditions" />
        </div>
        <div className="widget-data">
          <p>{data.location}</p>
          <p className="highlight">
            {units === 'cel' ? data.celTemp : data.farTemp}
            °
          </p>
          {showWind && <WindInformation speed={data.windSpeed} direction={data.windDirection} />}
        </div>
      </div>
    </div>
  </Card>
);

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  showWind: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    location: PropTypes.string,
    windDirection: PropTypes.string,
    windSpeed: PropTypes.string,
    iconLocation: PropTypes.string,
    celTemp: PropTypes.string,
    farTemp: PropTypes.string,
  }).isRequired,
};

export default Widget;
