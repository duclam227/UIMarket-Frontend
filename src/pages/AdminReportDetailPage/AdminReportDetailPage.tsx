import { useEffect, useState, FC } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FormattedDate,
  FormattedMessage,
  FormattedTime,
  IntlShape,
  injectIntl,
} from 'react-intl';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import { BsCheckCircleFill, BsXCircleFill, BsChevronLeft } from 'react-icons/bs';

import adminAPI from '../../api/admin';
import { getErrorMessage } from '../../app/util';
import { Paginator } from '../../components';

const ITEMS_PER_PAGE = 3;

interface ReportDetails {
  createdAt: Date;
  objectType: string;
  reason: string;
  reportObject: string;
  userId: string;
  _id: string;
}

interface Props {
  intl: IntlShape;
}

const AdminReportDetailPage: FC<Props> = props => {
  const { intl } = props;
  const goBackButtonLabel = (
    <FormattedMessage id="AdminReportDetailPage.goBackButtonLabel" />
  );
  const pageTitleLabel = <FormattedMessage id="AdminReportDetailPage.pageTitleLabel" />;
  const reportIdLabel = <FormattedMessage id="AdminReportDetailPage.reportIdLabel" />;
  const reportObjectNumberLabel = (
    <FormattedMessage id="AdminReportDetailPage.reportObjectNumberLabel" />
  );
  const dateReportedLabel = (
    <FormattedMessage id="AdminReportDetailPage.dateReportedLabel" />
  );
  const reportedByLabel = <FormattedMessage id="AdminReportDetailPage.reportedByLabel" />;
  const reasonLabel = <FormattedMessage id="AdminReportDetailPage.reasonLabel" />;
  const approveBtnLabel = <FormattedMessage id="AdminReportDetailPage.approveBtnLabel" />;
  const rejectBtnLabel = <FormattedMessage id="AdminReportDetailPage.rejectBtnLabel" />;
  const cannotGetDataErrorMsg = intl.formatMessage({
    id: 'ErrorMessage.cannotGetDataErrorMsg',
  });

  const params = useParams();
  const navigate = useNavigate();
  const [reportDetails, setReportDetails] = useState<ReportDetails[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    const getReportDetails = async () => {
      try {
        if (!params.id) throw new Error('Not found');
        let res: any = await adminAPI.getReportDetails(params.id, 1, ITEMS_PER_PAGE);
        if (res.reports.length === 0) throw new Error('Empty array');
        const { reports, totalPages, page } = res;
        setReportDetails(reports);
        setCurrentPage(page);
        setTotalPages(totalPages);
      } catch (e) {
        toast.error(cannotGetDataErrorMsg);
        console.log(getErrorMessage(e));
      }
    };
    getReportDetails();
  }, []);
  const handleApproveReport = async () => {
    if (!params.id) return;
    try {
      await adminAPI.acceptReport(params.id);
      toast.success('Report approved!');
      navigate('/admin/reports');
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  const handleRejectReport = async () => {
    if (!params.id) return;
    try {
      await adminAPI.rejectReport(params.id);
      toast.success('Report rejected successfully!');
      navigate('/admin/reports');
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
  };
  const goToPage = async (pageNumber: number) => {
    setReportDetails(null);
    try {
      if (!params.id) throw new Error('Not found');
      const res: any = await adminAPI.getReportDetails(
        params.id,
        pageNumber,
        ITEMS_PER_PAGE,
      );
      if (res.reports.length === 0) throw new Error('Empty array');
      const { reports, totalPages, page } = res;
      setReportDetails(reports);
      setCurrentPage(page);
      setTotalPages(totalPages);
    } catch (error) {
      toast.error(cannotGetDataErrorMsg);
      console.log(error);
    }
  };

  return (
    <Container className={`p-0`}>
      <Row className={`bg-white p-4 border`}>
        <Link
          to="/admin/reports"
          className="d-flex align-items-center"
          style={{ width: 'fit-content' }}
        >
          <div className="d-flex align-items-center justify-content center me-2">
            <BsChevronLeft />
          </div>
          <span>{goBackButtonLabel}</span>
        </Link>
        <h2 className="mt-3">{pageTitleLabel}</h2>
      </Row>
      {reportDetails ? (
        <>
          {' '}
          <Row className={`bg-white p-4 border my-4`}>
            <h3>
              {reportIdLabel} {params.id}
            </h3>
            <Accordion defaultActiveKey={['0']} alwaysOpen className={`my-3`}>
              {reportDetails.map((report, index) => (
                <Accordion.Item key={report._id} eventKey={index.toString()}>
                  <Accordion.Header>
                    {reportObjectNumberLabel} {index + 1}
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      {dateReportedLabel} <FormattedDate value={report.createdAt} />{' '}
                      <FormattedTime value={report.createdAt} />
                    </p>
                    <p>
                      {reportedByLabel}{' '}
                      <Link to={`/user/${report.userId}`}>
                        {`${process.env.REACT_APP_BASE_CLIENT_URL}/user/${report.userId}`}
                      </Link>
                    </p>
                    <p>
                      {reasonLabel}
                      {report.reason}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            <Paginator
              totalNumberOfPages={totalPages}
              currentPage={currentPage}
              handleClickGoToPage={(number: number) => goToPage(number)}
            />
            <div className={`d-flex justify-content-center`}>
              <Button
                variant="primary"
                className="me-3 d-flex align-items-center justify-content-evenly"
                onClick={() => handleApproveReport()}
              >
                <BsCheckCircleFill />
                <span className="ms-1">{approveBtnLabel}</span>
              </Button>
              <Button
                variant="secondary"
                className="d-flex align-items-center justify-content-evenly"
                onClick={() => handleRejectReport()}
              >
                <BsXCircleFill />
                <span className="ms-1">{rejectBtnLabel}</span>
              </Button>
            </div>
          </Row>
        </>
      ) : (
        <Row className={`justify-content-center mt-3`}>
          <Spinner animation="border" />
        </Row>
      )}
    </Container>
  );
};

export default injectIntl(AdminReportDetailPage);
