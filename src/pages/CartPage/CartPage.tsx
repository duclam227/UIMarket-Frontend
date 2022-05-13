import { FunctionComponent } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { product } from '../../app/util/interfaces';
import { PageWithNavbar } from '../../components';
import Container from 'react-bootstrap/Container';

import styles from './CartPage.module.css';

const CartPage: FunctionComponent = () => {
  const items: Array<product> = [];
  const summary: any = { numOfItems: 3, totalCost: 100 };

  const renderItems = (items: Array<product>) => {
    const productName =
      'The Ultimate Guide to Designing, Prototyping and Mass Manufacturing your Product Idea...';
    return (
      <div className="d-flex flex-wrap flex-lg-nowrap align-items-center p-4 border-bottom border-1">
        <a className={styles.productimg} href="#">
          <img src="https://picsum.photos/500/600" alt=".." />
        </a>
        <div className={'mw-100 text-truncate m-2'}>
          {productName}
          <div className="flex-fill text-end m-2">
            <strong>$100</strong>
          </div>
          <div className="text-end text-muted m-2">Remove</div>
        </div>
      </div>
    );
  };

  const renderSummary = (summary: any) => {
    return (
      <div className="d-flex flex-column p-4 bg-white border rounded">
        <h4 className="m-2">Summary</h4>
        <div className="d-flex justify-content-between m-2">
          <span>3 items</span>
          <strong>200$</strong>
        </div>
        <Button className="m-2">Continue to Checkout</Button>
      </div>
    );
  };

  return (
    <PageWithNavbar>
      <Container>
        <h1 className="my-4">My Cart</h1>
        <Row>
          <Col className={styles.cartpage_productlist} lg="7">
            {renderItems(items)}
          </Col>
          <Col lg="1"></Col>
          <Col lg="4">{renderSummary(summary)}</Col>
        </Row>
      </Container>
    </PageWithNavbar>
  );
};

export default CartPage;
