import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { PageWithNavbar } from '../../components';
import Container from 'react-bootstrap/Container';

import { getErrorMessage } from '../../app/util/index';

import styles from './CartPage.module.css';
import cartAPI from '../../api/cart/index';

const CartPage: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cartProducts, setProducts] = useState<Array<any>>([]);

  useEffect(() => {
    setIsLoading(true);
    cartAPI
      .getAllCartProducts()
      .then((res: any) => {
        const { cart } = res;
        setProducts(cart);
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      });
  }, []);

  const renderItems = (cart: Array<any>) => {
    const handleRemoveItem = (removedItem: any) => {
      cartAPI
        .removeSingleProduct(removedItem._id)
        .then((res: any) => {
          const newList = cartProducts.filter(item => {
            return item.product._id !== removedItem._id;
          });
          setProducts(newList);
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          setError(errorMsg);
        });
    };

    return cart.map((item: any) => {
      const { product } = item;
      const pLink = `./product/${product._id}`;
      return (
        <div
          key={product._id}
          className="d-flex flex-wrap flex-lg-nowrap align-items-stretch py-4 border-bottom border-1 mb-4"
        >
          <a className={styles.productimg} href={pLink}>
            <img src={product.productPictures[0]} alt=".." />
          </a>
          <div className={'text-truncate m-2 flex-fill ' + styles.productTitle}>
            {product.productName}
          </div>
          <div className="flex-fill">
            <div className="text-end m-2">
              <strong>${product.productPrice}</strong>
            </div>
            <div className="text-end">
              <button
                className="btn btn-link text-decoration-none"
                onClick={() => handleRemoveItem(product)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const totalPrice = (cart: any) => {
    let price = 0;

    price = cart.reduce(
      (previousValue: any, currentValue: any) =>
        previousValue + currentValue.product.productPrice,
      price,
    );
    return price;
  };

  const renderSummary = (cart: any) => {
    return (
      <div className="d-flex flex-column p-4 bg-white border rounded">
        <h4 className="m-2">Summary</h4>
        <div className="d-flex justify-content-between m-2">
          <span>{cart.length} items</span>
          <strong>{totalPrice(cart)}$</strong>
        </div>
        <Button className="m-2">Checkout with PayPal</Button>
      </div>
    );
  };

  return (
    <PageWithNavbar>
      <Container>
        <h1 className="my-4">My Cart</h1>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <Row>
            <Col className={styles.cartpage_productlist} lg="7">
              {renderItems(cartProducts)}
            </Col>
            <Col lg="1"></Col>
            <Col lg="4">{renderSummary(cartProducts)}</Col>
          </Row>
        )}
      </Container>
    </PageWithNavbar>
  );
};

export default CartPage;
