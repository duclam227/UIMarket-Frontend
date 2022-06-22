import classNames from "classnames";
import React, { FC, useState } from "react";
import { BiDotsHorizontalRounded } from 'react-icons/bi';

import style from './ThreeDotMenu.module.css';

interface ThreeDotMenuProps {
  className?: string | null;
  menuItems: Array<{
    key: string,
    label: string,
    function: Function,
  }> | null;
  isOpened?: boolean;
}

const ThreeDotMenu: FC<ThreeDotMenuProps> = (props) => {
  const { className, menuItems, isOpened } = props;

  const [isOpen, setIsOpen] = useState<boolean>(isOpened || false);

  const wrapperClasses = className || classNames(style.wrapper);

  return (
    <div className={wrapperClasses}>
      <div className="nav-item dropdown p-1">
        <a
          className="nav-link dropdown-toggle p-0 d-flex align-items-center"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <BiDotsHorizontalRounded />
        </a>
        <ul
          className="dropdown-menu dropdown-menu-lg-end"
          aria-labelledby="navbarDropdown"
        >
          {menuItems?.map(item => {
            return (
              <li
                key={item.key}
                className={style.menuItem}
                onClick={() => {
                  item.function();
                  setIsOpen(false);
                }}
              >
                {item.label}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

ThreeDotMenu.defaultProps = {
  className: null,
  menuItems: null,
  isOpened: false,
}

export default ThreeDotMenu