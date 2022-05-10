import { FC } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { product } from '../../app/util/interfaces';
import 'bootstrap-icons/font/bootstrap-icons.css';

import style from './ProductList.module.css';
interface Props {
  productList: Array<product> | null;
}

const ProductList: FC<Props> = props => {
  const { productList } = props;

  if (!productList || productList.length < 1) {
    return null;
  }

  const renderStars = (productRating: number) => {
    const starArray: Array<any> = [];
    let rating = productRating;
    for (let key = 1; key <= 5; key++) {
      if (rating > 0) {
        starArray.push(
          <i className="bi-star-fill text-warning m-1" key={key} />,
        );
      } else {
        starArray.push(
          <i className="bi-star-fill text-secondary m-1" key={key} />,
        );
      }
      rating = rating - 1;
    }

    return <div>{starArray}</div>;
  };

  const renderProduct = () => {
    return productList.map((p: any, i: number) => {
      const pLink = '/products/' + p._id;
      return (
        <Col key={p._id} xs={12} md={6} lg={3}>
          <Card className="h-100 border-0 bg-transparent p-0">
            <div className="shadow-sm">
              <Card.Img
                variant="top"
                src={p.coverPicture}
                className={style.cardImg}
                style={{ aspectRatio: '2 / 1' }}
              />
            </div>
            <Card.Body className="px-0 pb-2">
              <Card.Title>
                <h6>{p.productName}</h6>
              </Card.Title>
              <Card.Text className="text-secondary">
                by {p.shopId.shopName}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="border-0 bg-transparent p-0">
              <div className="d-flex justify-content-between ">
                {renderStars(p.productRating)}
                <strong>${p.productPrice}</strong>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      );
    });
  };

  const renderProductList = () => {
    return (
      <Container fluid="lg" className="py-5">
        <Row className="justify-content-center gy-5">{renderProduct()}</Row>
      </Container>
    );
  };

  return <>{renderProductList()}</>;
};

export default ProductList;
