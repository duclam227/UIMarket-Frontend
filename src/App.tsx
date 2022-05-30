import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import {
  RequireAnonymous,
  RequireUser,
  RequireAuthenticated,
  AdminRoutes,
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
  PurchaseHistoryPage,
  ReviewsPage,
  ShopWalletPage,
  ViewLicensePage,
  BadRequestPage,
  AdminUserManagementPage,
} from './pages';
import ConfirmPaymentPage from './pages/ConfirmPaymentPage/ConfirmPaymentPage';
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
      <ToastContainer />
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
        <Route path="/login/not-verified" element={<AccountNotVerifiedPage />} />
        <Route path="/signup/verify-prompt" element={<VerifyPromptPage />} />
        <Route path="/signup" element={<RequireAnonymous><AuthenticationPage destination="signup" /></RequireAnonymous>} />
        <Route path="/create-shop" element={<RequireUser><CreateAShopPage /></RequireUser>} />
        <Route path="/recover" element={<AuthenticationPage destination="recover" />} />
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
        <Route path="/user/:id/products" element={<RequireUser><ManageProductsPage /></RequireUser>} />
        <Route path="/user/:id/shop" element={<RequireUser><ShopHomePage /></RequireUser>} />
        <Route path="/user/:id/reviews" element={<RequireUser><ReviewsPage /></RequireUser>} />
        <Route path="/user/:id/*" element={<UserProfilePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/cart" element={<RequireUser><CartPage /></RequireUser>} />
        <Route path="/payment/*" element={<RequireUser><ConfirmPaymentPage /></RequireUser>} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/add" element={<RequireUser><AddAProductPage /></RequireUser>} />
        <Route path="/product/:id" element={<ViewProductPage />} />
        <Route path="/product/:id/edit" element={<RequireUser><EditProductPage /></RequireUser>} />
        <Route path="/purchases/:id" element={<RequireUser><ViewLicensePage /></RequireUser>} />
        <Route path="/purchases" element={<RequireUser><PurchaseHistoryPage /></RequireUser>} />
        <Route
          path="/questions/new"
          element={
            <RequireUser>
              <AskAQuestionPage />
            </RequireUser>
          }
        />
        <Route path="/questions/all" element={<QuestionListsPage />} />
        <Route path="/questions/bountied" element={<BountiedQuestionListsPage />} />
        <Route path="/questions/popular" element={<PopularQuestionListsPage />} />
        <Route path="/questions/search/*" element={<SearchQuestionsPage />} />
        <Route path="/questions/tag/:id" element={<QuestionListsPageByTag />} />
        <Route path="/questions/*" element={<Navigate replace to="/questions/all" />} />
        <Route path="/question/:id" element={<ViewQuestionPage />} />
        <Route
          path="/question/:id/edit"
          element={
            <RequireUser>
              <EditQuestionPage />
            </RequireUser>
          }
        />
        <Route path="/admin/:tab" element={<AdminRoutes />} />
        <Route path="/admin" element={<Navigate to="/admin/user-management" replace />} />
        <Route path="/wallet" element={<RequireUser><ShopWalletPage /></RequireUser>} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/bad-request" element={<BadRequestPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
