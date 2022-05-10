import { FunctionComponent } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import style from './ProductCard.module.css';

interface ProductCardProps {
  _id?: string;
  coverPicture: string;
  shopId: any;
  productName: string;
  productPrice: string;
  productRating: number;
}

const ProductCard: FunctionComponent<ProductCardProps> = props => {
  const {
    _id,
    coverPicture,
    shopId,
    productName,
    productPrice,
    productRating,
  } = props;

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

  const pLink = '/product/' + _id;

  return (
    <Col xs={12} md={6} lg={3}>
      <Card className={'border-0 ' + style.pcard}>
        <div>
          <a href={pLink}>
            <Card.Img
              variant="top"
              src={coverPicture}
              className={style.cardImg}
              style={{ aspectRatio: '2 / 1' }}
            />
          </a>
        </div>
        <Link className="text-dark" to={pLink}>
          <Card.Body>
            <h6>
              {productName.length > 30
                ? `${productName.substring(0, 30)}..`
                : productName}
            </h6>
            <p className="text-secondary mb-2">by {shopId.shopName}</p>
            <div className="d-flex justify-content-between ">
              {renderStars(productRating)}
              <strong>${productPrice}</strong>
            </div>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

export default ProductCard;
