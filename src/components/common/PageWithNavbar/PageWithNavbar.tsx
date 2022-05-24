import { StringRegexOptions } from "joi";
import { Children, FC } from "react";
import { Navbar, Footer } from "../..";
import { navbarBranches } from "../../../app/util/config";

import style from './PageWithNavbar.module.css';

interface IProps {
  branch?: string;
}

const PageWithNavbar: FC<IProps> = (props) => {
  const { children, branch } = props;
  return (
    <>
      <div className={style.pageWrapper}>
        <Navbar branch={branch} />
        <div className={style.pageContainer}>
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

PageWithNavbar.defaultProps = {
  branch: navbarBranches.shop
}

export default PageWithNavbar;