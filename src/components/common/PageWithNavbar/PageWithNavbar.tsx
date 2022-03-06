import { Children, FC } from "react";
import { Navbar } from "../..";

import style from './PageWithNavbar.module.css';

const PageWithNavbar: FC = (props) => {
  const { children } = props;
  return (
    <>
      <div className={style.pageWrapper}>
        <Navbar />
        <div className={style.pageContainer}>
          {children}
        </div>
      </div>
    </>
  )
}

export default PageWithNavbar;