import React from "react";
import { RiArrowUpSLine } from 'react-icons/ri';

import style from './GoToTopButton.module.css';

const GoToTopButton = () => {

  const goToTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <button className={style.button} onClick={goToTop}>
      <RiArrowUpSLine className={style.icon} />
    </button>
  )
};

export default GoToTopButton;