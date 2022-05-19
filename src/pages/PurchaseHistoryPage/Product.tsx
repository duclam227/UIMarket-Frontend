import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BsDownload, BsArrowRightCircle } from 'react-icons/bs';

import { product } from '../../app/util/interfaces';

import style from './PurchaseHistoryPage.module.css';

interface Props {
  key: string;
  product: product;
}

const Product: React.FC<Props> = props => {
  const {
    product,
  } = props;

  const notAvailableImg =
    'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101031/112815934-no-image-available-icon-flat-vector-illustration.jpg?ver=6';

  const handleDownload = () => {
    window.open(product.productFile, '_blank');
  }

  return (
    <div className={style.product}>
      <Link to={`/product/${product._id}`}>
        <div className={style.thumbnail}>
          <img
            src={product.coverPicture || notAvailableImg}
            className={`${style.productThumbnail}`}
            alt="Placeholder"
          />
        </div>
      </Link>
      <div className={style.productInfo}>
        <Link to={`/product/${product._id}`}>
          <div className={style.productName}>{product.productName}</div>
        </Link >
        <Link to={`/shop/${product.shop._id}`}>
          <div className={style.shopInfo}>
            <FormattedMessage
              id='PurchaseHistoryPage.shopInfo'
              values={{
                shopName: product.shop.shopName,
                b: (word: string) => <b>{word}</b>,
              }}
            />
          </div>
        </Link>
      </div>
      <Link to={`/license/`}>
        <div className={style.downloadButton}>
          <FormattedMessage id='PurchaseHistoryPage.viewLicenseLabel' />
          <BsArrowRightCircle />
        </div>
      </Link>

      <Dropdown as={ButtonGroup}>
        <Button className={style.downloadButton} onClick={handleDownload}>
          <FormattedMessage id='PurchaseHistoryPage.downloadButtonLabel' />
          <BsDownload />
        </Button>

        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item>
            <FormattedMessage id='PurchaseHistoryPage.reviewButtonLabel' />
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <FormattedMessage id='PurchaseHistoryPage.downloadLicenseLabel' />
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <FormattedMessage id='PurchaseHistoryPage.reportButtonLabel' />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div >
  );
};

export default Product;
