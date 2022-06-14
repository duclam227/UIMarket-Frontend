/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, FC, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { genericAvatarUrl } from '../../../app/util/const';
import * as config from '../../../app/util/config';

import { State } from '../../../redux/store';
import { logOut } from '../../../redux';

import Form from 'react-bootstrap/Form';
import { BsSearch, BsCart } from 'react-icons/bs';

import QuestionNavbar from './QuestionNavbar/QuestionNavbar';
import ProductNavbar from './ProductNavbar/ProductNavbar';
import LogoIcon from '../LogoIcon/LogoIcon';

import style from './Navbar.module.css';
import { Container } from 'react-bootstrap';

interface IProps {
  branch?: string;
  intl: IntlShape;
}

const NavBar: FC<IProps> = props => {
  const { branch, intl } = props;

  //Right side nav items
  const searchBarPlaceholder = intl.formatMessage({
    id: 'CommonNavbar.searchBarPlaceholder',
    defaultMessage: 'Search',
  });
  const itemLoginBtnLabel = (
    <FormattedMessage id="CommonNavbar.itemLoginBtnLabel" defaultMessage="Log In" />
  );
  const userDropdownProfileLabel = (
    <FormattedMessage
      id="CommonNavbar.userDropdownProfileLabel"
      defaultMessage="Profile"
    />
  );
  const userDropdownStoreLabel = (
    <FormattedMessage
      id="CommonNavbar.userDropdownStoreLabel"
      defaultMessage="My Store"
    />
  );
  const userDropdownLogoutBtnLabel = (
    <FormattedMessage
      id="CommonNavbar.userDropdownLogoutBtnLabel"
      defaultMessage="Logout"
    />
  );
  const itemSignupBtnLabel = (
    <FormattedMessage id="CommonNavbar.itemSignupBtnLabel" defaultMessage="Sign Up" />
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state: State) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState('');
  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(input.value);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleProductSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedQuery = encodeURIComponent(searchQuery);
    navigate(`/products?keyword=${encodedQuery}`);
  };

  const handleQuestionSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedQuery = encodeURIComponent(searchQuery);
    navigate(`/questions/search?title=${encodedQuery}`);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <Container fluid className="d-flex justify-content-between">
          <div className={style.leftSideNav}>
            <LogoIcon className={style.logo} />
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
          </div>

          <div
            className="collapse navbar-collapse justify-content-end mb-2 mb-lg-0"
            id="navbarSupportedContent"
          >
            <div className="navbar-nav justify-content-center align-items-center">
              <Form
                className={style.searchBarWrapper}
                onSubmit={
                  branch === config.navbarBranches.shop
                    ? e => handleProductSearch(e)
                    : e => handleQuestionSearch(e)
                }
              >
                <div className={style.searchBar}>
                  <BsSearch className={style.searchIcon} />
                  <Form.Control
                    type="text"
                    placeholder={searchBarPlaceholder}
                    onChange={e => handleChange(e as any)}
                  />
                </div>
              </Form>

              <Link className="nav-link" to={currentUser ? '/products/add' : '/signup'}>
                <button className={style.sellButton}>
                  <FormattedMessage id="NavBar.openShop" defaultMessage="Sell your art" />
                </button>
              </Link>

              {currentUser ? (
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
                    {currentUser.customerName}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-lg-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link to={`/user/${currentUser._id}`} className="dropdown-item">
                        {userDropdownProfileLabel}
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <Link to={`/shop/${currentUser.shopId}`} className="dropdown-item">
                        {userDropdownStoreLabel}
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li className="">
                      <button className={`${style.authButton}`} onClick={handleLogout}>
                        {userDropdownLogoutBtnLabel}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link className="nav-link" to="/login">
                    <button className={style.authButton}>{itemLoginBtnLabel}</button>
                  </Link>
                  <Link className="nav-link" to="/signup">
                    <button className={style.authButton}>{itemSignupBtnLabel}</button>
                  </Link>
                </>
              )}

              <div className={'nav-item d-none d-lg-block ' + style.separator}></div>
              <Link className="nav-link" to="/cart">
                <button className={style.authButton}>
                  <BsCart className={style.cartIcon} />
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </nav>
      <div className="d-lg-block">
        {branch === config.navbarBranches.question ? (
          <QuestionNavbar />
        ) : (
          <ProductNavbar />
        )}
      </div>
    </>
  );
};

NavBar.defaultProps = {
  branch: config.navbarBranches.shop,
};

export default injectIntl(NavBar);
