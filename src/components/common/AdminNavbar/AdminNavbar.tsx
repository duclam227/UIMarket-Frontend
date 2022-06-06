import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { BsPersonCircle } from 'react-icons/bs';

import { LogoIcon } from '../../';
import { State } from '../../../redux/store';
import style from './AdminNavbar.module.css';
import { logOut } from '../../../redux';
const AdminNavbar = () => {
  const userDropdownProfileLabel = (
    <FormattedMessage
      id="CommonNavbar.userDropdownProfileLabel"
      defaultMessage="Profile"
    />
  );
  const userDropdownLogoutBtnLabel = (
    <FormattedMessage
      id="CommonNavbar.userDropdownLogoutBtnLabel"
      defaultMessage="Logout"
    />
  );
  const params = useParams();
  const dispatch = useDispatch();
  const activeNavClassName = 'active bg-dark';
  const inactiveNavClassName = 'text-dark';
  const currentUser = useSelector((state: State) => state.auth.user);

  const tabs = [
    {
      key: 'dashboard',
      label: <FormattedMessage id="AdminNavbar.dashboard" />,
    },
    {
      key: 'user-management',
      label: <FormattedMessage id="AdminNavbar.userManagement" />,
    },
    {
      key: 'customer-management',
      label: <FormattedMessage id="AdminNavbar.customerManagement" />,
    },
    {
      key: 'shop-management',
      label: <FormattedMessage id="AdminNavbar.shopManagement" />,
    },
    {
      key: 'invoice-management',
      label: <FormattedMessage id="AdminNavbar.invoiceManagement" />,
    },
    {
      key: 'reports',
      label: <FormattedMessage id="AdminNavbar.supportCenter" />,
    },
  ];
  return (
    <nav className={`d-flex justify-content-between border border-bottom p-2`}>
      <LogoIcon className={`${style.logo}`} />
      <ul
        className={`nav nav-pills justify-content-center align-items-center ${style.navItemWrapper}`}
      >
        {tabs.map(tab => (
          <li className={`nav-item`} key={tab.key}>
            <Link to={`/admin/${tab.key}`}>
              <span
                className={`nav-link ${
                  params.tab === tab.key ? activeNavClassName : inactiveNavClassName
                }`}
              >
                {tab.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className={`d-flex justify-content-center align-items-center`}>
        {currentUser && currentUser.customerAvatar ? (
          <div className="nav-item dropdown p-1">
            <a
              className="nav-link dropdown-toggle p-0 d-flex align-items-center"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className={style.avatarWrapper}>
                <img
                  src={currentUser.customerAvatar}
                  className={style.userAvatar}
                  alt="User profile"
                />
              </div>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-lg-end position-absolute mt-1"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link to={`/user/${currentUser._id}`} className="dropdown-item">
                  {userDropdownProfileLabel}
                </Link>
              </li>
              <hr className="dropdown-divider" />
              <li>
                <button
                  className={`${style.authButton}`}
                  onClick={() => dispatch(logOut())}
                >
                  {userDropdownLogoutBtnLabel}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // <div className={style.avatarWrapper}>
          //   <img
          //     src={currentUser?.customerAvatar}
          //     className={style.userAvatar}
          //     alt="User profile"
          //   />
          // </div>
          <BsPersonCircle size={30} />
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
