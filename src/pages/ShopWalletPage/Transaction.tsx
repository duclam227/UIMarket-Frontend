import classNames from 'classnames';
import { FC } from 'react';
import { Badge } from 'react-bootstrap';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { transactionActionTypes, transactionStatusTypes } from '../../app/util/config';

import style from './ShopWalletPage.module.css';

interface IProps {
  transaction: any;
}

const Transaction: FC<IProps> = props => {
  const { transaction } = props;

  const { action, changeAmount, createdAt, productId, transactionStatus } = transaction;

  const truncatedProductId = productId && productId.substring(0, 4);
  const roundedChangeAmount = changeAmount && Math.round(changeAmount * 100) / 100;
  const absoluteChangeAmount = roundedChangeAmount && Math.abs(roundedChangeAmount);

  let transactionMessage;
  switch (action) {
    case transactionActionTypes.receive: {
      transactionMessage = (
        <>
          <FormattedMessage
            id={`ShopWalletPage.receivedMoneyMessage`}
            values={{
              money: absoluteChangeAmount,
            }}
          />
          <Link className={style.productLink} to={`/product/${productId}`}>
            <FormattedMessage
              id={`ShopWalletPage.transactionProductId`}
              values={{
                id: truncatedProductId,
              }}
            />
          </Link>
        </>
      );
      break;
    }
    case transactionActionTypes.withdraw: {
      transactionMessage = (
        <FormattedMessage
          id={`ShopWalletPage.withdrawnMoneyMessage`}
          values={{
            money: absoluteChangeAmount,
          }}
        />
      );
      break;
    }
    case transactionActionTypes.refund: {
      transactionMessage = (
        <>
          <FormattedMessage
            id={`ShopWalletPage.refundedMoneyMessage`}
            values={{
              money: absoluteChangeAmount,
            }}
          />
          <Link className={style.productLink} to={`/product/${productId}`}>
            <FormattedMessage
              id={`ShopWalletPage.transactionProductId`}
              values={{
                id: truncatedProductId,
              }}
            />
          </Link>
        </>
      );
      break;
    }
  }

  return (
    <div className={style.transaction}>
      <div>{transactionMessage}</div>
      {changeAmount > 0 ? (
        <div className={classNames(style.amount, style.receive)}>
          ${absoluteChangeAmount}
        </div>
      ) : (
        <div className={classNames(style.amount, style.withdraw)}>
          -${absoluteChangeAmount}
        </div>
      )}

      <div>
        <FormattedDate value={createdAt} />
      </div>
      <div>
        {transactionStatus === transactionStatusTypes.pending ? (
          <Badge pill bg="warning">
            <FormattedMessage
              id={`ShopWalletPage.transactionStatusPending`}
              values={{
                money: changeAmount,
              }}
            />
          </Badge>
        ) : transactionStatus === transactionStatusTypes.completed ? (
          <Badge pill bg="success">
            <FormattedMessage
              id={`ShopWalletPage.transactionStatusCompleted`}
              values={{
                money: changeAmount,
              }}
            />
          </Badge>
        ) : (
          <Badge pill bg="danger">
            <FormattedMessage
              id={`ShopWalletPage.transactionStatusRefunded`}
              values={{
                money: changeAmount,
              }}
            />
          </Badge>
        )}
      </div>
    </div>
  );
};

export default Transaction;
