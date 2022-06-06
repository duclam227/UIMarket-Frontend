
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../..';
import { State } from '../../../redux/store';

import style from './Footer.module.css';

const Footer = () => {
  const currentUser = useSelector((state: State) => state.auth.user);

  return (
    <footer className={style.wrapper}>
      <LogoIcon className={style.logo} />
      <section className={style.list}>
        <Link to='/about'><FormattedMessage id='Footer.about' /></Link>
        <Link to='/licenses'><FormattedMessage id='Footer.licenses' /></Link>
        <Link to='#'><FormattedMessage id='Footer.supportCenter' /></Link>
        <Link to='/signup'><FormattedMessage id='Footer.becomeAnArtist' /></Link>
        <Link to='/contact'><FormattedMessage id='Footer.contactUs' /></Link>
        {currentUser && currentUser.isAdmin
          ? <Link to='/admin'><FormattedMessage id='Footer.adminDashboard' /></Link>
          : null
        }
      </section>

    </footer>
  )
};

export default Footer;