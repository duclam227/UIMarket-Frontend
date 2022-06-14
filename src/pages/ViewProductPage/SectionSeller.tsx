import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserAvatar } from '../../components';

import { customer, product } from '../../app/util/interfaces';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';

import shopAPI from '../../api/shop';

import style from './ViewProductPage.module.css';

interface Props {
  product: product;
  currentUser: customer;
  intl: IntlShape;
}

const SectionSeller: React.FC<Props> = props => {
  const { product, currentUser, intl, } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shop, setShop] = useState<any>(null);

  const isCurrentUserSeller = currentUser?.customerEmail === product.shopId.customerEmail;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    shopAPI.getShopById(product.shopId._id)
      .then((res: any) => {
        setShop(res.shop);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.shop[errorMsg as keyof typeof errorCodes.shop];
        toast.error(intl.formatMessage({ id: `Shop.${errorCode}` }));
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section className={style.seller}>
      {
        !isLoading && shop
          ? <>
            <b><FormattedMessage id='ViewProductPage.meetSeller' /></b>
            <div className={style.review}>
              <div className={style.sideContent}>
                <Link to={`/user/${shop.userId._id}`}>
                  <UserAvatar image={shop.userId?.customerAvatar} />
                </Link>
              </div>
              <div className={style.reviewContent}>
                <Link to={`/shop/${shop._id}`}>
                  <h5>{shop.shopName}</h5>
                </Link>
                {shop.shopDescription}
              </div>
            </div >

            <Link to={`/shop/${shop._id}`}>
              <Button><FormattedMessage id='ViewProductPage.viewShopButton' /></Button>
            </Link>
          </>
          : <Spinner animation='border' />
      }

    </section>
  );
};

export default injectIntl(SectionSeller);
