import { FC } from 'react';
import { Container, Row } from 'react-bootstrap';
import { product } from '../../app/util/interfaces';
import 'bootstrap-icons/font/bootstrap-icons.css';

import ProductCard from '../common/ProductCard/ProductCard';
interface Props {
  productList: Array<product> | null;
}

const ProductList: FC<Props> = props => {
  const { productList } = props;

  if (!productList || productList.length < 1) {
    return null;
  }

  const renderProduct = () => {
    return productList.map((p: any, i: number) => {
      return <ProductCard key={i} product={p}></ProductCard>;
    });
  };

  const renderProductList = () => {
    return (
      <Container fluid="lg" className="py-5">
        <Row className="justify-content-center gy-4">{renderProduct()}</Row>
      </Container>
    );
  };

  return <>{renderProductList()}</>;
};

export default ProductList;
