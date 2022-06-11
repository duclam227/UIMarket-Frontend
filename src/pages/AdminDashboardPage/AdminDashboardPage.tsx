import React, { useEffect, useRef } from 'react';
import { getJwt } from '../../app/util/authHelpers';
import { default as chartSDK } from '../../app/util/chartSdk';

import style from './AdminDashboardPage.module.css';

const AdminDashboardPage = () => {

  const numberOfCustomerRef = useRef(null);

  useEffect(() => {
    if (numberOfCustomerRef) {
      const numberOfCustomerChart = chartSDK.createChart({
        chartId: '62a1b37b-40c4-45ea-8fc6-f254a06cc05e',
      })
      numberOfCustomerChart.render(numberOfCustomerRef.current!);
    }
  }, [])

  return (
    <div className={style.wrapper}>
      <div className={style.numberOfCustomerChart} ref={numberOfCustomerRef}>
        sdf
      </div>
    </div>)
};

export default AdminDashboardPage;
