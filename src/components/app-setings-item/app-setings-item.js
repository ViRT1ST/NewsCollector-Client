import './app-setings-item.css';

import React from 'react';
import PropTypes from 'prop-types';

function AppSettingsItem({ name, text }) {

  function onClick() {
    localStorage.setItem('theme', name);
    document.querySelector('.theme-container').setAttribute('data-theme', name);
  }

  return (
    <button className="app-settings-item" type="button" name={name} onClick={onClick}>
      {text}
    </button>
  );
}

AppSettingsItem.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
};

export default AppSettingsItem;
