import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginForm, SignupForm, RecoverPasswordForm } from '../../forms';
import { PageWithNavbar } from '../../components';

import loginImage from '../../app/assets/illust-sign-in.png';
import signupImage from '../../app/assets/illust-sign-up.png';

import style from './AuthenticationPage.module.css';

const Forms = {
  login: <LoginForm />,
  recover: <RecoverPasswordForm />,
  signup: <SignupForm />,
};
interface AuthenticationPageProps {
  destination: 'login' | 'recover' | 'signup';
}

const AuthenticationPage: FC<AuthenticationPageProps> = props => {
  const { destination } = props;

  const sideImage = destination === 'login' ? loginImage : signupImage;

  const renderForm = (formType: string): JSX.Element => {
    return Forms[formType as keyof typeof Forms];
  };
  return (
    <>
      <PageWithNavbar>
        <div className={style.loginPageContainer}>
          <div className={style.loginPageCover}>
            <img
              className={style.sideImage}
              alt="Illustration for authentication"
              src={sideImage}
            />
          </div>
          <div className={style.loginForm}>{renderForm(destination)}</div>
        </div>
      </PageWithNavbar>
    </>
  );
};

export default AuthenticationPage;
