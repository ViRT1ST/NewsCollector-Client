import './app-settings.css';

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import AppSettingsItem from '../app-setings-item/app-setings-item';

function AppSettings({ togglePopup }) {

  const themes = [
    { text: 'Theme 1 (Default)', name: 'default' },
    { text: 'Theme 2', name: 'alpha' },
    { text: 'Theme 3', name: 'beta' },
    { text: 'Theme 4', name: 'delta' },
    { text: 'Theme 5', name: 'sigma' },
  ];

  const inputReference = useRef(null);

  useEffect(() => {
    inputReference.current.focus();
  }, []);


  function onBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      togglePopup();
    }
  }

  const changeThemeButtons = themes.map(({ name, text }) => (
    <li key={name}>
      <AppSettingsItem name={name} text={text} />
    </li>
  ));


  return (
    <div className="app-settings__overlay">
      <div className="app-settings__content" tabIndex={0} onBlur={onBlur} ref={inputReference}>
        <button
          className="app-settings__close-btn"
          type="button"
          tabIndex={0}
          onClick={togglePopup}
        >X
        </button>

        <div className="app-settings__section">
          <h1 className="app-settings__section-title">Change Theme:</h1>
          <ul className="app-settings__section-list">{changeThemeButtons}</ul>
        </div>

      </div>
    </div>
  );
}

AppSettings.propTypes = {
  togglePopup: PropTypes.func,
};

export default AppSettings;
