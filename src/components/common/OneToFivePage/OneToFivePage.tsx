import { Children, FC } from 'react';
import { Navbar as CustomNavbar } from '../..';
import SideNav from '../SideNav/SideNav';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import style from './OneToFivePage.module.css';

const PageWithSideNav: FC = props => {
  const { children } = props;
  return (
    <>
      <div className={style.pageWrapper}>
        <CustomNavbar />
        <div className={`${style.pageContainer} container-fluid p-0`}>
          <Row>
            <Col lg={3} xl={2} className={`p-0 position-sticky top-0`}>
              <Navbar collapseOnSelect expand="lg" sticky="top">
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
      </div>
    </>
  );
};

export default PageWithSideNav;
