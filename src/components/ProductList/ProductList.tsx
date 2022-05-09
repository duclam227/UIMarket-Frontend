import { FC } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

interface Props {
  //productList: Array<any>;
}

const ProductList: FC<Props> = props => {
  //const { productList } = props;

  //if (!productList || productList.length < 1) {
  // return null;
  //}

  const renderProduct = () => {
    //return productList.map((p: any, i: number) => {
    //const pLink = '/product/' + p._id;
    return (
      <Col xs={12} md={6} lg={3}>
        <Card>
          <Card.Img
            variant="top"
            src="https://picsum.photos/200"
            className=""
          />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text className="text-secondary">sold</Card.Text>
            <Card.Text as="h4">Price</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
    //});
  };

  const renderProductList = () => {
    return (
      <Container className="py-5">
        <Row className="justify-content-center gy-4">
          {renderProduct()}
          {renderProduct()}
          {renderProduct()}
          {renderProduct()}
          {renderProduct()}
          {renderProduct()}
          {renderProduct()}
          {renderProduct()}
          {renderProduct()}
        </Row>
      </Container>
    );
  };

  return <>{renderProductList()}</>;
};

export default ProductList;
