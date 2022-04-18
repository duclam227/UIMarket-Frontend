import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';

import { State } from '../../../redux/store';

import style from './SideNav.module.css';
import { BsGear, BsWallet, BsBag, BsShop } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
}
const SideNav: FC<Props> = props => {
  const { className } = props;
  const currentUser = useSelector((state: State) => state.auth.user);
  return (
    //Sidenav only for logged in users?
    <div className={`${style.sideNavWrapper} ${className}`}>
      <div className={style.currentUserRow}>
        {/* Current user display */}
        <div className={style.currentUser}>
          <div className={style.profilePictureWrapper}>
            <img
              className={style.profilePicture}
              src="https://i.pinimg.com/originals/dc/fa/f9/dcfaf90445559ec3997517ad7a34f8ee.jpg"
              alt="Current user"
            />
          </div>
          <div className={style.username}>{currentUser?.customerName}</div>
        </div>
      </div>
      {/* Profile nav group */}
      <ul className={style.navGroup}>
        <div className={style.navGroupName}>
          <BsGear className={style.navGroupNameIcon} />
          <span className={style.navGroupNameLabel}>My Profile</span>
        </div>
        <li className={style.navLinkItem}>Edit Profile</li>
        <Link to={`/user/${currentUser?._id}`}>
          <li className={style.navLinkItem}>Personal Information</li>
        </Link>
      </ul>

      {/* Payment nav group */}
      <ul className={style.navGroup}>
        <div className={style.navGroupName}>
          <BsWallet className={style.navGroupNameIcon} />
          <span className={style.navGroupNameLabel}>Payment</span>
        </div>
        <li className={style.navLinkItem}>DeeX Wallet</li>
        <li className={style.navLinkItem}>Bank Accounts</li>
      </ul>

      {/* Purchase nav group */}
      <ul className={style.navGroup}>
        <div className={style.navGroupName}>
          <BsBag className={style.navGroupNameIcon} />
          <span className={style.navGroupNameLabel}>Purchase & Reviews</span>
        </div>
      </ul>

      {/* My store nav group */}
      <ul className={style.navGroup}>
        <div className={style.navGroupName}>
          <BsShop className={style.navGroupNameIcon} />
          <span className={style.navGroupNameLabel}>My Store</span>
        </div>
        <li className={style.navLinkItem}>Products</li>
        <li className={style.navLinkItem}>Bank Details</li>
      </ul>
    </div>
  );
};

export default SideNav;
