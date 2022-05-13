import React, { FC } from 'react';
import sideImage from '../../../app/assets/illust-sign-in.png';
import { PageWithNavbar } from '../../';

import style from './AuthenticationLayout.module.css';

const AuthenticationLayout: FC = props => {
  const { children } = props;
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
          <div className={style.loginForm}>{children}</div>
        </div>
      </PageWithNavbar>
    </>
  );
};

export default AuthenticationLayout;
