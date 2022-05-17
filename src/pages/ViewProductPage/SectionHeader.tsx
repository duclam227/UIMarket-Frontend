import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import parse from 'html-react-parser';
import { customer, product } from '../../app/util/interfaces';

import style from './ViewProductPage.module.css';
import cartAPI from '../../api/cart';

interface Props {
  product: product;
  currentUser: customer;
}

const SectionHeader: React.FC<Props> = (props) => {
  const { product, currentUser } = props;

  const isCurrentUserSeller = currentUser?.customerEmail === product.shopId.customerEmail;
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate('/signup');
      return;
    }

    cartAPI.addToCart(product._id!)
      .then((res: any) => {
        console.log(res);
        //handle finish
      })
      .catch(error => {
        console.log(error);
      })
  }

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
          : <Button className={style.button} onClick={handleAddToCart}>
            <AiOutlineShoppingCart />
            <FormattedMessage id='ViewProductPage.AddToCart' />
          </Button>
        }

      </div>
    </section>
  )
}

export default SectionHeader;