import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

import { BsDownload, BsArrowRightCircle } from 'react-icons/bs';
import ReviewProduct from './ReviewProduct/ReviewProduct';

import s3API from '../../api/amazonS3';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';

import style from './PurchaseHistoryPage.module.css';
interface Props {
  key: string;
  purchase: any;
  intl: IntlShape;
}

const DAYS_TO_REFUND = 6;

const Product: React.FC<Props> = props => {
  const { purchase, intl } = props;

  const { product, shop, boughtTime } = purchase;
  const boughtTimeAsDate = new Date(boughtTime);
  const timeSinceBought = new Date().getTime() - boughtTimeAsDate.getTime();
  const daySinceBought = timeSinceBought / (1000 * 60 * 60 * 24);

  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  const notAvailableImg =
    'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101031/112815934-no-image-available-icon-flat-vector-illustration.jpg?ver=6';

  const handleDownload = () => {
    const productUrl = product.productFile;
    const afterSplit = productUrl.split('/');
    const productId = afterSplit.at(-1);

    s3API
      .downloadFile('products', true, productId, product.productName)
      .then((res: any) => {
        const { url } = res;
        window.open(url, '_blank');
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.upload[errorMsg as keyof typeof errorCodes.upload];
        toast.error(intl.formatMessage({ id: `Upload.${errorCode}` }));
      })
  }

  return (
    <div className={style.product}>
      <Link to={`/product/${product._id}`}>
        <div className={style.thumbnail}>
          <img
            src={product.productPictures || notAvailableImg}
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

          {!purchase.isInvoiceRefunded && daySinceBought < DAYS_TO_REFUND ? (
            <Dropdown.Item>
              <Link to={`/refund/${purchase.invoiceId}`}>
                <FormattedMessage id="PurchaseHistoryPage.reportButtonLabel" />
              </Link>
            </Dropdown.Item>
          ) : null}
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

export default injectIntl(Product);
