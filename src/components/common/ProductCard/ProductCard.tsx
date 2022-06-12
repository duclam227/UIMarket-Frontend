import { FunctionComponent } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import style from './ProductCard.module.css';

interface Product {
  _id?: string;
  coverPicture: string;
  shopId: any;
  productName: string;
  productPrice: string;
  productRating: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FunctionComponent<ProductCardProps> = props => {
  const { product } = props;

  const { _id, coverPicture, shopId, productName, productPrice, productRating } = product;
  const navigate = useNavigate();

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

  const pLink = '/product/' + _id;
  const shopLink = '/shop/' + shopId._id;

  const navigateToProduct = () => {
    navigate(pLink);
  }

  const navigateToShop = (e: any) => {
    navigate(shopLink);
    e.stopPropagation();
  }

  return (
    <Col xs={12} md={6} lg={3}>
      <Card className={'border-0 ' + style.pcard} onClick={navigateToProduct}>
        <div>
          <Card.Img
            variant="top"
            src={coverPicture}
            className={style.cardImg}
            style={{ aspectRatio: '2 / 1' }}
          />
        </div>

        <Card.Body>
          <h6>
            {productName.length > 30
              ? `${productName.substring(0, 30)}..`
              : productName}
          </h6>

          <div className="mb-3 text-secondary">
            by
            <span className={'ms-1 ' + style.secondaryLink} onClick={(e: any) => navigateToShop(e)}>
              {shopId.shopName}
            </span>
          </div>

          <div className="d-flex justify-content-between ">
            {renderStars(productRating)}
            <strong>${productPrice}</strong>
          </div>

        </Card.Body>
      </Card>
    </Col >
  );
};

export default ProductCard;
