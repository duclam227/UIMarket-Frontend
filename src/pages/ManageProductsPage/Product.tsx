import React from 'react';
import { Link } from 'react-router-dom';

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
}

const Product: React.FC<Props> = props => {
  const notAvailableImg =
    'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101031/112815934-no-image-available-icon-flat-vector-illustration.jpg?ver=6';

  const { product, isSelected, onSelectProduct, onDeleteProduct } = props;

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
        <Col lg={2} className={`d-flex align-items-center border-bottom `}>
          ${product.productPrice}
        </Col>
        {/* Settings dropdown menu */}
        <Col
          lg={2}
          className={`d-flex align-items-center border-bottom  justify-content-around`}
        >
          <span
            className={`border d-flex align-items-center ${style.statusBadge} ${
              product.productStatus ? style.active : style.inactive
            }`}
          >
            {product.productStatus ? 'Active' : 'Inactive'}
          </span>
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
                    Edit
                  </Link>
                </li>
                <li>
                  <Link to={`#`} className="dropdown-item">
                    Hide
                  </Link>
                </li>
                <li>
                  <span
                    onClick={() => onDeleteProduct(product._id)}
                    className="dropdown-item text-danger"
                  >
                    Delete
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
            <p className={``}>LAST 30 DAYS</p>
          </Row>
          <Row>
            <Col className={`d-flex flex-column`}>
              <span className={`text-muted`}>0</span>
              <span className={`text-muted`}>views</span>
            </Col>
            <Col className={`d-flex flex-column`}>
              <span className={`text-muted`}>0</span>
              <span className={`text-muted`}>sale</span>
            </Col>
          </Row>
        </Col>
        {/* All time */}
        <Col lg={{ span: 3 }}>
          <Row>
            <p className={``}>ALL TIME</p>
          </Row>
          <Row>
            <Col className={`d-flex flex-column`}>
              <span className={`text-muted`}>{product.totalSold}</span>
              <span className={`text-muted`}>sale</span>
            </Col>
            <Col className={`d-flex flex-column`}>
              <span className={`text-muted`}>
                ${product.totalSold * product.productPrice}
              </span>
              <span className={`text-muted`}>revenue</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
