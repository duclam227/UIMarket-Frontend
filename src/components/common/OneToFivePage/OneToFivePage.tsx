import { FC } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { State } from '../../../redux/store';
import { Navbar as CustomNavbar } from '../..';
import SideNav from '../SideNav/SideNav';
import style from './OneToFivePage.module.css';

const PageWithSideNav: FC = props => {
  const currentUser = useSelector((state: State) => state.auth.user);
  const { children } = props;
  return (
    <>
      <div className={style.pageWrapper}>
        <CustomNavbar />
        {currentUser ? (
          //Render side nav
          <div className={`${style.pageContainer} container-fluid p-0`}>
            <Row>
              <Col lg={3} xl={2} className={`p-0 position-sticky top-0`}>
                <Navbar
                  collapseOnSelect
                  expand="lg"
                  sticky="top"
                  className={`p-0`}
                >
                  <Navbar.Toggle
                    aria-controls="offcanvasNavbar"
                    className={`${style.hamburgerOffcanvasToggler}`}
                  />
                  <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                  >
                    <Offcanvas.Body className={`p-0`}>
                      <SideNav />
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                  <SideNav className={`d-none d-lg-block`} />
                </Navbar>
              </Col>
              <Col lg={9} xl={10} className={`p-2`}>
                {children}
              </Col>
            </Row>
          </div>
        ) : (
          //Don't render side nav
          <div className={style.pageContainer}>{children}</div>
        )}
      </div>
    </>
  );
};

export default PageWithSideNav;
