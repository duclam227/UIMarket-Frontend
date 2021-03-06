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
      <div className="py-3">
        <Row className="gy-3">{renderProduct()}</Row>
      </div>
    );
  };

  return <>{renderProductList()}</>;
};

export default ProductList;
