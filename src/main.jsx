import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { BrowserRouter as Router } from 'react-router-dom';

import './styles/index.css';
import ToastContainer from './components/Toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <React.Suspense fallback={<p>Loading....</p>}>
          <App />
        </React.Suspense>
      </Router>
    </Provider>
  </React.StrictMode>
);
