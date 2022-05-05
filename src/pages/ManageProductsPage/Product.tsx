import React from "react";
import { Link } from "react-router-dom";

import { product } from "../../app/util/interfaces";

import style from './ManageProductsPage.module.css';

interface Props {
  product: product;
}

const Product: React.FC<Props> = (props) => {
  const { product } = props;

  return <Link to={`/product/${product._id}`} className={style.productInList}>
    {product.productName}
  </Link>
}

export default Product;