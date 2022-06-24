import React, { useState } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import style from './ReviewsPage.module.css';
import { Button, Dropdown } from 'react-bootstrap';
import ReviewProduct from './ReviewProduct/ReviewProduct';

interface IProps {
  review: any;
  handleReload: Function;
}

const Review: React.FC<IProps> = props => {
  const { review } = props;
  const { product } = review;

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const renderStars = (productRating: number) => {
    const starArray: Array<any> = [];
    let rating = productRating;
    for (let key = 1; key <= 5; key++) {
      if (rating > 0) {
        starArray.push(<i className={'bi-star-fill ' + style.yellowStar} key={key} />);
      } else {
        starArray.push(<i className={'bi-star-fill ' + style.grayStar} key={key} />);
      }
      rating = rating - 1;
    }

    return <div>{starArray}</div>;
  };

  return (
    <div key={review._id} className={style.review}>
      <div className={style.reviewContent}>
        <div className="d-flex justify-content-between align-items-center">
          <div className={style.authorInfo}>
            <FormattedMessage id="ReviewsPage.reviewItemTitle" />
            <div className="w-100 d-block">
              <Link to={`/product/${product._id}`}>
                <div className={'w-100 d-block text-truncate ' + style.productName}>
                  {product.productName}
                </div>
              </Link>
            </div>
            <div className="w-100">
              <FormattedMessage id="ReviewsPage.reviewItemTitleConnectingWord" />
              <span className="ms-1">
                <FormattedDate value={review.createdAt} />
              </span>
            </div>
          </div>

          <div>
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              <FormattedMessage id="ReviewsPage.editReviewLabel" />
            </Button>
          </div>
        </div>

        <div className={style.reviewBody}>
          <div>{renderStars(review.productRating)}</div>
          {review.productReview && (
            <div>
              <FormattedMessage id="ReviewsPage.reviewPrefix" /> {review.productReview}
            </div>
          )}
        </div>

        {review.reviewPictures ? (
          <div className={style.reviewImages}>
            {review.reviewPictures.map((img: string) => (
              <img src={img} key={img} />
            ))}
          </div>
        ) : null}
      </div>

      {isEditing ? (
        <ReviewProduct
          review={review}
          handleClose={() => {
            setIsEditing(false);
            props.handleReload();
          }}
        />
      ) : null}
    </div>
  );
};

export default Review;
