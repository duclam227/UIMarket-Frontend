import { useState, FC, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { genericAvatarUrl } from '../../../app/util/const';

import { State } from '../../../redux/store';
import { logOut } from '../../../redux';

import Form from 'react-bootstrap/Form';
import Logo from './Logo/Logo';
import { BsSearch, BsCart } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import style from './Navbar.module.css';

interface IProps {
  branch?: string;
  intl: IntlShape;
}

const NavBar: FC<IProps> = (props) => {
  const {
    branch,
    intl
  } = props;

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
    <nav className={style.mainNavbar}>
      <section className={style.leftSideNav}>
        <Logo />

        <Form className={style.searchBarWrapper}>
          <div className={style.searchBar}>
            <BsSearch className={style.searchIcon} />
            <Form.Control
              type="text"
              placeholder={searchBarPlaceholder}
              onChange={e => handleChange(e as any)}
            />
          </div>
        </Form>
      </section>

      <section className={style.rightSideNav}>

        <div className={style.buttonRow}>
          <button className={style.sellButton}>Sell your art</button>
          <button className={style.authButton}>{itemLoginBtnLabel}</button>
          <button className={style.authButton}>{itemSignupBtnLabel}</button>
          <div className={style.separator}></div>
          <button className={style.authButton}><BsCart className={style.cartIcon} /></button>
        </div>
      </section>

    </nav>
  );
};

export default injectIntl(NavBar);
