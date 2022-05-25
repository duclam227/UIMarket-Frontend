import { FC } from "react";

import style from './ShopWalletPage.module.css';

interface IProps {
  transaction: any;
}

const Transaction: FC<IProps> = (props) => {
  const { transaction } = props;
  console.log(transaction);

  const {
    _id,
    transactionStatus,
    changeAmount,
    reason,
  } = transaction;

  return (
    <div className={style.transaction}>
      <div>{_id}</div>
      <div>{reason}</div>
      <div>{changeAmount}</div>
      <div>.</div>
      <div>{transactionStatus}</div>
    </div>
  )
};

export default Transaction;