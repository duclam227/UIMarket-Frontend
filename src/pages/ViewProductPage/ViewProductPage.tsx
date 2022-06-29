import React, { useEffect, useState } from 'react';
import { Button, Spinner, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import { BsFlag, BsExclamationOctagon } from 'react-icons/bs';

import { State } from '../../redux/store';
import { product } from '../../app/util/interfaces';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';

import { PageWithNavbar, ReportModal } from '../../components';

import productAPI from '../../api/product';
import reviewAPI from '../../api/review';

import SectionDescription from './SectionDescription';
import SectionHeader from './SectionHeader';
import SectionImages from './SectionImages';
import SectionReviews from './SectionReviews';

import style from './ViewProductPage.module.css';
import SectionSeller from './SectionSeller';
import SectionSuggestions from './SectionSuggestions';

const ITEMS_PER_PAGE = 10;

interface IProps {
  intl: IntlShape;
}

const ViewProductPage: React.FC<IProps> = props => {
  const { intl } = props;
  const { id } = useParams();

  const currentUser = useSelector((state: State) => state.auth.user);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<product | null>(null);
  const [reviews, setReviews] = useState<Array<any> | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [isBought, setIsBought] = useState<boolean | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const isCurrentUserSeller =
    currentUser?.customerEmail === product?.shopId.customerEmail;

  const handleShowReportModal = () => {
    setShowReportModal(true);
  };
  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const goToPage = (pageNumber: number) => {
    setIsLoading(true);
    reviewAPI
      .getReviewsOfProductByPage(id!, pageNumber, ITEMS_PER_PAGE)
      .then((res: any) => {
        const { totalPages, reviews, page } = res;
        setCurrentPage(page);
        setReviews(reviews);
        setTotalPages(totalPages);
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        console.log(errorMsg);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    productAPI
      .getProductById(id!)
      .then((res: any) => {
        console.log(res);
        setProduct(res.product);
        setIsBought(res.isBought);
        setIsActive(res.product.productStatus === 1);
        setIsDeleted(res.product.deleteFlagged === 1);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any =
          errorCodes.product[errorMsg as keyof typeof errorCodes.product];
        toast.error(intl.formatMessage({ id: `Product.${errorCode}` }));
      });

    reviewAPI
      .getReviewsOfProductByPage(id!, 1, 10)
      .then((res: any) => {
        setReviews(res.reviews);
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any =
          errorCodes.review[errorMsg as keyof typeof errorCodes.review];
        toast.error(intl.formatMessage({ id: `Review.${errorCode}` }));
      });
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return isLoading || !product ? (
    <PageWithNavbar>
      <div className={style.centerWrapper}>
        <Spinner animation="border" />
      </div>
    </PageWithNavbar>
  ) : (
    <PageWithNavbar>
      {isCurrentUserSeller ? (
        <div className={style.centerWrapper}>
          <Link to="edit" className={style.userManagePanel}>
            <FormattedMessage id="ViewProductPage.ownerMessage" />
            <FaPen />
          </Link>
        </div>
      ) : null}

      <div className={style.wrapper}>
        <div className={style.content}>
          <SectionImages images={product?.productPictures!} />
          <SectionDescription body={product?.productDescription!} />
          <SectionSuggestions
            product={product}
          />
          <SectionReviews
            reviews={reviews!}
            totalPages={totalPages}
            currentPage={currentPage}
            handleGoToPage={(page: number) => goToPage(page)}
          />
          <ReportModal
            show={showReportModal}
            onClose={handleCloseReportModal}
            reportObjectId={product._id!}
            type="product"
          />
        </div>
        <div className={style.contentRight}>
          <SectionHeader
            product={product!}
            currentUser={currentUser!}
            onShowReportModal={handleShowReportModal}
            isBought={isBought}
            isActive={isActive}
          />
          <SectionSeller product={product!} currentUser={currentUser!} />
          {currentUser && !isCurrentUserSeller && isActive ? (
            <div className={style.reportPanel} onClick={() => handleShowReportModal!()}>
              <BsFlag />
              <FormattedMessage id="ViewProductPage.reportProduct" />
            </div>
          ) : null}
        </div>
      </div>
      <Modal show={isDeleted} onHide={handleGoBack}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="ViewProductPage.deleteModalTitle" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <FormattedMessage id="ViewProductPage.deleteModalBody1" />
          </div>
          <div>
            <FormattedMessage id="ViewProductPage.deleteModalBody2" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleGoBack}>
            <FormattedMessage id="ViewProductPage.deleteModalBackBtnLabel" />
          </Button>
        </Modal.Footer>
      </Modal>
    </PageWithNavbar>
  );
};

export default injectIntl(ViewProductPage);
