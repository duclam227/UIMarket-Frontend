import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedDate, FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { State } from '../../redux/store';

import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';
import shopAPI from '../../api/shop';
import invoiceAPI from '../../api/invoice';

import { FaPaypal } from 'react-icons/fa';
import { OneToFivePage } from '../../components';
import Transaction from './Transaction';

import style from './ShopWalletPage.module.css';

const ITEMS_PER_PAGE = 15;

interface IProps {
  intl: IntlShape;
}

const ShopWalletPage: FC<IProps> = (props) => {
  const { intl } = props;

  const currentUser = useSelector((state: State) => state.auth.user);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Array<any> | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (currentUser?.shopId) {
      setIsLoading(true);
      shopAPI.getShopById(currentUser?.shopId! || '')
        .then((res: any) => {
          const { shop } = res;
          setBalance(shop.shopBalance);
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          const errorCode: any = errorCodes.auth[errorMsg as keyof typeof errorCodes.auth];
          toast.error(intl.formatMessage({ id: `ShopWalletPage.${errorCode}` }))
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      invoiceAPI.getTransactionHistoryByPage(1, ITEMS_PER_PAGE)
        .then((res: any) => {
          setTransactions([...res.transactions]);
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          const errorCode: any = errorCodes.auth[errorMsg as keyof typeof errorCodes.auth];
          toast.error(intl.formatMessage({ id: `ShopWalletPage.${errorCode}` }))
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [currentUser])

  return (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.content}>
          <section className={style.header}>
            <div>
              <h2 className={style.title}>
                <FormattedMessage id="ShopWalletPage.title" />
              </h2>
            </div>
          </section>

          <section className={style.balanceSection}>
            <div className={style.body}>
              <h4><FormattedMessage id='ShopWalletPage.currentBalance' /> </h4>
              {balance
                ? <div className={style.balanceNumber}>
                  <FormattedMessage id='ShopWalletPage.balanceNumber' values={{ number: balance }} />
                </div>
                : null
              }
              <div className={style.bodySubtitle}><FormattedMessage id='ShopWalletPage.currentBalanceSubtitle' /> </div>
            </div>
            <div className={style.body}>
              <h4><FormattedMessage id='ShopWalletPage.canWithdraw' /> </h4>
              {balance
                ? <div className={style.balanceNumber}>
                  <FormattedMessage id='ShopWalletPage.balanceNumber' values={{ number: balance }} />
                </div>
                : null
              }
              <Button variant='primary'>
                <FaPaypal />
                <FormattedMessage id='ShopWalletPage.withdrawButtonLabel' />
              </Button>
            </div>
          </section>

          <section className={style.body}>
            {isLoading
              ? <Spinner animation='border' />
              : transactions && transactions.length > 0
                ? <>
                  <div className={style.bodyHeader}>
                    <h4><FormattedMessage id='ShopWalletPage.transactionHistoryTitle' /> </h4>
                  </div>
                  <div className={style.transactionHeading}>
                    <div><FormattedMessage id='ShopWalletPage.transactionTableIdLabel' /></div>
                    <div><FormattedMessage id='ShopWalletPage.transactionTableDescriptionLabel' /></div>
                    <div><FormattedMessage id='ShopWalletPage.transactionTableAmountLabel' /></div>
                    <div><FormattedMessage id='ShopWalletPage.transactionTableDateLabel' /></div>
                    <div><FormattedMessage id='ShopWalletPage.transactionTableStatusLabel' /></div>
                  </div>
                  <div className={style.transactionList}>
                    {transactions.map((tsx: any) => <Transaction key={tsx._id} transaction={tsx} />)}
                  </div>
                </>
                : <div className={style.noTransactions}>
                  <FormattedMessage id='ShopWalletPage.noTransactionsMessage' />
                </div>
            }
          </section>

        </div>
      </div>
    </OneToFivePage >
  )
};

export default injectIntl(ShopWalletPage);