import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

import style from './LogoIcon.module.css';

interface IProps {
  className?: string;
}

const LogoIcon: FC<IProps> = (props) => {
  const { className } = props;

  const logoStyle = className ? classNames(className, style.root) : style.root;

  return (
    <Link to='/'>
      <svg
        className={logoStyle}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 406.37 102.89"
      >
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M0,5.14H46.3a46.31,46.31,0,1,1,0,92.61H0Z" />
            <path d="M149.66,97.75A46.31,46.31,0,1,1,196,51.45h-46.3Z" />
            <path d="M251.17,97.75a46.31,46.31,0,1,1,46.31-46.3H251.17Z" />
            <path d="M354.92,102.89,303.47,51.45,354.92,0l51.45,51.45Z" />
          </g>
        </g>
      </svg>
    </Link>
  )
};

export default LogoIcon;