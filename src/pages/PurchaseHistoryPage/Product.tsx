import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

import { BsDownload, BsArrowRightCircle } from 'react-icons/bs';
import ReviewProduct from './ReviewProduct/ReviewProduct';

import style from './PurchaseHistoryPage.module.css';
import s3API from '../../api/amazonS3';

interface Props {
  key: string;
  purchase: any;
}

const Product: React.FC<Props> = props => {
  const { purchase } = props;

  const { product, shop } = purchase;

  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  const notAvailableImg =
    'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101031/112815934-no-image-available-icon-flat-vector-illustration.jpg?ver=6';

  const handleDownload = () => {
    const productUrl = product.productFile;
    const afterSplit = productUrl.split('/');
    const productId = afterSplit.at(-1);

    s3API.downloadFile('products', true, productId, product.productName)
      .then((res: any) => {
        const { url } = res;
        window.open(url, '_blank');
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className={style.product}>
      <Link to={`/product/${product._id}`}>
        <div className={style.thumbnail}>
          <img
            src={product.productPictures[0] || notAvailableImg}
            className={`${style.productThumbnail}`}
            alt="Placeholder"
          />
        </div>
      </Link>
      <div className={style.productInfo}>
        <Link to={`/product/${product._id}`}>
          <div className={style.productName}>{product.productName}</div>
        </Link>
        <Link to={`/shop/${shop._id}`}>
          <div className={style.shopInfo}>
            <FormattedMessage
              id="PurchaseHistoryPage.shopInfo"
              values={{
                shopName: shop.shopName,
                b: (word: string) => <b>{word}</b>,
              }}
            />
          </div>
        </Link>
      </div>
      <Link to={`/purchases/${purchase._id}`}>
        <div className={style.downloadButton}>
          <FormattedMessage id="PurchaseHistoryPage.viewLicenseLabel" />
          <BsArrowRightCircle />
        </div>
      </Link>

      <Dropdown as={ButtonGroup}>
        <Button className={style.downloadButton} onClick={handleDownload}>
          <FormattedMessage id="PurchaseHistoryPage.downloadButtonLabel" />
          <BsDownload />
        </Button>

        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

        <Dropdown.Menu className={style.dropdown}>
          {!purchase.isReview ? (
            <>
              <Dropdown.Item onClick={() => setIsReviewing(true)}>
                <FormattedMessage id="PurchaseHistoryPage.reviewButtonLabel" />
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          ) : null}

          <Dropdown.Item>
            <Link to={`/refund/${purchase.invoiceId}`}>
              <FormattedMessage id="PurchaseHistoryPage.reportButtonLabel" />
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {isReviewing ? (
        <ReviewProduct
          productInfo={{
            invoiceId: purchase.invoiceId,
            productId: product._id,
            productName: product.productName,
          }}
          handleClose={() => setIsReviewing(false)}
        />
      ) : null}
    </div>
  );
};

export default Product;
