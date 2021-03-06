import { FC } from 'react';
import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { BsPersonCircle } from 'react-icons/bs';

import { LogoIcon, UserAvatar } from '../../';
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: State) => state.auth.user);
  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
  };
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
      key: 'shop-management',
      label: <FormattedMessage id="AdminNavbar.shopManagement" />,
    },
    {
      key: 'refunds',
      label: <FormattedMessage id="AdminNavbar.refunds" />,
    },
    {
      key: 'reports',
      label: <FormattedMessage id="AdminNavbar.supportCenter" />,
    },
  ];
  return (
    <nav className={`d-flex justify-content-between border border-bottom p-2 bg-light`}>
      <LogoIcon className={`${style.logo}`} />
      <ul
        className={`nav nav-pills justify-content-center align-items-center ${style.navItemWrapper}`}
      >
        {tabs.map(tab => (
          <NavLink to={tab.key} key={tab.key} label={tab.label} />
        ))}
      </ul>
      <div className={`d-flex justify-content-center align-items-center`}>
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
              <UserAvatar
                image={currentUser?.customerAvatar!}
              />
            </div>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-lg-end position-absolute mt-1"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link to={`/user/${currentUser?._id}`} className="dropdown-item">
                {userDropdownProfileLabel}
              </Link>
            </li>
            <hr className="dropdown-divider" />
            <li>
              <button className={`${style.authButton}`} onClick={handleLogout}>
                {userDropdownLogoutBtnLabel}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
interface NavLinkProps {
  to: string;
  label: any;
}

const NavLink: FC<NavLinkProps> = ({ to, children, label, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname });
  const activeNavClassName = 'active bg-dark';
  const inactiveNavClassName = 'text-dark';
  return (
    <li className={`nav-item`}>
      <Link to={to} {...props}>
        <span
          className={`nav-link ${isActive ? activeNavClassName : inactiveNavClassName}`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

export default AdminNavbar;
