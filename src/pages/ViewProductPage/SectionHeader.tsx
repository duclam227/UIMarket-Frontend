import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BsExclamationOctagon } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';

import { customer, product } from '../../app/util/interfaces';
import cartAPI from '../../api/cart';

import style from './ViewProductPage.module.css';

interface Props {
  onShowReportModal?: Function;
  product: product;
  currentUser: customer;
  intl: IntlShape;
}

const SectionHeader: React.FC<Props> = props => {
  const { product, currentUser, intl, onShowReportModal } = props;
  const isCurrentUserSeller = currentUser?.customerEmail === product.shopId.customerEmail;
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate('/signup');
      return;
    }

    cartAPI
      .addToCart(product._id!)
      .then((res: any) => {
        //handle finish
        toast.success(
          intl.formatMessage({ id: 'ViewProductPage.AddToCartSuccessMessage' }),
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderStars = (productRating: number) => {
    const starArray: Array<any> = [];
    let rating = productRating;
    for (let key = 1; key <= 5; key++) {
      if (rating > 0) {
        starArray.push(
          <i className={'bi-star-fill ' + style.yellowStar} key={key} />,
        );
      } else {
        starArray.push(
          <i className={'bi-star-fill ' + style.grayStar} key={key} />,
        );
      }
      rating = rating - 1;
    }

    return <div>{starArray}</div>;
  };

  return (
    <section className={style.header}>
      <h1 className={style.title}>{product.productName}</h1>
      <div className={style.subtitle}>
        {renderStars(product.productRating!)}
        <div className={style.columnDivider}></div>
        <FormattedMessage id='ViewProductPage.totalReviews' values={{ count: product.totalReview }} />
        <div className={style.columnDivider}></div>
        <FormattedMessage id='ViewProductPage.totalSold' values={{ count: product.totalSold }} />
      </div>

      <section className={style.buyPanel}>
        <div className={style.priceRow}>
          <span><FormattedMessage id='ViewProductPage.priceLabel' /></span>
          <span>
            <FormattedMessage
              id='ViewProductPage.price'
              values={{ money: product.productPrice }}
            />
          </span>
        </div>
        <Button
          className={style.button}
          onClick={handleAddToCart}
          disabled={isCurrentUserSeller}
        >
          <FormattedMessage id="ViewProductPage.BuyNow" />
        </Button>
        <Button
          className={style.button}
          onClick={handleAddToCart}
          disabled={isCurrentUserSeller}
          variant='outline-primary'
        >
          <AiOutlineShoppingCart />
          <FormattedMessage id="ViewProductPage.AddToCart" />
        </Button>
      </section>

      {/* <div className={style.buttonRow}>
        {isCurrentUserSeller ? (
          <Link to="edit">
            <Button className={style.button}>
              <FaPen />
              <FormattedMessage id="ViewProductPage.EditProduct" />
            </Button>
          </Link>
        ) : (
          <Button className={style.button} onClick={handleAddToCart}>
            <AiOutlineShoppingCart />
            <FormattedMessage id="ViewProductPage.AddToCart" />
          </Button>
        )}
      </div>

      <div className={`mt-3 ${style.buttonRow}`}>
        {!!onShowReportModal && (
          <Button
            className={`d-flex align-items-center`}
            onClick={() => onShowReportModal!()}
          >
            <BsExclamationOctagon size={20} className={`me-2`} />
            <span>
              <FormattedMessage id="ReportModal.reportBtnLabel" />
            </span>
          </Button>
        )}
      </div> */}

    </section>
  );
};

export default injectIntl(SectionHeader);
