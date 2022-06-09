import { FunctionComponent, useEffect, useState } from 'react';
import { Spinner, Button, Col, Row, Form } from 'react-bootstrap';
import { PageWithNavbar } from '../../components';
import Container from 'react-bootstrap/Container';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import { getErrorMessage, saveMostRecentInvoiceId } from '../../app/util/index';
import paymentAPI from '../../api/payment';
import { FormattedMessage } from 'react-intl';
import illustration from '../../app/assets/cart-empty.png';
import cover from './successIllustration.png';

import styles from './CheckoutPage.module.css';
import confirmPaymentStyles from './ConfirmPaymentPage.module.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage: FunctionComponent = () => {
  const { state } = useLocation() as any;
  const navigate = useNavigate();
  const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID!;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cartProducts, setProducts] = useState<Array<any>>(state.products);
  const [buyerFee, setBuyerFee] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isFree, setIsFree] = useState<boolean>(false);
  let _invoiceId = '';

  useEffect(() => {
    setIsLoading(true);
    const products = cartProducts.map(product => product.product);
    setSubtotal(totalPrice());
    paymentAPI
      .checkOrder(products)
      .then((res: any) => {
        setBuyerFee(res.buyerFee);
        setIsFree(res.isFree);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const _total = subtotal + getTotalFee();
    setTotal(_total);
    setIsLoading(false);
  }, [buyerFee]);

  const renderItems = (cart: Array<any>) => {
    return cart.map((item: any) => {
      const { product } = item;
      const pLink = `/product/${product._id}`;
      return (
        <div
          key={product._id}
          className="d-flex flex-wrap flex-lg-nowrap align-items-stretch py-4 border-bottom border-1 mb-4"
        >
          <Link className={styles.productimg} to={pLink}>
            <img src={product.productPictures[0]} alt=".." />
          </Link>
          <div className={'text-truncate m-2 flex-fill ' + styles.productTitle}>
            {product.productName}
          </div>
          <div className="flex-fill">
            <div className="text-end m-2">
              <strong>${product.productPrice}</strong>
            </div>
          </div>
        </div>
      );
    });
  };

  const getTotalFee = (): number => {
    let fee = (subtotal * buyerFee) / 100;
    return Math.round(fee * 100) / 100;
  };

  const totalPrice = () => {
    let price = 0;

    const products = cartProducts.map(product => product.product);
    price = products.reduce(
      (previousValue: any, currentValue: any) =>
        previousValue + currentValue.productPrice,
      price,
    );

    return price;
  };

  const handleFreeCheckout = () => {
    setIsLoading(true);
    const products = cartProducts.map(product => product.product);
    paymentAPI
      .checkout(products, total)
      .then((res: any) => {
        navigate('/payment');
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      });
  };

  const renderSummary = () => {
    return (
      <div className="d-flex flex-column p-4 bg-white border rounded">
        <h4 className="m-2">
          <FormattedMessage id="CartPage.Summary" defaultMessage="Summary" />
        </h4>
        <div className="d-flex justify-content-between m-2">
          <span>
            <FormattedMessage id="CheckoutPage.SubTotal" defaultMessage="Subtotal" />
          </span>
          <strong>{subtotal}$</strong>
        </div>
        <div className="d-flex justify-content-between m-2">
          <span>
            <FormattedMessage
              id="CheckoutPage.Fee"
              defaultMessage="Fee {fee}%"
              values={{ fee: buyerFee }}
            />
          </span>
          <strong>{getTotalFee()}$</strong>
        </div>
        <div className="d-flex justify-content-between m-2">
          <span>
            <FormattedMessage id="CheckoutPage.Total" defaultMessage="Total" />
          </span>
          <strong>{total}$</strong>
        </div>

        {isFree ? (
          <Button
            className="m-2"
            onClick={handleFreeCheckout}
            disabled={cartProducts.length < 1}
          >
            <FormattedMessage
              id="CheckoutPage.FreeBtn"
              defaultMessage="Get For FREE"
            />
          </Button>
        ) : (
          <PayPalScriptProvider
            options={{
              'client-id': `${PAYPAL_CLIENT_ID}`,
            }}
          >
            <PayPalButtons
              createOrder={(data, action) => {
                const products = cartProducts.map(product => product.product);
                return paymentAPI
                  .checkout(products, total)
                  .then((res: any) => {
                    const { paypal_link, invoiceId} = res;
                    _invoiceId = invoiceId;
                    return paypal_link;
                  })
                  .then(paypal => {
                    return paypal.id;
                  });
              }}
              onApprove={(data, action) => {
                return paymentAPI
                  .confirmOrder(data.orderID, _invoiceId)
                  .then((res: any) => {
                    navigate('/payment');
                  });
              }}
            />
          </PayPalScriptProvider>
        )}
      </div>
    );
  };

  return (
    <PageWithNavbar>
      <Container>
        <h1 className="my-4">
          <FormattedMessage id="CheckoutPage.Title" defaultMessage="Checkout" />
        </h1>
        {isLoading ? (
          <Spinner animation="border" />
        ) : cartProducts && cartProducts.length > 0 ? (
          <Row>
            <Col className={styles.cartpage_productlist} lg="7">
              {renderItems(cartProducts)}
            </Col>
            <Col lg="1"></Col>
            <Col lg="4">{renderSummary()}</Col>
          </Row>
        ) : (
          <Container fluid className="d-flex flex-column align-items-center mb-5">
            <img src={illustration} alt="empty cart" className="m-5"></img>
            <FormattedMessage id="CartPage.NoItems"></FormattedMessage>
            <Button href="/products" className="m-5">
              Continue shopping
            </Button>
          </Container>
        )}
      </Container>
    </PageWithNavbar>
  );
};

export default CheckoutPage;
