import { useState, FC, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import Form from 'react-bootstrap/Form';

// import { State } from '../../../redux/store';
import { State } from '../../../redux/store';
import { logOut } from '../../../redux';

import style from './Navbar.module.css';
import { genericAvatarUrl } from '../../../app/util/const';

const NavBar: FC = ({ intl }: any) => {
  // Left side nav items
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

  //Right side nav items
  const searchBarPlaceholder = intl.formatMessage({
    id: 'CommonNavbar.searchBarPlaceholder',
    defaultMessage: 'Search',
  });
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

  const navVisualBstrapClass = 'navbar navbar-expand-md navbar-dark bg-dark ';
  const navItemsWrapperBstrapClass =
    'collapse navbar-collapse justify-content-between';
  const leftSideNavItemBstrapClass = 'navbar-nav mb-2 mb-md-0';
  const rightSideNavItemBstrapClass = 'navbar-nav mb-md-0';
  const loginButtonBstrapClass = 'btn btn-outline-light';
  const signupButtonBstrapClass = 'btn btn-light me-2 mb-2 mb-md-0';
  const logoutButtonBstrapClass = 'btn btn-danger';

  const dispatch = useDispatch();
  const currentUser = useSelector((state: State) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(input.value);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <nav className={navVisualBstrapClass}>
      <div className="container-fluid">
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

        <div className={navItemsWrapperBstrapClass} id="navbarSupportedContent">
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
            <Form className="mb-2 me-2 mb-md-0">
              <Form.Control
                type="text"
                placeholder={searchBarPlaceholder}
                onChange={e => handleChange(e as any)}
              />
            </Form>
            {currentUser ? (
              //Render if logged in
              <div className="nav-item dropdown p-1">
                <a
                  className="nav-link dropdown-toggle p-0 d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className={style.avatarWrapper}>
                    <img
                    src={currentUser.customerAvatar || genericAvatarUrl}
                    className={style.userAvatar}
                    alt="User profile"
                  />
                  </div>
                  {currentUser.customerEmail}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-lg-end position-absolute mt-1"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link
                      to={`/user/${currentUser._id}`}
                      className="dropdown-item"
                    >
                      {userDropdownProfileLabel}
                    </Link>
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
              // Render if not logged in
              <>
                <Link to="/signup" className="nav-item">
                  <button className={signupButtonBstrapClass}>
                    {itemSignupBtnLabel}
                  </button>
                </Link>
                <Link to="/login" className="nav-item">
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

export default injectIntl(NavBar);
