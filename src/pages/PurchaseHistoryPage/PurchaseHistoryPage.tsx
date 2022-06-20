import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Form, Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { State } from '../../redux/store';

import { product } from '../../app/util/interfaces';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';
import invoiceAPI from '../../api/invoice';

import { OneToFivePage, Paginator } from '../../components';
import Product from './Product';
import illustration from '../../app/assets/error-not-found.png';

import style from './PurchaseHistoryPage.module.css';


const ITEMS_PER_PAGE = 10;
const DEBOUNCE_TIME = 300;

interface IProps {
  intl: IntlShape;
}

let debounceTimer: any;
function Debounce(func: Function, time: number) {
  debounceTimer = clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(func, time);
}

const PurchaseHistoryPage: FC<IProps> = props => {
  const { intl } = props;

  const currentUser = useSelector((state: State) => state.auth.user);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<any> | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSearch = (value: string) => {
    const encodedKeyword = encodeURIComponent(value);
    Debounce(() => {
      navigate(`/purchases?name=${encodedKeyword}`);
    }, DEBOUNCE_TIME);
  }

  const goToPage = (page: number) => {
    setIsLoading(true);
    const query = params.get('name');
    invoiceAPI
      .getPurchaseHistoryByPage(page, ITEMS_PER_PAGE, query)
      .then((res: any) => {
        setProducts([...res.products]);
        setCurrentPage(res.page);
        setTotalPages(res.totalPages);
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        toast.error(intl.formatMessage({ id: `Invoice.actionFailed` }));
      });
  }

  useEffect(() => {
    setIsLoading(true);
    const query = params.get('name');
    invoiceAPI
      .getPurchaseHistoryByPage(1, ITEMS_PER_PAGE, query)
      .then((res: any) => {
        setProducts([...res.products]);
        setCurrentPage(1);
        setTotalPages(res.totalPages);
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        toast.error(intl.formatMessage({ id: `Invoice.actionFailed` }));
      });
  }, [params]);

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
            <Form className={style.searchbox} onSubmit={(e: any) => { e.preventDefault() }}>
              <Form.Control
                placeholder={intl.formatMessage({
                  id: 'PurchaseHistoryPage.searchPlaceholder',
                })}
                onChange={(e: any) => handleSearch(e.target.value)}
              ></Form.Control>
            </Form>
          </section>
          <section className={style.body}>
            {isLoading ? (
              <Spinner animation="border" />
            ) : products && products.length > 0
              ? (
                <div className={style.productList}>
                  {products.map((purchase: any) => (
                    <Product key={purchase._id!} purchase={purchase} />
                  ))}
                  <Paginator
                    currentPage={currentPage}
                    totalNumberOfPages={totalPages}
                    handleClickGoToPage={(page: number) => goToPage(page)}
                  />
                </div>
              ) : (
                <div className={style.noProducts}>
                  <div className="d-flex flex-column align-items-center mb-2">
                    <img
                      className={'m-4 ' + style.img}
                      src={illustration}
                      alt="empty list"
                    ></img>
                    <FormattedMessage
                      id="PurchaseHistoryPage.noProductsMessage"
                      defaultMessage="Looks like you haven't bought anything."
                    ></FormattedMessage>
                    <Link to='/products'>
                      <Button className="m-4">
                        <FormattedMessage
                          id="PurchaseHistoryPage.continueShoppingMessage"
                        ></FormattedMessage>
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
          </section>
        </div>
      </div>
    </OneToFivePage>
  );
};

export default injectIntl(PurchaseHistoryPage);
