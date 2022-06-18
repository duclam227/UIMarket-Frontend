import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button, Spinner, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BsExclamationOctagon } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';

import { customer, product } from '../../app/util/interfaces';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';
import cartAPI from '../../api/cart';

import style from './ViewProductPage.module.css';

interface Props {
  onShowReportModal?: Function;
  product: product;
  currentUser: customer;
  isBought: boolean | null;
  intl: IntlShape;
}

const SectionHeader: React.FC<Props> = props => {
  const { product, currentUser, isBought, intl } = props;
  const isCurrentUserSeller = currentUser?.customerEmail === product.shopId.customerEmail;
  const navigate = useNavigate();

  const handleAddToCart = (action?: string) => {
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
          {
            onOpen: () => {
              if (action && action === 'now') {
                navigate('/cart');
              }
            },
          },
        );
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.cart[errorMsg as keyof typeof errorCodes.cart];
        toast.error(intl.formatMessage({ id: `Cart.${errorCode}` }));
      });
  };

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/signup');
      return;
    }

    const checkoutProducts = [
      {
        _id: product._id,
        shopId: product.shopId._id,
        productPrice: product.productPrice,
        productName: product.productName,
        productPictures: product.productPictures,
      },
    ];

    navigate('/checkout', {
      state: {
        products: checkoutProducts,
      },
    });
  };

  const renderStars = (productRating: number) => {
    const starArray: Array<any> = [];
    let rating = productRating;
    for (let key = 1; key <= 5; key++) {
      if (rating > 0) {
        starArray.push(<i className={'bi-star-fill ' + style.yellowStar} key={key} />);
      } else {
        starArray.push(<i className={'bi-star-fill ' + style.grayStar} key={key} />);
      }
      rating = rating - 1;
    }

    return <div>{starArray}</div>;
  };

  return (
    <section className={style.header}>
      <Link
        to={`/products/category/${product.productCategory._id}`}
        className={style.categoryPill}
      >
        <Badge pill bg="primary">
          {product.productCategory.categoryName}
        </Badge>
      </Link>
      <h1 className={style.title}>{product.productName}</h1>
      <div className={style.subtitle}>
        {renderStars(product.productRating!)}
        <div className={style.columnDivider}></div>
        <FormattedMessage
          id="ViewProductPage.totalReviews"
          values={{ count: product.totalReview }}
        />
        <div className={style.columnDivider}></div>
        <FormattedMessage
          id="ViewProductPage.totalSold"
          values={{ count: product.totalSold }}
        />
      </div>

      <section className={style.buyPanel}>
        {isBought === null ? (
          <Spinner animation="border" />
        ) : (
          <>
            <div className={style.priceRow}>
              <span>
                <FormattedMessage id="ViewProductPage.priceLabel" />
              </span>
              <span>
                <FormattedMessage
                  id="ViewProductPage.price"
                  values={{ money: product.productPrice }}
                />
              </span>
            </div>
            {isBought === true ? (
              <Link to="/purchases">
                <Button className={style.button}>
                  <FormattedMessage id="ViewProductPage.AlreadyOwned" />
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  className={style.button}
                  onClick={() => {
                    handleCheckout();
                  }}
                  disabled={isCurrentUserSeller}
                >
                  <FormattedMessage id="ViewProductPage.BuyNow" />
                </Button>
                <Button
                  className={style.button}
                  onClick={() => handleAddToCart()}
                  disabled={isCurrentUserSeller}
                  variant="outline-primary"
                >
                  <AiOutlineShoppingCart />
                  <FormattedMessage id="ViewProductPage.AddToCart" />
                </Button>
              </>
            )}
          </>
        )}
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
