import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// import { State } from '../../../redux/store';
import { State } from '../../../redux/store';
import { logOut } from '../../../redux';

import style from './Navbar.module.css';
const NavBar: FC = () => {
  const appName = (
    <FormattedMessage id="CommonNavbar.appName" defaultMessage="App Name" />
  );
  const itemQuestionsLabel = (
    <FormattedMessage
      id="CommonNavbar.itemQuestionsLabel"
      defaultMessage="Questions"
    />
  );
  const itemAskAQuestionLabel = (
    <FormattedMessage
      id="CommonNavbar.itemAskAQuestionLabel"
      defaultMessage="Ask a question"
    />
  );
  const itemLoginBtnLabel = (
    <FormattedMessage
      id="CommonNavbar.itemLoginBtnLabel"
      defaultMessage="Log In"
    />
  );
  const userDropdownProfileLabel = (
    <FormattedMessage
      id="CommonNavbar.userDropdownProfileLabel"
      defaultMessage="Profile"
    />
  );
  const userDropdownLogoutBtnLabel = (
    <FormattedMessage
      id="CommonNavbar.userDropdownLogoutBtnLabel"
      defaultMessage="Logout"
    />
  );
  const itemSignupBtnLabel = (
    <FormattedMessage
      id="CommonNavbar.itemSignupBtnLabel"
      defaultMessage="Sign Up"
    />
  );

  const dispatch = useDispatch();
  const currentUser = useSelector((state: State) => state.auth.user);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const navWrapperBstrapClass = 'navbar navbar-expand-lg navbar-dark bg-dark';
  const leftSideNavItemBstrapClass = 'navbar-nav me-auto mb-2 mb-lg-0';
  const rightSideNavItemBstrapClass = 'navbar-nav mb-lg-0';
  const loginButtonBstrapClass = 'btn btn-outline-light';
  const signupButtonBstrapClass = 'btn btn-light mx-2';
  const logoutButtonBstrapClass = 'btn btn-danger';
  return (
    <nav className={navWrapperBstrapClass}>
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
          <ul className={leftSideNavItemBstrapClass}>
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
          <ul className={rightSideNavItemBstrapClass}>
            {currentUser ? (
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
                  {currentUser.customerEmail}
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
                    <button
                      className={logoutButtonBstrapClass}
                      onClick={handleLogout}
                    >
                      {userDropdownLogoutBtnLabel}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/signup" className="nav-item ">
                  <button className={signupButtonBstrapClass}>
                    {itemSignupBtnLabel}
                  </button>
                </Link>
                <Link to="/login" className="nav-item ">
                  <button className={loginButtonBstrapClass}>
                    {itemLoginBtnLabel}
                  </button>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
