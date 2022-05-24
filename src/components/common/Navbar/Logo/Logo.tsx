import React from 'react';
import { Link } from 'react-router-dom';
import logo from './deex.png';

import style from './Logo.module.css';

const Logo = () => {
  return (
    <Link to='/' className={style.wrapper}>
      <img src={logo} alt='DeeX logo' />
    </Link>
  )
}

export default Logo;