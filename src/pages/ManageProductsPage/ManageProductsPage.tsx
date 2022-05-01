import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { State } from "../../redux/store";
import { product } from "../../app/util/interfaces";
import noProductsImage from '../../app/assets/error-not-found.png';

import shopAPI from "../../api/shop";

import { OneToFivePage } from "../../components";
import Product from "./Product";

import style from './ManageProductsPage.module.css';

const ManageProductsPage: React.FC = () => {
  const currentUser = useSelector((state: State) => state.auth.user);
  const shopId = currentUser?.shopId;

  const [products, setProducts] = useState<Array<product> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    shopId && shopAPI.getAllProductsOfShop(shopId)
      .then((res: any) => {
        setProducts(res.products);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return isLoading ? (
    <OneToFivePage>
      <div className={style.loadingWrapper}>
        <Spinner animation="border" variant="primary" />
      </div>
    </OneToFivePage>
  ) : (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.header}>
            <div>
              <h3 className={style.title}>
                <FormattedMessage id='ManageProductsPage.manageProductsTitle' />
              </h3>
              <h6>
                <FormattedMessage id='ManageProductsPage.manageProductsSubtitle' />
              </h6>
            </div>
            <Link to='/products/add' className={style.addProductButton}>
              <Button>
                <FormattedMessage id='ManageProductsPage.addProductButton' />
              </Button>
            </Link>
          </div>
          {
            !!(shopId && products && products.length > 0)
              ? <div className={style.productList}>
                {products.map((product: product) => <Product product={product} />)}
              </div>
              : <>
                <div className={style.noProductsImage}>
                  <img src={noProductsImage} alt="A picture telling there are no products" />
                </div>
                <h4 className={style.title}>
                  <FormattedMessage id='ManageProductsPage.noProductsTitle' />
                </h4>
                <h6>
                  <FormattedMessage id='ManageProductsPage.noProductsSubtitle' />
                </h6>
              </>
          }

        </div>
      </div>
    </OneToFivePage>
  )
}

export default ManageProductsPage;