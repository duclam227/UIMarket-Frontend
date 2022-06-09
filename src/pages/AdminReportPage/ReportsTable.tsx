import { FC } from 'react';
import { FormattedMessage, IntlShape, injectIntl, FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { BsCardList } from 'react-icons/bs';

import { Column, ReportObject } from '../../app/util/interfaces';
import { Table } from '../../components';
import style from '../AdminUserManagementPage/AdminUserManagementPage.module.css';

interface Props {
  reports: ReportObject[] | null;
  intl: IntlShape;
}

const ReportsTable: FC<Props> = props => {
  const { reports, intl } = props;
  const idTableHeaderLabel = intl.formatMessage({
    id: 'AdminReportPage.idTableHeaderLabel',
  });
  const typeTableHeaderLabel = intl.formatMessage({
    id: 'AdminReportPage.typeTableHeaderLabel',
  });
  const dateTableHeaderLabel = intl.formatMessage({
    id: 'ShopWalletPage.transactionTableDateLabel',
  });
  const statusTableHeaderLabel = intl.formatMessage({
    id: 'ShopWalletPage.transactionTableStatusLabel',
  });
  const pendingStatusLabel = intl.formatMessage({
    id: 'ShopWalletPage.transactionStatusPending',
  });
  const viewDetailsBtnlabel = (
    <FormattedMessage id="AdminReportPage.viewDetailsBtnlabel" />
  );
  const actionTableHeaderLabel = intl.formatMessage({
    id: 'AdminUserManagementPage.actionTableHeaderLabel',
  });
  const columns: Column[] = [
    { path: '_id', label: idTableHeaderLabel, width: 10, bold: true },
    { path: 'objectType', label: typeTableHeaderLabel, width: 10 },
    {
      key: 'date',
      label: dateTableHeaderLabel,
      width: 15,
      content: (report: ReportObject) => (
        <FormattedDate
          value={report.createdAt}
          year="numeric"
          month="short"
          day="numeric"
        />
      ),
    },
    {
      key: 'resolveFlag',
      label: statusTableHeaderLabel,
      width: 15,
      content: (report: ReportObject) => {
        switch (report.resolveFlag) {
          case 0:
            return pendingStatusLabel;
          default:
            return report.resolveFlag;
        }
      },
    },
    {
      key: 'action',
      label: actionTableHeaderLabel,
      width: 15,
      content: (report: ReportObject) => (
        <Link to={`/admin/reports/${report.reportObject}`}>
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
    <Table columns={columns} data={reports} className={`w-100 mt-3`} rowKeyPath={'_id'} />
  );
};

export default injectIntl(ReportsTable);
