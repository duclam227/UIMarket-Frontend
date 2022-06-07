import { FunctionComponent, useEffect, useState } from 'react';
import { Spinner, Button, Col, Row, Form } from 'react-bootstrap';
import { PageWithNavbar } from '../../components';
import Container from 'react-bootstrap/Container';

import { getErrorMessage, saveMostRecentInvoiceId } from '../../app/util/index';
import cartAPI from '../../api/cart';
import paymentAPI from '../../api/payment';
import { FormattedMessage } from 'react-intl';
import illustration from '../../app/assets/cart-empty.png';

import styles from './CartPage.module.css';
import { Link, useNavigate } from 'react-router-dom';

const CartPage: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cartProducts, setProducts] = useState<Array<any>>([]);
  const [selectedProducts, setSelectedProducts] = useState<Array<any>>([]);
  const navigate = useNavigate();

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

  const handleCheckoutCart = () => {
    setIsLoading(true);

    paymentAPI
      .checkout(selectedProducts)
      .then((res: any) => {
        const { paypal_link, invoiceId, isFree } = res;
        console.log(res);
        if (!isFree) {
          saveMostRecentInvoiceId(invoiceId);
          window.location.replace(paypal_link);
        } else {
          navigate('/purchases');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleToggleProduct = (product: any) => {
    const selectedProductIds = selectedProducts.map(product => product.product);
    if (selectedProductIds && selectedProductIds.includes(product._id)) {
      setSelectedProducts([...selectedProducts.filter(pro => pro.product !== product._id)]);
    } else {
      setSelectedProducts([...selectedProducts,
      { product: product._id, shop: product.shopId, price: product.productPrice }
      ]);
    }
  }

  const renderItems = (cart: Array<any>) => {
    const handleRemoveItem = (removedItem: any) => {
      cartAPI
        .removeSingleProduct(removedItem._id)
        .then((res: any) => {
          const newList = cartProducts.filter(item => {
            return item.product._id !== removedItem._id;
          });
          setProducts(newList);
          setSelectedProducts([...selectedProducts.filter(pro => pro.product !== removedItem._id)])
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          setError(errorMsg);
        });
    };

    return cart.map((item: any) => {
      const { product } = item;
      const pLink = `/product/${product._id}`;
      return (
        <div
          key={product._id}
          className="d-flex flex-wrap flex-lg-nowrap align-items-stretch py-4 border-bottom border-1 mb-4"
        >
          <div className={'d-flex m-1 align-items-center justify-content-center'}>
            <Form>
              <Form.Check
                inline
                type="checkbox"
                className={`me-5`}
                onChange={() => handleToggleProduct(product)}
              />
            </Form>
          </div>
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
            <div className="text-end">
              <button
                className="btn btn-link text-decoration-none"
                onClick={() => handleRemoveItem(product)}
              >
                <FormattedMessage id="CartPage.Remove" defaultMessage="Remove" />
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const totalPrice = (cart: any) => {
    let price = 0;

    price = selectedProducts.reduce(
      (previousValue: any, currentValue: any) =>
        previousValue + currentValue.price,
      price,
    );
    return price;
  };

  const renderSummary = (cart: any) => {
    return (
      <div className="d-flex flex-column p-4 bg-white border rounded">
        <h4 className="m-2">
          <FormattedMessage id="CartPage.Summary" defaultMessage="Summary" />
        </h4>
        <div className="d-flex justify-content-between m-2">
          <span>
            <FormattedMessage
              id="CartPage.numOfItems"
              defaultMessage="{length} items"
              values={{
                length: selectedProducts.length,
              }}
            />
          </span>
          <strong>{totalPrice(cart)}$</strong>
        </div>
        <Button className="m-2" onClick={handleCheckoutCart} disabled={selectedProducts.length < 1}>
          <FormattedMessage
            id="CartPage.checkoutBtnLabel"
            defaultMessage="Checkout with Paypal"
          />
        </Button>
      </div>
    );
  };

  return (
    <PageWithNavbar>
      <Container>
        <h1 className="my-4">
          <FormattedMessage id="CartPage.Title" defaultMessage="My Cart" />
        </h1>
        {isLoading ? (
          <Spinner animation="border" />
        ) : cartProducts && cartProducts.length > 0 ? (
          <Row>
            <Col className={styles.cartpage_productlist} lg="7">
              {renderItems(cartProducts)}
            </Col>
            <Col lg="1"></Col>
            <Col lg="4">{renderSummary(cartProducts)}</Col>
          </Row>
        ) : (
          <Container fluid className="d-flex flex-column align-items-center mb-5">
            <img src={illustration} alt="empty cart" className="m-5"></img>
            <FormattedMessage
              id="CartPage.NoItems"
            ></FormattedMessage>
            <Link to='/products'>
              <Button className="m-5">
                <FormattedMessage
                  id="PurchaseHistoryPage.continueShoppingMessage"
                ></FormattedMessage>
              </Button>
            </Link>
          </Container>
        )}
      </Container>
    </PageWithNavbar>
  );
};

export default CartPage;
