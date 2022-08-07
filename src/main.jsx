import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { BrowserRouter as Router } from 'react-router-dom';

import './styles/index.css';
import ToastContainer from './components/Toast';
import { APP_VERSION } from '~/utils/app-v';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <Router basename={APP_VERSION}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
