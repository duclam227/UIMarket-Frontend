import { FC } from 'react';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';

import { BsChevronDown } from 'react-icons/bs';

import { Column, shop } from '../../app/util/interfaces';
import { Table } from '../../components';
import style from '../AdminUserManagementPage/AdminUserManagementPage.module.css';

interface Props {
  shops: shop[] | null;
  onActivateShop: Function;
  onDeactivateShop: Function;
  intl: IntlShape;
}

const ShopsTable: FC<Props> = props => {
  const { shops, onActivateShop, onDeactivateShop, intl } = props;
  const storeNameTableHeaderLabel = intl.formatMessage({
    id: 'AdminShopManagementPage.storeNameTableHeaderLabel',
  });
  const storeEmailTableHeaderLabel = intl.formatMessage({
    id: 'AdminShopManagementPage.storeEmailTableHeaderLabel',
  });
  const shopStatusTableHeaderLabel = intl.formatMessage({
    id: 'AdminShopManagementPage.shopStatusTableHeaderLabel',
  });
  const actionDropdownPlaceholder = (
    <FormattedMessage id="AdminUserManagementPage.actionDropdownPlaceholder" />
  );
  const activateDropdownLabel = (
    <FormattedMessage id="AdminUserManagementPage.activateDropdownLabel" />
  );
  const deactivateDropdownLabel = (
    <FormattedMessage id="AdminUserManagementPage.deactivateDropdownLabel" />
  );
  const actionTableHeaderLabel = intl.formatMessage({
    id: 'AdminUserManagementPage.actionTableHeaderLabel',
  });
  const columns: Column[] = [
    { key: 'check', content: () => null, width: 5 },
    { path: 'shopName', label: storeNameTableHeaderLabel, width: 25, bold: true },
    { path: 'shopEmail', label: storeEmailTableHeaderLabel, width: 25 },
    {
      key: 'shopStatus',
      label: shopStatusTableHeaderLabel,
      width: 25,
      content: (shop: shop) => {
        console.log(shop.shopStatus)
        switch (shop.shopStatus) {
          case 1:
            return <FormattedMessage id="AdminUserManagementPage.activeShopStatus" />;
          case 0:
            return <FormattedMessage id="AdminUserManagementPage.inactiveShopStatus" />;
          default:
            return null;
        }
      },
    },
    {
      key: 'action',
      label: actionTableHeaderLabel,
      width: 20,
      content: (shop: shop) => (
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
              {shop.shopStatus > 0 ? (
                <button
                  onClick={() => onDeactivateShop(shop._id)}
                  className="dropdown-item"
                >
                  {deactivateDropdownLabel}
                </button>
              ) : (
                <button
                  onClick={() => onActivateShop(shop._id)}
                  className="dropdown-item"
                >
                  {activateDropdownLabel}
                </button>
              )}
            </li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <Table columns={columns} data={shops} className={`w-100 mt-3`} rowKeyPath={'_id'} />
  );
};

export default injectIntl(ShopsTable);
