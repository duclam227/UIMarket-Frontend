import classNames from "classnames";
import React, { FC, useState } from "react";

import style from './ThreeDotMenu.module.css';

interface ThreeDotMenuProps {
  className?: string | null;
  menuItems: Array<{
    key: string,
    label: string,
    function: Function,
  }> | null;
}

const ThreeDotMenu: FC<ThreeDotMenuProps> = (props) => {
  const { className, menuItems } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperClasses = className || classNames(style.wrapper);

  const threeDotIcon = <svg
    xmlns="http://www.w3.org/2000/svg"
    className={style.threeDotIcon}
    viewBox="0 0 16 16"
    onClick={() => { setIsOpen(!isOpen) }}
  >
    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>

  return (
    <div className={wrapperClasses}>
      {threeDotIcon}
      {isOpen &&
        <div className={style.menuModal}>

          {menuItems?.map(item => {
            return (
              <div
                key={item.key}
                className={style.menuItem}
                onClick={() => item.function()}
              >
                {item.label}
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

ThreeDotMenu.defaultProps = {
  className: null,
  menuItems: null,
}

export default ThreeDotMenu