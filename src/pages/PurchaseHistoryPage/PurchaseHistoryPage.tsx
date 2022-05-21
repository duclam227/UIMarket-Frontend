import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Form, Spinner } from 'react-bootstrap';
import { State } from '../../redux/store';

import { product } from '../../app/util/interfaces';
import invoiceAPI from '../../api/invoice';

import { OneToFivePage } from '../../components';

import style from './PurchaseHistoryPage.module.css';
import Product from './Product';

const ITEMS_PER_PAGE = 10;

interface IProps {
  intl: IntlShape;
}

const PurchaseHistoryPage: FC<IProps> = (props) => {
  const { intl } = props;

  const currentUser = useSelector((state: State) => state.auth.user);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<any> | null>(null);

  useEffect(() => {
    setIsLoading(true);
    invoiceAPI.getPurchaseHistoryByPage(1, ITEMS_PER_PAGE)
      .then((res: any) => {
        setProducts([...res.products]);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.content}>
          <section className={style.header}>
            <div>
              <h2 className={style.title}>
                <FormattedMessage id="PurchaseHistoryPage.title" />
              </h2>
              <h6>
                <FormattedMessage id="PurchaseHistoryPage.subtitle" />
              </h6>
            </div>
            <Form className={style.searchbox}>
              <Form.Control
                placeholder={intl.formatMessage({
                  id: 'PurchaseHistoryPage.searchPlaceholder',
                })}
              ></Form.Control>
            </Form>
          </section>
          <section className={style.body}>
            {isLoading
              ? <Spinner animation='border' />
              : products && products.length > 0
                ? <div className={style.productList}>
                  {products.map((purchase: any) => <Product key={purchase._id!} purchase={purchase} />)}
                </div>
                : <div className={style.noProducts}>
                  <FormattedMessage id='PurchaseHistoryPage.noProductsMessage' />
                </div>
            }
          </section>

        </div>
      </div>
    </OneToFivePage >
  )
};

export default injectIntl(PurchaseHistoryPage);