import React, { FC, useEffect, useState } from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import { BsSearch } from 'react-icons/bs';

import { Paginator } from '../../components';
import style from './AdminReportPage.module.css';
import adminAPI from '../../api/admin';
import { ReportObject, shop } from '../../app/util/interfaces';
import ReportsTable from './ReportsTable';

const ITEMS_PER_PAGE = 5;

interface Props {
  intl: IntlShape;
}

const AdminReportPage: FC<Props> = props => {
  const { intl } = props;
  const searchBarPlaceholder = intl.formatMessage({
    id: 'CommonNavbar.searchBarPlaceholder',
    defaultMessage: 'Search',
  });

  const [reports, setReports] = useState<ReportObject[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getAllReports = async () => {
      try {
        const res: any = await adminAPI.getAllReports(1, ITEMS_PER_PAGE);
        console.log('res', res);
        const { reports, totalPages, page } = res;
        setReports(reports);
        setCurrentPage(page);
        setTotalPages(totalPages);
      } catch (error) {
				toast.error('Cannot get data! An error has occurred');
        console.log(error);
      }
    };
    getAllReports();
  }, []);
  const goToPage = async (pageNumber: number) => {
    setReports(null);
    try {
      const res: any = await adminAPI.getAllReports(pageNumber, ITEMS_PER_PAGE);
      const { reports, totalPages } = res;
      setReports(reports);
      setCurrentPage(pageNumber);
      setTotalPages(totalPages);
    } catch (error) {
      toast.error('Cannot get data! An error has occurred');
      console.log(error);
    }
  };
  return (
    <Container className={`bg-white w-75 py-4 px-4 mt-3 rounded ${style.container}`}>
      <Form className={style.searchBarWrapper}>
        <div className={style.searchBar}>
          <BsSearch className={style.searchIcon} />
          <Form.Control
            type="text"
            placeholder={searchBarPlaceholder}
            // onChange={e => handleChange(e as any)}
          />
        </div>
      </Form>
      <ReportsTable
        reports={reports}
      />
      <Paginator
        totalNumberOfPages={totalPages}
        currentPage={currentPage}
        handleClickGoToPage={(number: number) => goToPage(number)}
      />
    </Container>
  );
};

export default injectIntl(AdminReportPage);
