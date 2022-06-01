import React, { FC } from 'react';

import Form from 'react-bootstrap/Form';

import { BsChevronDown } from 'react-icons/bs';

import { Column, customer } from '../../app/util/interfaces';
import { Table } from '../../components';
import style from './AdminUserManagementPage.module.css';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';

interface Props {
  users: customer[];
  onActivateUser: Function;
  onDeactivateUser: Function;
  intl: IntlShape;
}
const UserTable: FC<Props> = props => {
  const { users, onActivateUser, onDeactivateUser, intl } = props;
  const actionDropdownPlaceholder = (
    <FormattedMessage id="AdminUserManagementPage.actionDropdownPlaceholder" />
  );
  const activateDropdownLabel = (
    <FormattedMessage id="AdminUserManagementPage.activateDropdownLabel" />
  );
  const deactivateDropdownLabel = (
    <FormattedMessage id="AdminUserManagementPage.deactivateDropdownLabel" />
  );
  const nameTableHeaderLabel = intl.formatMessage({
    id: 'AdminUserManagementPage.nameTableHeaderLabel',
  });
  const emailTableHeaderLabel = intl.formatMessage({
    id: 'AdminUserManagementPage.emailTableHeaderLabel',
  });
  const actionTableHeaderLabel = intl.formatMessage({
    id: 'AdminUserManagementPage.actionTableHeaderLabel',
  });
  const columns: Column[] = [
    { key: 'check', content: () => null, width: 10 },
    { path: 'customerName', label: nameTableHeaderLabel, bold: true },
    { path: 'customerEmail', label: emailTableHeaderLabel, width: 50 },
    {
      key: 'action',
      label: actionTableHeaderLabel,
      width: 20,
      content: (user: customer) => (
        <div className={`dropdown`}>
          <div
            id="actionsMenuDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className={`${style.actionBtn}`}
          >
            <span className={`me-2`}>{actionDropdownPlaceholder}</span>
            <BsChevronDown style={{ color: '#5c5c5c' }} />
          </div>
          <ul
            className="dropdown-menu position-absolute mt-1"
            aria-labelledby="actionsMenuDropdown"
          >
            <li>
              {user.customerStatus >= 0 ? (
                <span
                  onClick={() => onDeactivateUser(user._id)}
                  className="dropdown-item"
                >
                  {deactivateDropdownLabel}
                </span>
              ) : (
                <span onClick={() => onActivateUser(user._id)} className="dropdown-item">
                  {activateDropdownLabel}
                </span>
              )}
            </li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <Table columns={columns} data={users} className={`w-100 mt-3`} rowKeyPath={'_id'} />
  );
};

export default injectIntl(UserTable);
