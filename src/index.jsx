import './assets/styles/index.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app';
import { store } from './store';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


