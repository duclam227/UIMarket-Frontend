import { FC } from "react";
import { LoginForm } from "../../forms";
import { PageWithNavbar } from "../../components";

import style from './LoginPage.module.css';

const LoginPage: FC = () => {
  return (
    <>
      <PageWithNavbar>
        <div className={style.loginPageContainer}>
          <div className={style.loginPageCover}>
            image
          </div>
          <LoginForm />
        </div>
      </PageWithNavbar>
    </>
  )
}

export default LoginPage;