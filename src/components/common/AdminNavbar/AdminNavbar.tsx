import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { BsPerson, BsPersonCircle } from 'react-icons/bs';
import { LogoIcon } from '../../';

import style from './AdminNavbar.module.css';
import { FormattedMessage } from 'react-intl';
const AdminNavbar = () => {
  const params = useParams();
  const activeNavClassName = 'active bg-dark';
  const inactiveNavClassName = 'text-dark';
  const renderNavItems = () => {};
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
        <BsPersonCircle size={30} />
      </div>
    </nav>
  );
};

export default AdminNavbar;
