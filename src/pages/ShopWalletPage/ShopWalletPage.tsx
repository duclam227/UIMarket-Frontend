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
import { OneToFivePage, Paginator } from '../../components';
import Transaction from './Transaction';
import WithdrawModal from './WithdrawModal';

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
  const [balance, setBalance] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [isReload, setIsReload] = useState<boolean>(false);

  const goToPage = (page: number) => {
    setIsLoading(true);
    invoiceAPI.getTransactionHistoryByPage(page, ITEMS_PER_PAGE)
      .then((res: any) => {
        setTransactions([...res.transactions]);
        setTotalPages(res.totalPages);
        setCurrentPage(page);
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

  useEffect(() => {
    if (currentUser?.shopId) {
      setIsLoading(true);
      shopAPI.getShopById(currentUser?.shopId! || '')
        .then((res: any) => {
          const { shop } = res;
          const { shopBalance } = shop;

          const roundedBalance = Math.round(shopBalance * 100) / 100;

          setBalance(roundedBalance);
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
  }, [currentUser, isReload])

  useEffect(() => {
    if (currentUser) {
      invoiceAPI.getTransactionHistoryByPage(1, ITEMS_PER_PAGE)
        .then((res: any) => {
          setTransactions([...res.transactions]);
          setTotalPages(res.totalPages);
          setCurrentPage(1);
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
  }, [currentUser, isReload])

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
              <div className={style.balanceNumber}>
                <FormattedMessage id='ShopWalletPage.balanceNumber' values={{ number: balance }} />
              </div>
              <div className={style.bodySubtitle}><FormattedMessage id='ShopWalletPage.currentBalanceSubtitle' /> </div>
            </div>
            <div className={style.body}>
              <h4><FormattedMessage id='ShopWalletPage.canWithdraw' /> </h4>
              <div className={style.balanceNumber}>
                <FormattedMessage id='ShopWalletPage.balanceNumber' values={{ number: balance }} />
              </div>
              <Button
                variant='primary'
                onClick={() => setIsWithdrawing(true)}
                disabled={!(balance > 0)}
              >
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
                    <div><FormattedMessage id='ShopWalletPage.transactionTableDescriptionLabel' /></div>
                    <div><FormattedMessage id='ShopWalletPage.transactionTableAmountLabel' /></div>
                    <div><FormattedMessage id='ShopWalletPage.transactionTableDateLabel' /></div>
                    <div><FormattedMessage id='ShopWalletPage.transactionTableStatusLabel' /></div>
                  </div>
                  <div className={style.transactionList}>
                    {transactions.map((tsx: any) => <Transaction key={tsx._id} transaction={tsx} />)}
                  </div>

                  <Paginator
                    currentPage={currentPage}
                    totalNumberOfPages={totalPages}
                    handleClickGoToPage={(page: number) => goToPage(page)}
                  />
                </>
                : <div className={style.noTransactions}>
                  <FormattedMessage id='ShopWalletPage.noTransactionsMessage' />
                </div>
            }
          </section>

        </div>

        {
          isWithdrawing
            ? <WithdrawModal
              handleReload={() => setIsReload(!isReload)}
              handleClose={() => setIsWithdrawing(false)}
              balance={balance!}
            />
            : null
        }

      </div >
    </OneToFivePage >
  )
};

export default injectIntl(ShopWalletPage);