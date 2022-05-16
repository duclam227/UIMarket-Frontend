import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import parse from 'html-react-parser';
import { customer, product } from '../../app/util/interfaces';

import style from './ViewProductPage.module.css';

interface Props {
  product: product;
  currentUser: customer;
}

const SectionHeader: React.FC<Props> = (props) => {
  const { product, currentUser } = props;

  const isCurrentUserSeller = currentUser.customerEmail === product.shopId.customerEmail;

  return (
    <section className={style.header}>
      <h1 className={style.title}>{product.productName}</h1>
      <div className={style.buttonRow}>
        {isCurrentUserSeller
          ? <Link to='edit'>
            <Button className={style.button}>
              <FaPen />
              <FormattedMessage id='ViewProductPage.EditProduct' />
            </Button>
          </Link>
          : <Button className={style.button}>
            <AiOutlineShoppingCart />
            <FormattedMessage id='ViewProductPage.AddToCart' />
          </Button>
        }

      </div>
    </section>
  )
}

export default SectionHeader;