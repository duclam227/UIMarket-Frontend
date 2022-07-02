import React, { FC } from "react";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";

import { customer } from "../../app/util/interfaces";
import { UserAvatar } from "../../components";

import style from './AdminUserDetailPage.module.css';

interface IProps {
  activity: any;
  user: customer
  intl: IntlShape;
}

const SectionUserPanel: FC<IProps> = (props) => {
  const { activity, user, intl } = props;

  const renderActivities = () => {
    const { productBought, stat } = activity || {};
    return (
      <div className={style.activity}>
        <div className={style.activityItem}>
          <FormattedMessage id='AdminUserDetailPage.Questions' values={{ count: stat?.questions }} />
        </div>
        <div className={style.activityItem}>
          <FormattedMessage id='AdminUserDetailPage.Answers' values={{ count: stat?.answers }} />
        </div>
        <div className={style.activityItem}>
          <FormattedMessage id='AdminUserDetailPage.ProductsBought' values={{ count: productBought }} />
        </div>
      </div>
    )
  }

  const renderDetails = () => {
    return (
      <div className={style.details}>
        <div className={style.detailsItem}>
          <h5><FormattedMessage id='AdminUserDetailPage.Id' /></h5>
          {user?._id}
        </div>
        <div className={style.detailsItem}>
          <h5><FormattedMessage id='AdminUserDetailPage.Email' /></h5>
          {user?.customerEmail}
        </div>
      </div>
    )
  }

  return (
    <section className={style.section}>
      <div className={style.avatarContainer}>
        <UserAvatar image={user?.customerAvatar} />
      </div>
      <h4>{user?.customerName}</h4>
      {renderActivities()}

      {renderDetails()}
    </section>
  )
};

export default injectIntl(SectionUserPanel);