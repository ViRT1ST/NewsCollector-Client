import './app-redirect.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AppRedirect({ code, message }) {
  const navigate = useNavigate();

  setTimeout(() => navigate('/nc/unreaded'), 3000);

  return (
    <div className="app-redirect">
      <h1>Error {code}: {message}</h1>
      <p>Redirecting to main page...</p>
    </div>
  );
}

AppRedirect.propTypes = {
  code: PropTypes.string,
  message: PropTypes.string,
};

export default AppRedirect;
