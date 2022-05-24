import React, { useState } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import style from './ReviewsPage.module.css';
import { Button, Dropdown } from 'react-bootstrap';
import ReviewProduct from './ReviewProduct/ReviewProduct';

interface IProps {
  review: any;
}

const Review: React.FC<IProps> = (props) => {
  const { review } = props;
  const { product } = review;

  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  return (
    <div key={review._id} className={style.review}>
      <div className={style.reviewContent}>
        <div className={style.authorInfo}>
          <FormattedMessage id='ReviewsPage.reviewItemTitle' />
          <Link to={`/product/${product._id}`}>
            <div className={style.productName}>{product.productName}</div>
          </Link>
          <FormattedMessage id='ReviewsPage.reviewItemTitleConnectingWord' />
          <span><FormattedDate value={review.createdAt} /></span>
          <div className={style.ratingHeader}>
            {renderStars(review.productRating)}
          </div>
        </div>

        {review.productReview
          ?
          <div className={style.reviewBody}>
            <FormattedMessage id='ReviewsPage.reviewPrefix' /> {review.productReview}
          </div>
          : null
        }
        {review.reviewPictures
          ?
          <div className={style.reviewImages}>
            {review.reviewPictures.map((img: string) => <img src={img} key={img} />)}
          </div>
          : null
        }
        <div className={style.footerContent}>
          <Button variant='primary' className={style.menuButton} onClick={() => setIsEditing(true)}>
            <FormattedMessage id='ReviewsPage.editReviewLabel' />
          </Button>
        </div>

      </div>

      {isEditing
        ? <ReviewProduct
          review={review}
          handleClose={() => setIsEditing(false)}
        />
        : null
      }
    </div >
  )
};

export default Review;