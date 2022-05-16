import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { State } from '../../redux/store';
import { product } from '../../app/util/interfaces';
import { getErrorMessage } from '../../app/util';
import { PageWithNavbar } from '../../components';

import productAPI from '../../api/product';
import reviewAPI from '../../api/review';

import SectionDescription from './SectionDescription';
import SectionHeader from './SectionHeader';
import SectionImages from './SectionImages';
import SectionReviews from './SectionReviews';

import style from './ViewProductPage.module.css';

const ITEMS_PER_PAGE = 10;

const ViewProductPage: React.FC = () => {
  const { id } = useParams();

  const currentUser = useSelector((state: State) => state.auth.user);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<product | null>(null);
  const [reviews, setReviews] = useState<Array<any> | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
        setProduct(res.product);
      })
      .catch(error => {
        console.log(error);
      });

    reviewAPI
      .getReviewsOfProductByPage(id!, 1, 10)
      .then((res: any) => {
        setReviews(res.reviews);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  return isLoading ? (
    <PageWithNavbar>
      <div className={style.wrapper}>
        <Spinner animation="border" />
      </div>
    </PageWithNavbar>
  ) : (
    <PageWithNavbar>
      <div className={style.wrapper}>
        {/* <div className={style.content}> */}
        <SectionHeader product={product!} currentUser={currentUser!} />
        <SectionImages images={product?.productPictures!} />
        <SectionDescription body={product?.productDescription!} />
        <SectionReviews
          reviews={reviews!}
          totalPages={totalPages}
          currentPage={currentPage}
          handleGoToPage={(page: number) => goToPage(page)}
        />
      </div>
    </PageWithNavbar>
  );
};

export default ViewProductPage;
