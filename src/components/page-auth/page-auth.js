import './page-auth.css';

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { saveTokenIntoCookie } from '../../services/common';

function PageAuth({ apiMethod, formTitle, buttonText, antonymLink, antonymText }) {

  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  function onInputChange(e) {
    setUserInput((prevSate) => ({ ...prevSate, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const json = await apiMethod(userInput.email, userInput.password);

      if (json.error) {
        setApiError(json.error);
      }

      if (json.data) {
        saveTokenIntoCookie(json.data.token);
        navigate('/nc/unreaded');
      }
    } catch (err) {
      setApiError(err.message);
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <form className="login-form" onSubmit={onSubmit}>

          <h1>{formTitle}</h1>

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required="required"
            id="email"
            value={userInput.email}
            onChange={onInputChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required="required"
            placeholder="Password"
            id="password"
            value={userInput.password}
            onChange={onInputChange}
          />

          <div className="login-form-submit-btn-wrapper">
            <button type="submit" id="register">{buttonText}</button>
          </div>

        </form>

        <div className="login-other-elements">
          <div className="login-error-message">
            {apiError && <div>{apiError}</div>}
          </div>

          <div className="login-other-links">
            <Link to={antonymLink}>{antonymText}</Link>
            &nbsp;|&nbsp;
            <Link to="/restore">Restore Password</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

PageAuth.propTypes = {
  apiMethod: PropTypes.func,
  formTitle: PropTypes.string,
  buttonText: PropTypes.string,
  antonymLink: PropTypes.string,
  antonymText: PropTypes.string,
};

export default PageAuth;
