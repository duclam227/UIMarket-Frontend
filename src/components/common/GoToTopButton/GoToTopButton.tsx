import React from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';

import style from './GoToTopButton.module.css';

const GoToTopButton = () => {
  const goToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <button className={style.button} onClick={goToTop}>
      <i className={`m-0 bi-chevron-up ${style.icon}`}></i>
    </button>
  );
};

export default GoToTopButton;
