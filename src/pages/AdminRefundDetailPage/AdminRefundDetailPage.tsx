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
import Col from 'react-bootstrap/Col';

import { BsCheckCircleFill, BsXCircleFill, BsChevronLeft } from 'react-icons/bs';

import adminAPI from '../../api/admin';
import style from './AdminRefundDetailPage.module.css';
interface Props {
  intl: IntlShape;
}
interface RefundDetail {
  _id: string;
  refundAmount: number;
  userId: {
    _id: string;
    customerName: string;
  };
  invoiceId: string;
  licenseIds: {
    _id: string;
    shop: {
      _id: string;
      shopName: string;
    };
    product: {
      _id: string;
      productName: string;
    };
    productPrice: number;
  }[];
  refundReason: string;
  refundEvidences: string[];
  refundStatus: string;
  createdAt: Date;
}
const AdminRefundDetailPage: FC<Props> = props => {
  const { intl } = props;
  const params = useParams();
  const navigate = useNavigate();
  const [refundDetail, setRefundDetail] = useState<RefundDetail | null>(null);
  const [refundIsResolved, setRefundIsResolved] = useState<boolean>(false);
  const goBackButtonLabel = (
    <FormattedMessage id="AdminReportDetailPage.goBackButtonLabel" />
  );
  const cannotGetDataErrorMsg = intl.formatMessage({
    id: 'ErrorMessage.cannotGetDataErrorMsg',
  });
  const pageTitle = <FormattedMessage id="AdminRefundDetailPage.pageTitle" />;
  const productInfoHeader = (
    <FormattedMessage id="AdminRefundDetailPage.productInfoHeader" />
  );
  const productNameLabel = (
    <FormattedMessage id="AdminRefundDetailPage.productNameLabel" />
  );
  const shopNameLabel = <FormattedMessage id="AdminRefundDetailPage.shopNameLabel" />;
  const requestDetailHeader = (
    <FormattedMessage id="AdminRefundDetailPage.requestDetailHeader" />
  );
  const refundStatusLabel = (
    <FormattedMessage id="AdminRefundDetailPage.refundStatusLabel" />
  );
  const refundAmountLabel = (
    <FormattedMessage id="AdminRefundDetailPage.refundAmountLabel" />
  );
  const requestedByLabel = (
    <FormattedMessage id="AdminRefundDetailPage.requestedByLabel" />
  );
  const requestedTimeLabel = (
    <FormattedMessage id="AdminRefundDetailPage.requestedTimeLabel" />
  );
  const reasonLabel = <FormattedMessage id="AdminRefundDetailPage.reasonLabel" />;
  const evidenceLabel = <FormattedMessage id="AdminRefundDetailPage.evidenceLabel" />;
  const approveRefundLabel = (
    <FormattedMessage id="AdminRefundDetailPage.approveRefundLabel" />
  );
  const rejectRefundLabel = (
    <FormattedMessage id="AdminRefundDetailPage.rejectRefundLabel" />
  );
  useEffect(() => {
    const getRefundDetail = async () => {
      try {
        if (!params.id) return;
        const res: any = await adminAPI.getRefundDetails(params.id);
        const { refund } = res;
        setRefundDetail(refund);
        setRefundIsResolved(refund?.refundStatus !== 'Pending');
      } catch (error) {
        toast.error(cannotGetDataErrorMsg);
      }
    };
    getRefundDetail();
  }, []);
  const handleRejectRefund = async () => {
    try {
      await adminAPI.rejectRefund(refundDetail?._id!);
      navigate('/admin/refunds');
      toast.success('Action completed successfully');
    } catch (e) {
      console.log(e);
      toast.error('Something went wrong!');
    }
  };
  const handleApproveRefund = async () => {
    try {
      await adminAPI.acceptRefund(refundDetail?._id!);
      navigate('/admin/refunds');
      toast.success('Action completed successfully');
    } catch (e) {
      console.log(e);
      toast.error('Something went wrong!');
    }
  };
  return (
    <Container className={`p-0`}>
      <Row className={`bg-white p-4 border`}>
        <Link
          to="/admin/refunds"
          className="d-flex align-items-center"
          style={{ width: 'fit-content' }}
        >
          <div className="d-flex align-items-center justify-content center me-2">
            <BsChevronLeft />
          </div>
          <span>{goBackButtonLabel}</span>
        </Link>
        <h2 className="mt-3">{pageTitle}</h2>
      </Row>
      {refundDetail ? (
        <Row className={`my-4`}>
          <Col lg={9} className={`bg-white p-4 border`}>
            <h4>{productInfoHeader}</h4>
            <p>
              {productNameLabel}
              <Link to={`/product/${refundDetail?.licenseIds[0].product._id}`}>
                {refundDetail?.licenseIds[0].product.productName}
              </Link>
            </p>
            <p>
              {shopNameLabel}{' '}
              <Link to={`/shop/${refundDetail?.licenseIds[0].shop._id}`}>
                {refundDetail?.licenseIds[0].shop.shopName}
              </Link>
            </p>

            <h4>{requestDetailHeader}</h4>
            <p>
              {refundStatusLabel} {refundDetail?.refundStatus}
            </p>
            <p>
              {refundAmountLabel} {refundDetail?.refundAmount}$
            </p>
            <p>
              {requestedByLabel}{' '}
              <Link to={`/user/${refundDetail?.userId._id}`}>
                {refundDetail?.userId.customerName}
              </Link>
            </p>
            <p>
              {requestedTimeLabel}
              <FormattedDate value={refundDetail?.createdAt} />{' '}
              <FormattedTime value={refundDetail?.createdAt} />
            </p>
            <p>
              {reasonLabel} {refundDetail?.refundReason}{' '}
            </p>
            <p>{evidenceLabel} </p>
            <div className={`${style.evidencePicturesContainer}`}>
              {refundDetail?.refundEvidences.map((imageUrl, index) => (
                <img
                  key={imageUrl}
                  src={imageUrl}
                  alt={`Refund evidence ${index + 1}`}
                  className={`${style.evidencePicture}`}
                />
              ))}
            </div>
          </Col>
          <Col lg={3} className={`d-flex justify-content-center align-items-start pt-3`}>
            <div
              className={`d-flex flex-column justify-content-center ${style.floatingButtonsContainer}`}
            >
              <Button
                variant="primary"
                className={`d-flex mb-3 align-items-center justify-content-evenly`}
                onClick={handleApproveRefund}
                disabled={refundIsResolved || refundDetail.refundAmount <= 0}
              >
                <BsCheckCircleFill />
                <span className="ms-1">{approveRefundLabel}</span>
              </Button>
              <Button
                variant="secondary"
                className={`d-flex align-items-center justify-content-evenly`}
                onClick={handleRejectRefund}
                disabled={refundIsResolved || refundDetail.refundAmount <= 0}
              >
                <BsXCircleFill />
                <span className="ms-1">{rejectRefundLabel}</span>
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <Row className={`my-4 justify-content-center`}>
          <Spinner animation="border" />
        </Row>
      )}
    </Container>
  );
};

export default injectIntl(AdminRefundDetailPage);
