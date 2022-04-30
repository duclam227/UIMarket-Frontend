import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";

import { OneToFivePage } from "../../components";
import noShopImage from '../../app/assets/error-nothing.png';

import style from './ShopHomePage.module.css';
import { FormattedMessage } from "react-intl";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ShopHomePage: React.FC = () => {
  const currentUser = useSelector((state: State) => state.auth.user);
  const shopId = currentUser?.shopId;

  const navigate = useNavigate();

  useEffect(() => {
    if (shopId) {
      navigate(`/user/${currentUser._id}/products`);
    }
  }, [shopId])

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
          <Link to='/create-shop'>
            <Button>
              <FormattedMessage id='ShopHomePage.openShopButtonLabel' />
            </Button>
          </Link>
        </div>
      </div>
    </OneToFivePage>
  )
}

export default ShopHomePage;