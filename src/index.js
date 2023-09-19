import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';

const root = ReactDOM.createRoot(document.getElementById('root'));

/* eslint comma-dangle: "off" */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
