import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { LanguageWrapper } from './components';
import store from './redux/store';

import './index.css';
import './custom.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.render(
  <React.StrictMode>
    <LanguageWrapper>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </LanguageWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
