import { FC } from "react";
import { LoginForm, SignupForm } from "../../forms";
import { PageWithNavbar } from "../../components";

import loginImage from '../../app/assets/illust-sign-in.png';
import signupImage from '../../app/assets/illust-sign-up.png';

import style from './AuthenticationPage.module.css';

interface AuthenticationPageProps {
  destination: string
}

const AuthenticationPage: FC<AuthenticationPageProps> = (props) => {
  const { destination } = props;

  const sideImage = destination === 'login'
    ? loginImage
    : signupImage;

  return (
    <>
      <PageWithNavbar>
        <div className={style.loginPageContainer}>
          <div className={style.loginPageCover}>
            <img className={style.sideImage} alt='Illustration for authentication' src={sideImage} />
          </div>
          <div className={style.loginForm}>
            {destination === 'login' ? <LoginForm /> : <SignupForm />}
          </div>
        </div>
      </PageWithNavbar>
    </>
  )
}

export default AuthenticationPage;