import { FC } from 'react';

import {
  LoginForm,
  SignupForm,
  RecoverPasswordForm,
  ResetForgetPasswordForm,
} from '../../forms';
import { PageWithNavbar } from '../../components';

import loginImage from '../../app/assets/illust-sign-in.png';
import signupImage from '../../app/assets/illust-sign-up.png';

import style from './AuthenticationPage.module.css';
import { Container } from 'react-bootstrap';

const Forms = {
  login: <LoginForm />,
  recover: <RecoverPasswordForm />,
  signup: <SignupForm />,
  reset: <ResetForgetPasswordForm />,
};
interface AuthenticationPageProps {
  destination: 'login' | 'recover' | 'signup' | 'reset';
}

const AuthenticationPage: FC<AuthenticationPageProps> = props => {
  const { destination } = props;

  const sideImage = destination === 'login' ? loginImage : signupImage;
  const imageMessage =
    destination === 'login'
      ? 'Discover creatives & better product design'
      : 'Explore new ideas for better experiences';

  const renderForm = (formType: string): JSX.Element => {
    return Forms[formType as keyof typeof Forms];
  };
  return (
    <>
      <PageWithNavbar>
        <Container fluid className={'m-0 ' + style.loginPageContainer}>
          <div className={'d-none d-lg-flex ' + style.loginPageCover}>
            <h2 className={style.loginPageCoverTitle}>{imageMessage}</h2>
            <img
              className={style.sideImage}
              alt="Illustration for authentication"
              src={sideImage}
            />
          </div>

          <div className="d-lg-none my-2">
            <img
              className={style.sideImage}
              alt="Illustration for authentication"
              src={sideImage}
            />
          </div>

          <div className={style.loginForm}>{renderForm(destination)}</div>
        </Container>
      </PageWithNavbar>
    </>
  );
};

export default AuthenticationPage;
