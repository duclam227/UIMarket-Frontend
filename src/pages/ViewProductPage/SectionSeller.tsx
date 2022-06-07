import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { customer, product } from '../../app/util/interfaces';
import shopAPI from '../../api/shop';

import style from './ViewProductPage.module.css';
import { UserAvatar } from '../../components';

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
        console.log(error);
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
                <UserAvatar image={shop.userId?.customerAvatar} />
              </div>
              <div className={style.reviewContent}>
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
