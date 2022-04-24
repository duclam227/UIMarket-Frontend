import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";

import { OneToFivePage } from "../../components";
import noShopImage from '../../app/assets/error-nothing.png';

import style from './ShopHomePage.module.css';
import { FormattedMessage } from "react-intl";
import { Button } from "react-bootstrap";

const ShopHomePage: React.FC = () => {
  const currentUser = useSelector((state: State) => state.auth.user);
  const shopId = currentUser?.shopId;

  return shopId ? (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.content}>

        </div>
      </div>
    </OneToFivePage>
  ) : (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.noShopImage}>
            <img src={noShopImage} alt="A picture telling there is no shop" />
          </div>
          <h4 className={style.title}>
            <FormattedMessage id='ShopHomePage.noShopTitle' />
          </h4>
          <h6>
            <FormattedMessage id='ShopHomePage.noShopSubtitle' />
          </h6>
          <Button>
            <FormattedMessage id='ShopHomePage.openShopButtonLabel' />
          </Button>
        </div>
      </div>
    </OneToFivePage>
  )
}

export default ShopHomePage;