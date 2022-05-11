import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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

import { BsPlusCircle, BsGearFill, BsCaretDownFill } from 'react-icons/bs';

import shopAPI from '../../api/shop';

import { OneToFivePage } from '../../components';
import Product from './Product';

import style from './ManageProductsPage.module.css';

const ManageProductsPage: React.FC = () => {
  const oneToOnePlaceholderImg =
    'https://kccnma.github.io/sitebase/examples/productsite/img/placeholder-1x1.gif';

  const currentUser = useSelector((state: State) => state.auth.user);
  const shopId = currentUser?.shopId;

  const [products, setProducts] = useState<Array<product> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    shopId &&
      shopAPI
        .getAllProductsOfShop(shopId)
        .then((res: any) => {
          console.log(res);
          setProducts(res.products);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
  }, [shopId]);

  return isLoading ? (
    <OneToFivePage>
      <div className={style.loadingWrapper}>
        <Spinner animation="border" variant="primary" />
      </div>
    </OneToFivePage>
  ) : (
    <OneToFivePage>
      {/* <div className={style.wrapper}>
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
            
            {!!(shopId && products && products.length > 0) ? (
              <div className={style.productList}>
                {products.map((product: product) => (
                  <Product product={product} />
                ))}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div> */}
      {!(shopId && products && products.length > 0) ? (
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
        //    <div className={style.productList}>
        //    {products.map((product: product) => (
        //      <Product product={product} />
        //    ))}
        //  </div>

        <div className={style.wrapperK}>
          <div className={style.contentK}>
            <Container className={`p-0`}>
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
                <Col lg={3}>
                  <Link to="/products/add" className={style.addProductButton}>
                    <Button className="d-flex justify-content-center align-items-center">
                      <BsPlusCircle className="me-2" />
                      <FormattedMessage id="ManageProductsPage.addProductButton" />
                    </Button>
                  </Link>
                </Col>
              </Row>
              <Form>
                {/* Control panel */}
                <Row className={`mt-4`}>
                  <div
                    className={`border bg-white px-4 py-2 d-flex align-items-center ${style.controlPanelContainer}`}
                  >
                    <Form.Check inline type="checkbox" className={`me-5`} />
                    <span>
                      <Button variant="danger">Delete selected</Button>
                    </span>
                  </div>
                </Row>

                {/* {Product list} */}
                <Row className={`mt-3`}>
                  <div
                    className={`border bg-white px-4 pt-1 pb-3 ${style.controlPanelContainer}`}
                  >
                    <Row className={`pe-4`}>
                      <Col lg={1} className={`d-flex align-items-center`}>
                        <Form.Check inline type="checkbox" className={`me-5`} />
                      </Col>
                      <Col lg={2} className={`d-flex align-items-center my-3`}>
                        <img
                          src={oneToOnePlaceholderImg}
                          height={100}
                          alt="Placeholder"
                        />
                      </Col>
                      <Col
                        lg={5}
                        className={`d-flex align-items-center border-bottom `}
                      >
                        <span className={`fw-bold`}>
                          The Ultimate Guide to Designing, Prototyping and Mass
                          Manufacturing your Product Idea...
                        </span>
                      </Col>
                      <Col
                        lg={2}
                        className={`d-flex align-items-center border-bottom `}
                      >
                        $99.99
                      </Col>
                      <Col
                        lg={2}
                        className={`d-flex align-items-center border-bottom  justify-content-around`}
                      >
                        <span className={`border ${style.statusBadgeActive}`}>
                          Active
                        </span>
                        <div>
                          <BsGearFill style={{ color: '#5c5c5c' }} />
                          <BsCaretDownFill style={{ color: '#5c5c5c' }} />
                        </div>
                      </Col>
                    </Row>

                    <Row className={`mt-4`}>
                      <Col lg={{ offset: 3, span: 3 }}>
                        <Row>
                          <p className={``}>LAST 30 DAYS</p>
                        </Row>
                        <Row>
                          <Col className={`d-flex flex-column`}>
                            <span className={`text-muted`}>0</span>
                            <span className={`text-muted`}>views</span>
                          </Col>
                          <Col className={`d-flex flex-column`}>
                            <span className={`text-muted`}>0</span>
                            <span className={`text-muted`}>sale</span>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={{ span: 3 }}>
                        <Row>
                          <p className={``}>ALL TIME</p>
                        </Row>
                        <Row>
                          <Col className={`d-flex flex-column`}>
                            <span className={`text-muted`}>0</span>
                            <span className={`text-muted`}>sale</span>
                          </Col>
                          <Col className={`d-flex flex-column`}>
                            <span className={`text-muted`}>$0.00</span>
                            <span className={`text-muted`}>revenue</span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Row>

                <Row className={``}>
                  <div
                    className={`border border-top-0 bg-white px-4 pt-1 pb-3 ${style.controlPanelContainer}`}
                  >
                    <Row className={`pe-4`}>
                      <Col lg={1} className={`d-flex align-items-center`}>
                        <Form.Check inline type="checkbox" className={`me-5`} />
                      </Col>
                      <Col lg={2} className={`d-flex align-items-center my-3`}>
                        <img
                          src={oneToOnePlaceholderImg}
                          height={100}
                          alt="Placeholder"
                        />
                      </Col>
                      <Col
                        lg={5}
                        className={`d-flex align-items-center border-bottom `}
                      >
                        <span className={`fw-bold`}>
                          The Ultimate Guide to Designing, Prototyping and Mass
                          Manufacturing your Product Idea...
                        </span>
                      </Col>
                      <Col
                        lg={2}
                        className={`d-flex align-items-center border-bottom `}
                      >
                        $99.99
                      </Col>
                      <Col
                        lg={2}
                        className={`d-flex align-items-center border-bottom  justify-content-around`}
                      >
                        <span className={`border ${style.statusBadgeActive}`}>
                          Active
                        </span>
                        <div>
                          <BsGearFill style={{ color: '#5c5c5c' }} />
                          <BsCaretDownFill style={{ color: '#5c5c5c' }} />
                        </div>
                      </Col>
                    </Row>

                    <Row className={`mt-4`}>
                      <Col lg={{ offset: 3, span: 3 }}>
                        <Row>
                          <p className={``}>LAST 30 DAYS</p>
                        </Row>
                        <Row>
                          <Col className={`d-flex flex-column`}>
                            <span className={`text-muted`}>0</span>
                            <span className={`text-muted`}>views</span>
                          </Col>
                          <Col className={`d-flex flex-column`}>
                            <span className={`text-muted`}>0</span>
                            <span className={`text-muted`}>sale</span>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={{ span: 3 }}>
                        <Row>
                          <p className={``}>ALL TIME</p>
                        </Row>
                        <Row>
                          <Col className={`d-flex flex-column`}>
                            <span className={`text-muted`}>0</span>
                            <span className={`text-muted`}>sale</span>
                          </Col>
                          <Col className={`d-flex flex-column`}>
                            <span className={`text-muted`}>$0.00</span>
                            <span className={`text-muted`}>revenue</span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Row>
              </Form>
            </Container>
          </div>
        </div>
      )}
    </OneToFivePage>
  );
};

export default ManageProductsPage;
