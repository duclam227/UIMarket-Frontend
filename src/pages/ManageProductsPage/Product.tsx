import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BsGearFill, BsCaretDownFill } from 'react-icons/bs';

import { product } from '../../app/util/interfaces';

import style from './ManageProductsPage.module.css';

interface Props {
  key: string;
  isSelected: boolean;
  product: product;
  onSelectProduct: Function;
  onDeleteProduct: Function;
  onDeactivateProduct: Function;
  onActivateProduct: Function;
}

const Product: React.FC<Props> = props => {
  const activeBadgeLabel = (
    <FormattedMessage id="ManageProductsPage.Product.activeBadgeLabel" />
  );
  const inactiveBadgeLabel = (
    <FormattedMessage id="ManageProductsPage.Product.inactiveBadgeLabel" />
  );
  const editMenuItemLabel = (
    <FormattedMessage id="ManageProductsPage.Product.editMenuItemLabel" />
  );
  const hideMenuItemLabel = (
    <FormattedMessage id="ManageProductsPage.Product.hideMenuItemLabel" />
  );
  const unHideMenuItemLabel = (
    <FormattedMessage id="ManageProductsPage.Product.unHideMenuItemLabel" />
  );
  const deleteMenuItemLabel = (
    <FormattedMessage id="ManageProductsPage.Product.deleteMenuItemLabel" />
  );
  const last30DaysLabel = (
    <FormattedMessage id="ManageProductsPage.Product.last30DaysLabel" />
  );
  const allTimeLabel = (
    <FormattedMessage id="ManageProductsPage.Product.allTimeLabel" />
  );
  const viewsLabel = (
    <FormattedMessage id="ManageProductsPage.Product.viewsLabel" />
  );
  const saleLabel = (
    <FormattedMessage id="ManageProductsPage.Product.saleLabel" />
  );
  const revenueLabel = (
    <FormattedMessage id="ManageProductsPage.Product.revenueLabel" />
  );

  const notAvailableImg =
    'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101031/112815934-no-image-available-icon-flat-vector-illustration.jpg?ver=6';

  const {
    product,
    isSelected,
    onSelectProduct,
    onDeleteProduct,
    onDeactivateProduct,
    onActivateProduct,
  } = props;

  useEffect(() => {
  });

  return (
    <div className={`px-4 pt-1 pb-3 ${style.productWrapper}`}>
      {/* Product description and status */}
      <Row className={`pe-4`}>
        {/* Checkbox */}
        <Col lg={1} className={`d-flex align-items-center`}>
          <Form.Check
            inline
            type="checkbox"
            className={`me-5`}
            checked={isSelected}
            onChange={() => onSelectProduct(product._id)}
          />
        </Col>
        {/* Product thumbnail */}
        <Col lg={2} className={`d-flex align-items-center my-3`}>
          <div className={`${style.productThumbnailWrapper}`}>
            <img
              src={
                product.productPictures
                  ? product.productPictures[0]
                  : notAvailableImg
              }
              className={`${style.productThumbnail}`}
              height={100}
              alt="Placeholder"
            />
          </div>
        </Col>
        {/* Product name */}
        <Col lg={5} className={`d-flex align-items-center border-bottom `}>
          <Link to={`/product/${product._id}`} className={style.productInList}>
            <span className={`fw-bold text-dark ${style.productName}`}>
              {product.productName}
            </span>
          </Link>
        </Col>
        {/* Product price */}
        <Col lg={1} className={`d-flex align-items-center border-bottom `}>
          ${product.productPrice}
        </Col>
        <Col
          lg={3}
          className={`d-flex align-items-center border-bottom  justify-content-around`}
        >
          {/* {Product status} */}
          <span
            className={`border d-flex align-items-center ${style.statusBadge} ${
              product.productStatus ? style.active : style.inactive
            }`}
          >
            {product.productStatus ? activeBadgeLabel : inactiveBadgeLabel}
          </span>
          {/* Settings dropdown menu */}

          <div>
            <div className="dropdown">
              <div
                id="settingsMenuDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BsGearFill style={{ color: '#5c5c5c' }} />
                <BsCaretDownFill style={{ color: '#5c5c5c' }} />
              </div>
              <ul
                className="dropdown-menu position-absolute mt-1"
                aria-labelledby="settingsMenuDropdown"
              >
                <li>
                  <Link to={`#`} className="dropdown-item">
                    {editMenuItemLabel}
                  </Link>
                </li>
                <li>
                  {product.productStatus ? (
                    <span
                      onClick={() => onDeactivateProduct(product._id)}
                      className="dropdown-item"
                    >
                      {hideMenuItemLabel}
                    </span>
                  ) : (
                    <span
                      onClick={() => onActivateProduct(product._id)}
                      className="dropdown-item"
                    >
                      {unHideMenuItemLabel}
                    </span>
                  )}
                </li>
                <li>
                  <span
                    onClick={() => onDeleteProduct(product._id)}
                    className="dropdown-item text-danger"
                  >
                    {deleteMenuItemLabel}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>

      {/* Product statistics */}
      <Row className={`mt-4`}>
        {/* Last 30 days */}
        <Col lg={{ offset: 3, span: 3 }}>
          <Row>
            <p className={``}>{last30DaysLabel}</p>
          </Row>
          <Row>
            <Col className={`d-flex flex-column`}>
              <span className={`text-muted`}>0</span>
              <span className={`text-muted`}>{viewsLabel}</span>
            </Col>
            <Col className={`d-flex flex-column`}>
              <span className={`text-muted`}>0</span>
              <span className={`text-muted`}>{saleLabel}</span>
            </Col>
          </Row>
        </Col>
        {/* All time */}
        <Col lg={{ span: 3 }}>
          <Row>
            <p className={``}>{allTimeLabel}</p>
          </Row>
          <Row>
            <Col className={`d-flex flex-column`}>
              <span className={`text-muted`}>{product.totalSold}</span>
              <span className={`text-muted`}>{saleLabel}</span>
            </Col>
            <Col className={`d-flex flex-column`}>
              <span className={`text-muted`}>
                ${product.totalSold * product.productPrice}
              </span>
              <span className={`text-muted`}>{revenueLabel}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
