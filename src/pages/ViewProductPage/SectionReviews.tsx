import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Paginator, UserAvatar } from '../../components';

import style from './ViewProductPage.module.css';

interface Props {
  reviews: Array<any>;
  totalPages: number;
  currentPage: number;
  handleGoToPage: Function;
}

const SectionReviews: React.FC<Props> = (props) => {
  const { reviews, totalPages, currentPage } = props;

  const renderReview = (review: any) => {
    return (
      <div key={review._id} className={style.review}>
        <div className={style.sideContent}>
          <UserAvatar image={review.user.customerAvatar} />
        </div>
        <div className={style.reviewContent}>
          <div className={style.authorInfo}>
            {review.user.customerName}
          </div>
          {review.productReview}
          <div className={style.footerContent}>
            {renderStars(review.productRating)}
          </div>

        </div>
      </div >
    )
  }

  const renderStars = (productRating: number) => {
    const starArray: Array<any> = [];
    let rating = productRating;
    for (let key = 1; key <= 5; key++) {
      if (rating > 0) {
        starArray.push(
          <i className={'bi-star-fill ' + style.yellowStar} key={key} />,
        );
      } else {
        starArray.push(
          <i className={'bi-star-fill ' + style.grayStar} key={key} />,
        );
      }
      rating = rating - 1;
    }

    return <div>{starArray}</div>;
  };

  return reviews && reviews.length > 0
    ? (
      <section className={style.body}>
        <h3><FormattedMessage id='ViewProductPage.ReviewTitle' /></h3>
        {reviews.map((review, index) => {
          return renderReview(review);
        })}
        <Paginator
          currentPage={currentPage}
          totalNumberOfPages={totalPages}
          handleClickGoToPage={(page: number) => props.handleGoToPage(page)}
        />
      </section>
    )
    : null
}

export default SectionReviews;