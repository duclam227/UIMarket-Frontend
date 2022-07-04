import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdLanguage } from 'react-icons/md';
import { LogoIcon } from '../..';
import { State } from '../../../redux/store';
import { LanguageContext } from '../../LanguageWrapper/LanguageWrapper';

import style from './Footer.module.css';
import classNames from 'classnames';

const Footer = () => {
  const currentUser = useSelector((state: State) => state.auth.user);
  const context = useContext(LanguageContext);

  return (
    <footer className={style.wrapper}>
      <LogoIcon className={style.logo} />
      <section className={style.list}>
        <Link to="/about">
          <FormattedMessage id="Footer.about" />
        </Link>
        <Link to="/products/add">
          <FormattedMessage id="Footer.becomeAnArtist" />
        </Link>
        <Link to="/contact">
          <FormattedMessage id="Footer.contactUs" />
        </Link>
        <Link to="/license-lookup">
          <FormattedMessage id="SideNav.licenseLookupNavLinkLabel" />
        </Link>
        {currentUser && currentUser.isAdmin ? (
          <Link to="/admin">
            <FormattedMessage id="Footer.adminDashboard" />
          </Link>
        ) : null}
      </section>
      <div className={style.langSelector}>
        <div
          className={classNames(
            style.langItem,
            context.locale !== 'en-US' ? style.inactive : '',
          )}
          onClick={() => context.changeLanguage('en-US')}
        >
          English
        </div>
        <MdLanguage />
        <div
          className={classNames(
            style.langItem,
            context.locale !== 'vi-VN' ? style.inactive : '',
          )}
          onClick={() => context.changeLanguage('vi-VN')}
        >
          Tiếng Việt
        </div>
      </div>
    </footer>
  );
};

export default Footer;
