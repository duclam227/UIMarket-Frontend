import { FC } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { BsGear, BsWallet, BsBag, BsShop } from 'react-icons/bs';

import { State } from '../../../redux/store';
import style from './SideNav.module.css';
import { genericAvatarUrl } from '../../../app/util/const';

interface Props {
  className?: string;
}
const SideNav: FC<Props> = props => {
  const myProfileNavGroupLabel = (
    <FormattedMessage id="SideNav.myProfileNavGroupLabel" defaultMessage="My Profile" />
  );
  const editProfileNavLinkLabel = (
    <FormattedMessage
      id="SideNav.editProfileNavLinkLabel"
      defaultMessage="Edit Profile"
    />
  );
  const changePasswordNavLinkLabel = (
    <FormattedMessage
      id="SideNav.changePasswordNavLinkLabel"
      defaultMessage="Personal Information"
    />
  );
  const paymentNavGroupLabel = (
    <FormattedMessage id="SideNav.paymentNavGroupLabel" defaultMessage="Payment" />
  );
  const deexWalletNavLinkLabel = (
    <FormattedMessage id="SideNav.deexWalletNavLinkLabel" defaultMessage="DeeX Wallet" />
  );
  const bankAccountsNavLinkLabel = (
    <FormattedMessage
      id="SideNav.bankAccountsNavLinkLabel"
      defaultMessage="Bank Accounts"
    />
  );
  const purchaseReviewsNavGroupLabel = (
    <FormattedMessage
      id="SideNav.purchaseReviewsNavGroupLabel"
      defaultMessage="Purchase & Reviews"
    />
  );
  const purchasesNavLinkLabel = <FormattedMessage id="SideNav.purchasesNavLinkLabel" />;
  const reviewsNavLinkLabel = <FormattedMessage id="SideNav.reviewsNavLinkLabel" />;
  const myStoreNavGroupLabel = (
    <FormattedMessage id="SideNav.myStoreNavGroupLabel" defaultMessage="My Store" />
  );
  const productsNavLinkLabel = (
    <FormattedMessage id="SideNav.productsNavLinkLabel" defaultMessage="Products" />
  );
  const bankDetailsNavLinkLabel = (
    <FormattedMessage
      id="SideNav.bankDetailsNavLinkLabel"
      defaultMessage="Bank Details"
    />
  );

  const { className } = props;
  const currentUser = useSelector((state: State) => state.auth.user);

  return (
    //Sidenav only for logged in users?
    <div className={`${style.sideNavWrapper} ${className}`}>
      {/* Current user display
      <div className={style.currentUserRow}>
        <div className={style.currentUser}>
          <div className={style.profilePictureWrapper}>
            <img
              className={style.profilePicture}
              src={currentUser?.customerAvatar || genericAvatarUrl}
              alt="Current user"
            />
          </div>
          <div className={style.username}>{currentUser?.customerName}</div>
        </div>
      </div> */}
      {/* Profile nav group */}
      <ul className={style.navGroup}>
        <div className={style.navGroupName}>
          <BsGear className={style.navGroupNameIcon} />
          <Link
            to={`/user/${currentUser?._id}/activity`}
            className={style.navGroupNameLabel}
          >
            {myProfileNavGroupLabel}
          </Link>
        </div>
        <Link to={`/user/${currentUser?._id}/edit`}>
          <li className={style.navLinkItem}>{editProfileNavLinkLabel}</li>
        </Link>
        <Link to={`/user/${currentUser?._id}/change-password`}>
          <li className={style.navLinkItem}>{changePasswordNavLinkLabel}</li>
        </Link>
      </ul>

      {/* Purchase nav group */}
      <ul className={style.navGroup}>
        <div className={style.navGroupName}>
          <BsBag className={style.navGroupNameIcon} />
          <Link to={`/purchases`} className={style.navGroupNameLabel}>
            {purchaseReviewsNavGroupLabel}
          </Link>
        </div>
        <Link to={`/purchases`}>
          <li className={style.navLinkItem}>{purchasesNavLinkLabel}</li>
        </Link>
        <Link to={`/user/${currentUser?._id}/reviews`}>
          <li className={style.navLinkItem}>{reviewsNavLinkLabel}</li>
        </Link>
      </ul>

      {/* My store nav group */}
      <ul className={style.navGroup}>
        <div className={style.navGroupName}>
          <BsShop className={style.navGroupNameIcon} />
          <Link to={`/user/${currentUser?._id}/shop`} className={style.navGroupNameLabel}>
            {myStoreNavGroupLabel}
          </Link>
        </div>
        <Link to={`/user/${currentUser?._id}/products`}>
          <li className={style.navLinkItem}>{productsNavLinkLabel}</li>
        </Link>
        <Link to='/wallet'>
          <li className={style.navLinkItem}>{deexWalletNavLinkLabel}</li>
        </Link>
      </ul>
    </div>
  );
};

export default SideNav;
