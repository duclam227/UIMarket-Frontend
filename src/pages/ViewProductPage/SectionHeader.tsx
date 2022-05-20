import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
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
        console.log(res);
        //handle finish
        toast.success(
          intl.formatMessage({ id: 'ViewProductPage.AddToCartSuccessMessage' }),
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <section className={style.header}>
      <h1 className={style.title}>{product.productName}</h1>
      <div className={style.buttonRow}>
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
      </div>

      <ToastContainer />
    </section>
  );
};

export default injectIntl(SectionHeader);
