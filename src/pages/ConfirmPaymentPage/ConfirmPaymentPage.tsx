import { useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { State } from '../../redux/store';

import { getMostRecentInvoiceId } from '../../app/util';
import paymentAPI from '../../api/payment';

import { PageWithNavbar } from '../../components';
import cover from './successIllustration.png';

import style from './ConfirmPaymentPage.module.css';
import { FormattedMessage } from 'react-intl';

const ConfirmPaymentPage = () => {

  const currentUser = useSelector((state: State) => state.auth.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const invoiceId = getMostRecentInvoiceId();

  // useEffect(() => {
  //   setIsLoading(true);
  //   paymentAPI.confirmOrder(token!, invoiceId!)
  //     .then((res: any) => {
  //       setIsLoading(false);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, [])

  return isLoading
    ? <PageWithNavbar>
      <Spinner animation='border' />
    </PageWithNavbar>
    : <PageWithNavbar>
      <div className={style.wrapper}>
        <div className={style.content}>
          <img src={cover} alt='Picture of a person with a cup' />
          <h3><FormattedMessage id='ConfirmPaymentPage.successMessage' /></h3>
          <div className={style.buttonRow}>
            <Link to='/products'>
              <Button variant="outline-primary">
                <FormattedMessage id='ConfirmPaymentPage.buyMoreLabel' />
              </Button>
            </Link>
            <Link to='/purchases'>
              <Button>
                <FormattedMessage id='ConfirmPaymentPage.checkPurchasesLabel' />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageWithNavbar>
}

export default ConfirmPaymentPage;