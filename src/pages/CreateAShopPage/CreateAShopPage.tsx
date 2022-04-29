import React from 'react';
import { FormattedMessage } from 'react-intl';

import { OneToFivePage } from '../../components/index';
import { CreateAShopForm } from '../../forms';

import style from './CreateAShopPage.module.css';

const CreateAShopPage: React.FC = () => {
  return (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.title}><FormattedMessage id='CreateAShopPage.Tite' /></div>

          <CreateAShopForm />
        </div>
      </div>
    </OneToFivePage>
  )
}

export default CreateAShopPage;