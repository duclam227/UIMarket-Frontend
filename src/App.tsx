import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import {
  RequireAnonymous,
  RequireUser,
  RequireAuthenticated,
} from './components';

import {
  AboutUsPage,
  ContactUsPage,
  QuestionListsPage,
  QuestionListsPageByTag,
  NotFoundPage,
  PricingPage,
  AuthenticationPage,
  AskAQuestionPage,
  ViewQuestionPage,
  BountiedQuestionListsPage,
  PopularQuestionListsPage,
  EditQuestionPage,
  UserProfilePage,
  AddAProductPage,
  EditProfilePage,
  EditPersonalInfoPage,
  ShopHomePage,
  ManageProductsPage,
  CreateAShopPage,
  ViewProductPage,
  SearchQuestionsPage,
  ProductListPage,
  VerifyPromptPage,
  AccountNotVerifiedPage,
  AccountVerifiedPage,
  ChangePasswordPage,
  ForbiddenPage,
  CartPage,
  LandingPage,
  EditProductPage,
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
        <Route path="/verify" element={<AccountVerifiedPage />} />
        <Route
          path="/login/not-verified"
          element={<AccountNotVerifiedPage />}
        />
        <Route path="/signup/verify-prompt" element={<VerifyPromptPage />} />
        <Route
          path="/signup"
          element={<AuthenticationPage destination="signup" />}
        />
        <Route path="/create-shop" element={<CreateAShopPage />} />
        <Route
          path="/recover"
          element={<AuthenticationPage destination="recover" />}
        />
        <Route
          path="/resetForgetPassword"
          element={<AuthenticationPage destination="reset" />}
        />
        <Route
          path="/user/:id/edit"
          element={
            <RequireAuthenticated>
              <EditProfilePage />
            </RequireAuthenticated>
          }
        />
        <Route
          path="/user/:id/change-password"
          element={
            <RequireAuthenticated>
              <ChangePasswordPage />
            </RequireAuthenticated>
          }
        />
        <Route path="/user/:id/products" element={<ManageProductsPage />} />
        <Route path="/user/:id/shop" element={<ShopHomePage />} />
        <Route path="/user/:id/*" element={<UserProfilePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/add" element={<AddAProductPage />} />
        <Route path="/product/:id" element={<ViewProductPage />} />
        <Route path="/product/:id/edit" element={<EditProductPage />} />
        <Route
          path="/questions/new"
          element={
            <RequireUser>
              <AskAQuestionPage />
            </RequireUser>
          }
        />
        <Route path="/questions/all" element={<QuestionListsPage />} />
        <Route
          path="/questions/bountied"
          element={<BountiedQuestionListsPage />}
        />
        <Route
          path="/questions/popular"
          element={<PopularQuestionListsPage />}
        />
        <Route path="/questions/search/*" element={<SearchQuestionsPage />} />
        <Route path="/questions/tag/:id" element={<QuestionListsPageByTag />} />
        <Route
          path="/questions/*"
          element={<Navigate replace to="/questions/all" />}
        />
        <Route path="/question/:id" element={<ViewQuestionPage />} />
        <Route
          path="/question/:id/edit"
          element={
            <RequireUser>
              <EditQuestionPage />
            </RequireUser>
          }
        />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
