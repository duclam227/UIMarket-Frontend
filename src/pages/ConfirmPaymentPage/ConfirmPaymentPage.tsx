import { FC, useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { State } from '../../redux/store';

import { getErrorMessage, getMostRecentInvoiceId } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';
import paymentAPI from '../../api/payment';

import { PageWithNavbar } from '../../components';
import cover from './successIllustration.png';

import style from './ConfirmPaymentPage.module.css';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

interface IProps {
  intl: IntlShape;
}

const ConfirmPaymentPage: FC<IProps> = (props) => {
  const { intl } = props;

  const currentUser = useSelector((state: State) => state.auth.user);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const invoiceId = getMostRecentInvoiceId();

  return <PageWithNavbar>
    <div className={style.wrapper}>
      {isLoading
        ? <Spinner animation='border' />
        : <div className={style.content}>
          <img src={cover} alt='Picture of a person with a cup' />
          <h3><FormattedMessage id='ConfirmPaymentPage.successMessage' /></h3>
          <h5><FormattedMessage id='ConfirmPaymentPage.refundMessage' /></h5>
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
      }
    </div>
  </PageWithNavbar>
}

export default injectIntl(ConfirmPaymentPage);