import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// import { State } from '../../../redux/store';
import { State } from '../../../redux/store';
import { logOut } from '../../../redux';
import { customer } from '../../../app/util/interfaces';

import style from './Navbar.module.css';
const NavBar: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.auth.user);
  const appName = (
    <FormattedMessage id="CommonNavbar.appName" defaultMessage="App Name" />
  );
  const itemQuestionsLabel = (
    <FormattedMessage
      id="CommonNavbar.itemQuestions"
      defaultMessage="Questions"
    />
  );
  const itemAskAQuestionLabel = (
    <FormattedMessage
      id="CommonNavbar.itemAskAQuestion"
      defaultMessage="Ask a question"
    />
  );
  const itemLoginBtnLabel = (
    <FormattedMessage id="CommonNavbar.itemLoginBtn" defaultMessage="Sign in" />
  );
  const userDropdownProfileLabel = (
    <FormattedMessage
      id="CommonNavbar.userDropdownProfile"
      defaultMessage="Profile"
    />
  );
  const userDropdownLogoutBtnLabel = (
    <FormattedMessage
      id="CommonNavbar.userDropdownLogoutBtn"
      defaultMessage="Logout"
    />
  );

  const handleLogout = () => {
    dispatch(logOut());
  };

  const navWrapper = 'navbar navbar-expand-lg navbar-dark bg-dark';
  const leftSideNavItemWrapper = 'navbar-nav me-auto mb-2 mb-lg-0';
  const rightSideNavItemWrapper = 'navbar-nav mb-lg-0';
  const loginButtonStyle = 'btn btn-outline-light';
  const logoutButtonStyle = 'btn btn-danger';

  return (
    <nav className={navWrapper}>
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand">{appName}</a>

        {/* Nav toggle button appear on small screen */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left side nav items */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/questions" className="nav-link active">
                {itemQuestionsLabel}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/questions/new" className="nav-link ">
                {itemAskAQuestionLabel}
              </Link>
            </li>
          </ul>

          {/* Right side nav items */}
          <ul className="navbar-nav mb-lg-0">
            {user ? (
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle p-0"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                    className={style.userAvatar}
                    alt="User profile"
                  />
                  khoakg2013@gmail.com
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-lg-end position-absolute mt-1"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item">{userDropdownProfileLabel}</a>
                  </li>
                  <hr className="dropdown-divider" />
                  <li className="text-center">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      {userDropdownLogoutBtnLabel}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="nav-item ">
                <button className="btn btn-outline-light">
                  {itemLoginBtnLabel}
                </button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
