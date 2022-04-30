import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { OneToFivePage } from '../../components/index';
import { CreateAShopForm } from '../../forms';
import { State } from '../../redux/store';

import style from './CreateAShopPage.module.css';

const CreateAShopPage: React.FC = () => {
  const currentUser = useSelector((state: State) => state.auth.user);
  const shopId = currentUser?.shopId;

  const navigate = useNavigate();

  if (shopId) {
    navigate(`/user/${currentUser._id}/shop`);
  }

  return (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.title}><FormattedMessage id='CreateAShopPage.title' /></div>

          <CreateAShopForm />
        </div>
      </div>
    </OneToFivePage>
  )
}

export default CreateAShopPage;