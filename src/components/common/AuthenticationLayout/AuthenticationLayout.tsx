import React, { FC } from 'react';
import sideImage from '../../../app/assets/illust-sign-in.png';
import { PageWithNavbar } from '../../';

import style from './AuthenticationLayout.module.css';
import { Container } from 'react-bootstrap';

const AuthenticationLayout: FC = props => {
  const { children } = props;
  return (
    <>
      <PageWithNavbar>
        <Container fluid className={'m-0 ' + style.loginPageContainer}>
          <div className={'d-none d-lg-flex ' + style.loginPageCover}>
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

          <div className={style.loginForm}>{children}</div>
        </Container>
      </PageWithNavbar>
    </>
  );
};

export default AuthenticationLayout;
