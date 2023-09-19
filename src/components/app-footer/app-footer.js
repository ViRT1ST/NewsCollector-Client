import './app-footer.css';

import React, { useState, useCallback } from 'react';

import AppSettings from '../app-settings/app-settings';

function AppFooter() {

  const [isPopupDisplayed, setIsDisplayed] = useState(false);

  const togglePopup = useCallback(() => {
    setIsDisplayed(!isPopupDisplayed);

    try {
      document.querySelector('.settings-close').focus();
    } catch (err) {
      // Settings window is not displayed at this moment
    }

  }, [isPopupDisplayed]);

  const popup = isPopupDisplayed ? <AppSettings togglePopup={togglePopup} /> : null;

  return (
    <footer className="footer">
      <button type="button" className="footer-btn" onClick={togglePopup}>
        Presentation Settings
      </button>

      {popup}
    </footer>
  );
}

export default AppFooter;
