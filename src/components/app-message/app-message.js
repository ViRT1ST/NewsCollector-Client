import './app-message.css';

import React from 'react';
import PropTypes from 'prop-types';

function AppMessage({ message = 'Unknown error' }) {

  return (
    <div className="app-message">
      <p>{message}</p>
    </div>
  );
}

export default AppMessage;

AppMessage.propTypes = {
  message: PropTypes.string,
};
