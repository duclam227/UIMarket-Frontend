import { FC } from "react";
import { Badge } from "react-bootstrap";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { transactionActionTypes, transactionStatusTypes } from '../../app/util/config';

import style from './ShopWalletPage.module.css';

interface IProps {
  transaction: any;
}

const Transaction: FC<IProps> = (props) => {
  const { transaction } = props;
  console.log(transaction);

  const {
    action,
    changeAmount,
    createdAt,
    productId,
    transactionStatus,
  } = transaction;

  const truncatedProductId = productId.substring(0, 4);

  return (
    <div className={style.transaction}>
      <div>
        {action === transactionActionTypes.receive
          ? <>
            <FormattedMessage
              id={`ShopWalletPage.receivedMoneyMessage`}
              values={{
                money: changeAmount,
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
          : <FormattedMessage
            id={`ShopWalletPage.withrawedMoneyMessage`}
            values={{
              money: changeAmount,
            }}
          />
        }
      </div>
      <div>{changeAmount}</div>
      <div><FormattedDate value={createdAt} /></div>
      <div>
        {transactionStatus === transactionStatusTypes.pending
          ? <Badge pill bg='warning'>
            <FormattedMessage
              id={`ShopWalletPage.transactionStatusPending`}
              values={{
                money: changeAmount,
              }}
            />
          </Badge>
          : transactionStatus === transactionStatusTypes.completed
            ? <Badge pill bg='success'>
              <FormattedMessage
                id={`ShopWalletPage.transactionStatusCompleted`}
                values={{
                  money: changeAmount,
                }}
              />
            </Badge>
            : <Badge pill bg='danger'><FormattedMessage
              id={`ShopWalletPage.transactionStatusRefunded`}
              values={{
                money: changeAmount,
              }}
            />
            </Badge>
        }
      </div>
    </div>
  )
};

export default Transaction;