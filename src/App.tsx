import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { RequireAnonymous, RequireUser } from './components';

import {
  AboutUsPage,
  ContactUsPage,
  QuestionListsPage,
  NotFoundPage,
  PricingPage,
  AuthenticationPage,
  AskAQuestionPage,
} from './pages';
import { logInWithJWT } from './redux/index';

function App() {
  const dispatch = useDispatch();

  const initialGetUserFromBrowser = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      dispatch(logInWithJWT(authToken));
    }
  };

  useEffect(() => {
    initialGetUserFromBrowser();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <RequireAnonymous>
              <AuthenticationPage destination="login" />
            </RequireAnonymous>
          }
        />
        <Route
          path="/signup"
          element={<AuthenticationPage destination="signup" />}
        />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/questions/new"
          element={
            <RequireUser>
              <AskAQuestionPage />
            </RequireUser>
          }
        />
        <Route path="/questions/*" element={<QuestionListsPage />} />
        <Route path="/" element={<Navigate replace to="/questions" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
