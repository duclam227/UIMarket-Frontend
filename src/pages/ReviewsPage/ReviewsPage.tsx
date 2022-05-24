import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { State } from '../../redux/store';

import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';
import reviewAPI from '../../api/review';

import { OneToFivePage } from '../../components';

import Review from './Review';

import style from './ReviewsPage.module.css';

const ITEMS_PER_PAGE = 15;

interface IProps {
  intl: IntlShape;
}

const ReviewsPage: FC<IProps> = (props) => {
  const { intl } = props;

  const currentUser = useSelector((state: State) => state.auth.user);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Array<any> | null>(null);

  useEffect(() => {
    setIsLoading(true);
    reviewAPI.getReviewsOfUserByPage(1, ITEMS_PER_PAGE)
      .then((res: any) => {
        const { reviews } = res;
        setReviews([...reviews]);
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.auth[errorMsg as keyof typeof errorCodes.auth];
        toast.error(intl.formatMessage({ id: `LoginForm.${errorCode}` }))
      })
  }, [])

  return (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.content}>
          <section className={style.header}>
            <div>
              <h2 className={style.title}>
                <FormattedMessage id="ReviewsPage.title" />
              </h2>
              <h6>
                <FormattedMessage id="ReviewsPage.subtitle" />
              </h6>
            </div>
          </section>
          <section className={style.body}>
            {isLoading
              ? <Spinner animation='border' />
              : reviews && reviews.length > 0
                ? <div className={style.productList}>
                  {reviews.map((review: any) => <Review review={review} />)}
                </div>
                : <div className={style.noProducts}>
                  <FormattedMessage id='ReviewsPage.noReviewsMessage' />
                </div>
            }
          </section>

        </div>
      </div>
    </OneToFivePage >
  )
};

export default injectIntl(ReviewsPage);