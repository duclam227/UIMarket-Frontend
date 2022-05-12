import React, { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { State } from '../../redux/store';
import { product } from '../../app/util/interfaces';
import noProductsImage from '../../app/assets/error-not-found.png';

import { BsPlusCircle } from 'react-icons/bs';

import shopAPI from '../../api/shop';

import { OneToFivePage } from '../../components';
import Product from './Product';

import style from './ManageProductsPage.module.css';
import productAPI from '../../api/product';
import { getErrorMessage } from '../../app/util';

interface ProductListItem {
  isSelected: boolean;
  product: product;
}

const ManageProductsPage: React.FC = () => {
  const oneToOnePlaceholderImg =
    'https://kccnma.github.io/sitebase/examples/productsite/img/placeholder-1x1.gif';

  const currentUser = useSelector((state: State) => state.auth.user);
  const shopId = currentUser?.shopId;

  const [products, setProducts] = useState<ProductListItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    shopId &&
      shopAPI
        .getAllProductsOfShop(shopId)
        .then((res: any) => {
          console.log(res);
          const { products } = res;
          const manageProductItems = products.map((product: product) => ({
            isSelected: false,
            product: { ...product },
          }));
          setProducts(manageProductItems);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
  }, [shopId]);

  const handleSelectProduct = (id: string) => {
    const newProducts = products
      ? products.map(product => ({ ...product }))
      : null;

    const selectedProduct = _.find(
      newProducts,
      product => product.product._id === id,
    );
    if (!selectedProduct) return;
    selectedProduct.isSelected = selectedProduct.isSelected ? false : true;

    setProducts(newProducts);
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const newProducts = products
      ? products.map(product => ({
          ...product,
          isSelected: checked,
        }))
      : null;
    setProducts(newProducts);
  };

  const handleDeleteProduct = async (id: string) => {
    const prevProducts = products && products.map(product => ({ ...product }));
    try {
      const newProducts =
        products && products.filter(product => product.product._id !== id);
      setProducts(newProducts);
      await productAPI.deleteProduct(id);
    } catch (error) {
      console.log(getErrorMessage(error));
      setProducts(prevProducts);
    }
  };

  const handleDeleteSelected = () => {
    if (!products) return;
    products.forEach(product => {
      if (product.isSelected) handleDeleteProduct(product.product._id!);
    });
  };
  return isLoading ? (
    //Loading
    <OneToFivePage>
      <div className={style.loadingWrapper}>
        <Spinner animation="border" variant="primary" />
      </div>
    </OneToFivePage>
  ) : (
    <OneToFivePage>
      {!(shopId && products && products.length > 0) ? (
        //Empty product
        <div className={style.wrapper}>
          <div className={style.content}>
            <div className={style.header}>
              <div>
                <h3 className={style.title}>
                  <FormattedMessage id="ManageProductsPage.manageProductsTitle" />
                </h3>
                <h6>
                  <FormattedMessage id="ManageProductsPage.manageProductsSubtitle" />
                </h6>
              </div>
              <Link to="/products/add" className={style.addProductButton}>
                <Button className="d-flex justify-content-center align-items-center">
                  <BsPlusCircle className="me-2" />
                  <FormattedMessage id="ManageProductsPage.addProductButton" />
                </Button>
              </Link>
            </div>
            <div className={style.noProductsImage}>
              <img
                src={noProductsImage}
                alt="A picture telling there are no products"
              />
            </div>
            <h4 className={style.title}>
              <FormattedMessage id="ManageProductsPage.noProductsTitle" />
            </h4>
            <h6>
              <FormattedMessage id="ManageProductsPage.noProductsSubtitle" />
            </h6>
          </div>
        </div>
      ) : (
        //Manage Product
        <div className={style.wrapperK}>
          <div className={style.contentK}>
            <Container className={`p-0`}>
              {/* Header */}
              <Row className={`bg-white p-4 border ${style.headerK}`}>
                <Col lg={6}>
                  <div>
                    <h2 className={style.title}>
                      <FormattedMessage id="ManageProductsPage.manageProductsTitle" />
                    </h2>
                    <h5 className="text-muted">
                      <FormattedMessage id="ManageProductsPage.manageProductsSubtitle" />
                    </h5>
                  </div>
                </Col>
                <Col lg={3}>
                  <Form>
                    <Form.Control placeholder="Search by title or ID..."></Form.Control>
                  </Form>
                </Col>
                <Col lg={3} className={`d-flex justify-content-end`}>
                  <Link to="/products/add" className={style.addProductButton}>
                    <Button className="d-flex justify-content-center align-items-center">
                      <BsPlusCircle className="me-2" />
                      <FormattedMessage id="ManageProductsPage.addProductButton" />
                    </Button>
                  </Link>
                </Col>
              </Row>

              {/* Control panel */}
              <Row className={`mt-4`}>
                <div
                  className={`border bg-white px-4 py-2 d-flex align-items-center ${style.controlPanelContainer}`}
                >
                  <Form.Check
                    inline
                    type="checkbox"
                    className={`me-5`}
                    checked={products.every(product => product.isSelected)}
                    onChange={e => handleSelectAll(e)}
                  />
                  <span>
                    <Button variant="danger" onClick={handleDeleteSelected}>
                      Delete selected
                    </Button>
                  </span>
                </div>
              </Row>

              {/* {Product list} */}
              <Row className={`mt-3 border bg-white`}>
                {products.map(productItem => (
                  <Product
                    key={productItem.product._id!}
                    isSelected={productItem.isSelected}
                    product={productItem.product}
                    onSelectProduct={handleSelectProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </Row>
            </Container>
          </div>
        </div>
      )}
    </OneToFivePage>
  );
};

export default ManageProductsPage;
