import { FC } from 'react';
import { FormattedMessage, IntlShape, injectIntl, FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { BsCardList } from 'react-icons/bs';

import { Column } from '../../app/util/interfaces';
import { Table } from '../../components';
import style from '../AdminUserManagementPage/AdminUserManagementPage.module.css';
import { RefundObject } from './AdminRefundPage';

interface Props {
  refunds: RefundObject[] | null;
  intl: IntlShape;
}

const RefundsTable: FC<Props> = props => {
  const { refunds, intl } = props;

  const idTableHeaderLabel = intl.formatMessage({
    id: 'AdminReportPage.idTableHeaderLabel',
  });
  const dateTableHeaderLabel = intl.formatMessage({
    id: 'ShopWalletPage.transactionTableDateLabel',
  });
  const statusTableHeaderLabel = intl.formatMessage({
    id: 'ShopWalletPage.transactionTableStatusLabel',
  });
  const requestedBy = intl.formatMessage({
    id: 'RefundsTable.requestedBy',
  });
  const viewDetailsBtnlabel = (
    <FormattedMessage id="AdminReportPage.viewDetailsBtnlabel" />
  );
  const actionTableHeaderLabel = intl.formatMessage({
    id: 'AdminUserManagementPage.actionTableHeaderLabel',
  });

  const columns: Column[] = [
    { path: '_id', label: idTableHeaderLabel, width: 5 },
    {
      key: 'username',
      label: requestedBy,
      width: 15,
      content: (refund: RefundObject) => (
        <div className="fw-bold">{refund.userId.customerName}</div>
      ),
    },
    {
      key: 'date',
      label: dateTableHeaderLabel,
      width: 15,
      content: (refund: RefundObject) => (
        <FormattedDate
          value={refund.createdAt}
          year="numeric"
          month="short"
          day="numeric"
        />
      ),
    },
    {
      path: 'refundStatus',
      label: statusTableHeaderLabel,
      width: 15,
    },
    {
      key: 'action',
      label: actionTableHeaderLabel,
      width: 15,
      content: (refund: RefundObject) => (
        <Link to={`/admin/refunds/${refund._id}`}>
          <Button
            variant="light"
            className={`${style.actionBtn} d-flex align-items-center justify-content-center`}
          >
            <span className={`me-2`}>{viewDetailsBtnlabel}</span>
            <BsCardList />
          </Button>
        </Link>
      ),
    },
  ];
  return (
    <Table columns={columns} data={refunds} className={`w-100 mt-3`} rowKeyPath={'_id'} />
  );
  return <div>RefundsTable</div>;
};

export default injectIntl(RefundsTable);
