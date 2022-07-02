import React, { FC, useEffect } from "react";

import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import style from './AdminUserDetailPage.module.css';

interface IProps {
  orders: any;
}

const SectionUserOrders: FC<IProps> = (props) => {
  const { orders } = props;
  return (
    <>
      <h2><FormattedMessage id='AdminUserDetailPage.ordersLabel' /></h2>
      {
        orders && orders.length > 0
          ? orders.map((order: any) => {
            return (
              <div className={style.question} key={order._id}>
                <Link to={`/product/${order.product._id}`}>
                  {order.product.productName}
                </Link>
                <div className={style.qDate}>
                  <span><FormattedMessage id='AdminUserDetailPage.boughtOn' /></span>
                  <span><FormattedDate value={order.boughtTime} /></span>
                </div>
              </div>
            )
          })
          : <FormattedMessage id='AdminUserDetailPage.NoOrders' />
      }
    </>
  )
}

export default SectionUserOrders;