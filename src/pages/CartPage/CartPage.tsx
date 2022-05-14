import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { product } from '../../app/util/interfaces';
import { PageWithNavbar } from '../../components';
import Container from 'react-bootstrap/Container';

import { getErrorMessage } from '../../app/util/index';

import styles from './CartPage.module.css';
import cartAPI from '../../api/cart/index';
import { State } from '../../redux/store';
import { useSelector } from 'react-redux';

const CartPage: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cartProducts, setProducts] = useState<Array<any>>([]);
  const currentUser = useSelector((state: State) => state.auth.user);

  const summary: any = { numOfItems: 3, totalCost: 100 };

  useEffect(() => {
    setIsLoading(true);
    cartAPI
      .getAllCartProducts()
      .then((res: any) => {
        console.log(res);
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
    const handleRemoveItem = (item: any) => {
      cartAPI
        .removeSingleProduct(item._id)
        .then((res: any) => {
          console.log(res);
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          setError(errorMsg);
        });
    };

    return cart.map((item: any, i: number) => {
      const { product } = item;
      return (
        <div
          key={i}
          className="d-flex flex-wrap flex-lg-nowrap align-items-stretch py-4 border-bottom border-1 mb-4"
        >
          <a className={styles.productimg} href="#">
            <img src="https://picsum.photos/500/600" alt=".." />
          </a>
          <div
            className={'mw-50 text-truncate m-2 flex-fill'}
            style={{ maxWidth: '60%' }}
          >
            {product.productName}
          </div>
          <div className="flex-fill">
            <div className="text-end m-2">
              <strong>${product.productPrice}</strong>
            </div>
            <div className="text-end">
              <a
                className="text-primary m-2"
                href=""
                onClick={() => handleRemoveItem(product)}
              >
                Remove
              </a>
            </div>
          </div>
        </div>
      );
    });
  };

  const totalPrice = (cart: any) => {
    let price = 0;
    for (let i = 0; i < cart.length; i++) {
      price += cart[i].product.productPrice;
    }
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
