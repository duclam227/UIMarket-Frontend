import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { State } from "../../redux/store";
import { product } from "../../app/util/interfaces";
import noProductsImage from '../../app/assets/error-not-found.png';

import shopAPI from "../../api/shop";

import { OneToFivePage } from "../../components";

import style from './ManageProductsPage.module.css';
import Product from "./Product";

const ManageProductsPage: React.FC = () => {
  const currentUser = useSelector((state: State) => state.auth.user);
  const shopId = currentUser?.shopId;

  const [products, setProducts] = useState<Array<product> | null>(null);

  useEffect(() => {
    shopId && shopAPI.getAllProductsOfShop(shopId)
      .then((res: any) => {
        setProducts(res.products);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return !shopId ? (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.content}>
          later
        </div>
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
            !!(shopId && products)
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