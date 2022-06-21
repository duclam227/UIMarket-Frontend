import { FC, useEffect, useState, ChangeEvent } from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { BsSearch } from 'react-icons/bs';

import { Paginator } from '../../components';
import style from './AdminRefundPage.module.css';
import adminAPI from '../../api/admin';
import RefundsTable from './RefundsTable';

const ITEMS_PER_PAGE = 5;
export interface RefundObject {
  _id: string;
  createdAt: Date;
  userId: { _id: string; customerName: string };
  invoiceIds: string;
  licenseIds: string[];
  refundEvidences: string[];
  refundReason: string;
  refundStatus: string;
}
interface Props {
  intl: IntlShape;
}

const AdminRefundPage: FC<Props> = props => {
  const { intl } = props;

  const searchBarPlaceholder = intl.formatMessage({
    id: 'CommonNavbar.searchBarPlaceholder',
    defaultMessage: 'Search',
  });

  const sortBySelectLabel = <FormattedMessage id="ProductListPage.sortBySelectLabel" />;
  const sortOptionNewest = intl.formatMessage({
    id: 'AdminRefundPage.sortOptionNewest',
  });
  const sortOptionOldest = intl.formatMessage({
    id: 'AdminRefundPage.sortOptionOldest',
  });

  const filterSelectLabel = <FormattedMessage id="AdminRefundPage.filterSelectLabel" />;
  const filterOptionAll = intl.formatMessage({
    id: 'AdminRefundPage.filterOptionAll',
  });
  const filterOptionPending = intl.formatMessage({
    id: 'AdminRefundPage.filterOptionPending',
  });
  const filterOptionSolved = intl.formatMessage({
    id: 'AdminRefundPage.filterOptionSolved',
  });

  const cannotGetDataErrorMsg = intl.formatMessage({
    id: 'ErrorMessage.cannotGetDataErrorMsg',
  });
  const filterOptions = [
    // (STATUS_ALL = 'all'),
    // (STATUS_PENDING = 'pending'),
    // (STATUS_ACCEPT = 'accept'),
    // (STATUS_REJECT = 'reject'),
    // (STATUS_SOLVED = 'solved'),
    { value: 'all', label: filterOptionAll },
    { value: 'pending', label: filterOptionPending },
    { value: 'solved', label: filterOptionSolved },
  ];
  const sortOptions = [
    { value: 'oldest', label: sortOptionOldest },
    { value: 'newest', label: sortOptionNewest },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const [refunds, setRefunds] = useState<RefundObject[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getAllRefunds = async () => {
      setRefunds(null);
      try {
        const res: any = await adminAPI.getAllRefunds(
          1,
          ITEMS_PER_PAGE,
          searchParams.get('filter'),
          searchParams.get('sort'),
        );
        const { refunds, totalPages, page } = res;
        setRefunds(refunds);
        setCurrentPage(page);
        setTotalPages(totalPages);
      } catch (error) {
        toast.error(cannotGetDataErrorMsg);
        console.log(error);
      }
    };
    getAllRefunds();
  }, [searchParams]);

  const goToPage = async (pageNumber: number) => {
    setRefunds(null);
    try {
      const res: any = await adminAPI.getAllRefunds(pageNumber, ITEMS_PER_PAGE);
      const { refunds, totalPages } = res;
      setRefunds(refunds);
      setCurrentPage(pageNumber);
      setTotalPages(totalPages);
    } catch (error) {
      toast.error(cannotGetDataErrorMsg);
      console.log(error);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    searchParams.set(name, value);
    setSearchParams(searchParams.toString());
  };
  return (
    <Container className={`bg-white w-75 py-4 px-4 mt-3 rounded ${style.container}`}>
      {/* <Form className={style.searchBarWrapper}>
        <div className={style.searchBar}>
          <BsSearch className={style.searchIcon} />
          <Form.Control
            type="text"
            placeholder={searchBarPlaceholder}
            // onChange={e => handleChange(e as any)}
          />
        </div>
      </Form> */}
      <Row className={`pt-3 pb-1 w-100`}>
        <Col lg={{ span: 4 }} className={`d-flex align-items-center`}>
          <h6 className="text-nowrap me-3 p-0 m-0">{sortBySelectLabel} </h6>
          <Form.Select name="sort" onChange={e => handleChange(e)} className={`bg-light`}>
            {sortOptions.map(option => (
              <option
                key={option.value}
                value={option.value}
                selected={searchParams.get('sort') === option.value}
              >
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={{ span: 3 }} className={`d-flex align-items-center`}>
          <h6 className="text-nowrap me-3 p-0 m-0">{filterSelectLabel} </h6>
          <Form.Select
            name="filter"
            onChange={e => handleChange(e)}
            className={`bg-light`}
          >
            {filterOptions.map(option => (
              <option
                key={option.value}
                value={option.value}
                selected={searchParams.get('filter') === option.value}
              >
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <RefundsTable refunds={refunds} />
      <Paginator
        totalNumberOfPages={totalPages}
        currentPage={currentPage}
        handleClickGoToPage={(number: number) => goToPage(number)}
      />
    </Container>
  );
};

export default injectIntl(AdminRefundPage);
