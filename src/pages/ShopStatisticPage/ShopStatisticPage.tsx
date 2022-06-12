import React, { useEffect, useRef } from 'react';
import { default as chartSDK } from '../../app/util/chartSdk';
import { OneToFivePage } from '../../components';

import style from './ShopStatisticPage.module.css';

const ShopStatisticPage = () => {
  const mainChartRef = useRef(null);

  useEffect(() => {
    if (mainChartRef) {
      const mainChart = chartSDK.createChart({
        chartId: '62a20f25-8f99-4d67-8714-195c351ad566',
      })
      mainChart.render(mainChartRef.current!);
    }
  }, [])

  return (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.chartItem}>
            <div ref={mainChartRef} className={style.chart}></div>
            {/* <h4><FormattedMessage id='ShopStatisticPage.numberOfCustomerLabel' /></h4> */}
          </div>
        </div>
      </div>
    </OneToFivePage>
  )
};

export default ShopStatisticPage;
