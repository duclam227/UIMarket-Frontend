import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import { LanguageWrapper } from './components';
import store from './redux/store';

import './custom.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <LanguageWrapper>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={CLIENT_ID!}>
          <BrowserRouter>
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
    </LanguageWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
