import React, { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import _, { debounce } from 'lodash';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { State } from '../../redux/store';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';
import { product } from '../../app/util/interfaces';
import noProductsImage from '../../app/assets/error-not-found.png';

import { BsPlusCircle } from 'react-icons/bs';

import shopAPI from '../../api/shop';
import productAPI from '../../api/product';

import { OneToFivePage } from '../../components';
import Product from './Product';

import style from './ManageProductsPage.module.css';

interface ProductListItem {
  isSelected: boolean;
  product: product;
}

const DEBOUNCE_TIME = 300;

let debounceTimer: any;
function Debounce(func: Function, time: number) {
  debounceTimer = clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(func, time);
}

const ManageProductsPage: React.FC<{ intl: IntlShape }> = ({ intl }) => {
  const currentUser = useSelector((state: State) => state.auth.user);
  const shopId = currentUser?.shopId;

  const [products, setProducts] = useState<ProductListItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get('name');
    if (!query) {
      shopId &&
        shopAPI
          .getAllProductsOfShop(shopId)
          .then((res: any) => {
            const manageProductItems = res.map((product: product) => ({
              isSelected: false,
              product: { ...product },
            }));
            setProducts(manageProductItems);
            setIsLoading(false);
          })
          .catch(error => {
            console.log(error);
            const errorMsg = getErrorMessage(error);
            const errorCode: any =
              errorCodes.shop[errorMsg as keyof typeof errorCodes.shop];
            toast.error(intl.formatMessage({ id: `Shop.${errorCode}` }));
          });
    } else {
      shopAPI
        .searchProduct(query)
        .then((res: any) => {
          const { products } = res;
          const manageProductItems = products.map((product: product) => ({
            isSelected: false,
            product: JSON.parse(JSON.stringify(product)),
          }));
          setProducts(manageProductItems);
          setIsLoading(false);
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          const errorCode: any =
            errorCodes.shop[errorMsg as keyof typeof errorCodes.shop];
          toast.error(intl.formatMessage({ id: `Shop.${errorCode}` }));
        });
    }
  }, [shopId, searchParams]);

  const handleSelectProduct = (id: string) => {
    const newProducts = products ? products.map(product => ({ ...product })) : null;

    const selectedProduct = _.find(newProducts, product => product.product._id === id);
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
    const prevProducts = products;
    try {
      const newProducts =
        products && products.filter(product => product.product._id !== id);
      setProducts(newProducts);
      await productAPI.deleteProduct(id);
    } catch (error) {
      console.log('Delete failed');
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

  const handleActivateProduct = async (id: string) => {
    const prevProducts = products ? JSON.parse(JSON.stringify(products)) : null;
    const newProducts = products ? JSON.parse(JSON.stringify(products)) : null;

    const selectedProduct = _.find(newProducts, product => product.product._id === id);
    if (!selectedProduct) return;
    selectedProduct.product.productStatus = 1;

    try {
      setProducts(newProducts);
      await productAPI.activateProduct(id);
    } catch (error) {
      setProducts(prevProducts);
      console.log(getErrorMessage(error));
    }
  };

  const handleDeactivateProduct = async (id: string) => {
    //Save previous Products
    const prevProducts = products && JSON.parse(JSON.stringify(products));

    //Create new Products
    const newProducts = products ? JSON.parse(JSON.stringify(products)) : null;
    //Find product need to be updated
    const selectedProduct = _.find(newProducts, product => product.product._id === id);
    //Update product
    if (!selectedProduct) return;
    selectedProduct.product.productStatus = 0;

    try {
      await productAPI.deactivateProduct(id);
      setProducts(newProducts);
    } catch (error) {
      setProducts(prevProducts);
      console.log(getErrorMessage(error));
    }
  };

  const handleSearch = (value: string) => {
    const encodedKeyword = encodeURIComponent(value);
    Debounce(() => {
      navigate(`/user/${currentUser?._id}/products?name=${encodedKeyword}`);
    }, DEBOUNCE_TIME);
  };

  return isLoading ? (
    //Loading
    <OneToFivePage>
      <div className={style.loadingWrapper}>
        <Spinner animation="border" variant="primary" />
      </div>
    </OneToFivePage>
  ) : (
    //Manage Product
    <OneToFivePage>
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
                <Form onSubmit={(e: any) => { e.preventDefault() }}>
                  <Form.Control
                    placeholder={intl.formatMessage({
                      id: 'ManageProductsPage.searchPlaceholder',
                    })}
                    onChange={e => handleSearch(e.target.value)}
                  ></Form.Control>
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
                  checked={products?.every(product => product.isSelected)}
                  onChange={e => handleSelectAll(e)}
                />
                <span>
                  <Button
                    variant={
                      products?.some(product => product.isSelected)
                        ? 'danger'
                        : 'secondary'
                    }
                    onClick={handleDeleteSelected}
                    disabled={!products?.some(product => product.isSelected)}
                  >
                    <FormattedMessage id="ManageProductsPage.deleteSelectedBtnLabel" />
                  </Button>
                </span>
              </div>
            </Row>

            {!(shopId && products && products.length > 0) ? (
              //Empty product
              <div className={style.wrapper}>
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
            ) : (
              <>
                {/* {Product list} */}
                <Row className={`mt-3 border bg-white`}>
                  {products.map(productItem => (
                    <Product
                      key={productItem.product._id!}
                      isSelected={productItem.isSelected}
                      product={productItem.product}
                      onSelectProduct={handleSelectProduct}
                      onDeleteProduct={handleDeleteProduct}
                      onActivateProduct={handleActivateProduct}
                      onDeactivateProduct={handleDeactivateProduct}
                    />
                  ))}
                </Row>
              </>
            )}
          </Container>
        </div>
      </div>
    </OneToFivePage>
  );
};

export default injectIntl(ManageProductsPage);
