import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { product } from '../../app/util/interfaces';

import style from './RequestRefundPage.module.css';

interface IProps {
  product: product;
  handleToggleProduct: Function;
}

const Product: FC<IProps> = props => {
  const { product } = props;

  const notAvailableImg =
    'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101031/112815934-no-image-available-icon-flat-vector-illustration.jpg?ver=6';

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
        </Link>
      </div>

      <Form.Check
        inline
        type="checkbox"
        className={`me-5`}
        onChange={() => props.handleToggleProduct(product.license)}
      />

    </div>
  )
};

export default Product;