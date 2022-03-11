import { FC } from "react";
import { LoginForm, SignupForm } from "../../forms";
import { PageWithNavbar } from "../../components";

import style from './AuthenticationPage.module.css';

interface AuthenticationPageProps {
  destination: string
}

const AuthenticationPage: FC<AuthenticationPageProps> = (props) => {
  const { destination } = props;

  return (
    <>
      <PageWithNavbar>
        <div className={style.loginPageContainer}>
          <div className={style.loginPageCover}>
            image
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