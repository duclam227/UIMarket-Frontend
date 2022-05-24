
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import logo from '../../../app/assets/deex.png';

import style from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={style.wrapper}>
      <img src={logo} />
      <section className={style.list}>
        <Link to='/about'><FormattedMessage id='Footer.about' /></Link>
        <Link to='/licenses'><FormattedMessage id='Footer.licenses' /></Link>
        <Link to='#'><FormattedMessage id='Footer.supportCenter' /></Link>
        <Link to='/signup'><FormattedMessage id='Footer.becomeAnArtist' /></Link>
        <Link to='/contact'><FormattedMessage id='Footer.contactUs' /></Link>
      </section>
    </footer>
  )
};

export default Footer;