import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { getJwt } from '../../app/util/authHelpers';
import { default as chartSDK } from '../../app/util/chartSdk';

import style from './AdminDashboardPage.module.css';

const AdminDashboardPage = () => {

  const numberOfCustomerRef = useRef(null);
  const numberOfShopRef = useRef(null);
  const numberOfQuestionRef = useRef(null);
  const numberOfBountiedQuestionRef = useRef(null);

  useEffect(() => {
    if (numberOfCustomerRef) {
      const numberOfCustomerChart = chartSDK.createChart({
        chartId: '62a1b37b-40c4-45ea-8fc6-f254a06cc05e',
      })
      numberOfCustomerChart.render(numberOfCustomerRef.current!);
    }
  }, [])

  useEffect(() => {
    if (numberOfShopRef) {
      const numberOfShopChart = chartSDK.createChart({
        chartId: '9c858e58-6c2f-4e14-965b-7fe8d1438246',
      })
      numberOfShopChart.render(numberOfShopRef.current!);
    }
  }, [])

  useEffect(() => {
    if (numberOfQuestionRef) {
      const numberOfQuestionChart = chartSDK.createChart({
        chartId: '62a1c49e-8f29-4bbe-8223-d46f9b3ee343',
      })
      numberOfQuestionChart.render(numberOfQuestionRef.current!);
    }
  }, [])

  useEffect(() => {
    if (numberOfBountiedQuestionRef) {
      const numberOfBountiedQuestionChart = chartSDK.createChart({
        chartId: '74273861-fd67-4f50-bffe-1b0964415cbd',
      })
      numberOfBountiedQuestionChart.render(numberOfBountiedQuestionRef.current!);
    }
  }, [])

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.chartItem}>
          <div ref={numberOfCustomerRef} className={style.chart}></div>
          {/* <h4><FormattedMessage id='AdminDashboardPage.numberOfCustomerLabel' /></h4> */}
        </div>
        <div className={style.chartItem}>
          <div ref={numberOfShopRef} className={style.chart}></div>
          {/* <h4><FormattedMessage id='AdminDashboardPage.numberOfShopLabel' /></h4> */}
        </div>
        <div className={style.chartItem}>
          <div ref={numberOfQuestionRef} className={style.chart}></div>
          {/* <h4><FormattedMessage id='AdminDashboardPage.numberOfQuestionLabel' /></h4> */}
        </div>
        <div className={style.chartItem}>
          <div ref={numberOfBountiedQuestionRef} className={style.chart}></div>
          {/* <h4><FormattedMessage id='AdminDashboardPage.numberOfBountiedQuestionLabel' /></h4> */}
        </div>
      </div>
    </div>)
};

export default AdminDashboardPage;
