import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { State } from '../../redux/store';

import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';
import reviewAPI from '../../api/review';

import { OneToFivePage } from '../../components';

import Review from './Review';
import illustration from '../../app/assets/error-not-found.png';

import style from './ReviewsPage.module.css';

const ITEMS_PER_PAGE = 15;

interface IProps {
  intl: IntlShape;
}

const ReviewsPage: FC<IProps> = props => {
  const { intl } = props;

  const currentUser = useSelector((state: State) => state.auth.user);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Array<any> | null>(null);

  useEffect(() => {
    setIsLoading(true);
    reviewAPI
      .getReviewsOfUserByPage(1, ITEMS_PER_PAGE)
      .then((res: any) => {
        const { reviews } = res;
        console.log(reviews);
        setReviews([...reviews]);
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.auth[errorMsg as keyof typeof errorCodes.auth];
        toast.error(intl.formatMessage({ id: `LoginForm.${errorCode}` }));
      });
  }, [isReload]);

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
            {isLoading ? (
              <Spinner animation="border" />
            ) : reviews && reviews.length > 0 ? (
              <div className={style.productList}>
                {reviews.map((review: any) => (
                  <Review handleReload={() => setIsReload(!isReload)} review={review} />
                ))}
              </div>
            ) : (
              <div className={style.noProducts}>
                <div className="d-flex flex-column align-items-center mb-2">
                  <img
                    className={'m-4 ' + style.img}
                    src={illustration}
                    alt="empty list"
                  ></img>
                  <FormattedMessage
                    id="ReviewsPage.noReviewsMessage"
                    defaultMessage="Looks like you haven't bought anything."
                  ></FormattedMessage>
                  <Link to="/products">
                    <Button className="m-4">
                      <FormattedMessage id="PurchaseHistoryPage.continueShoppingMessage"></FormattedMessage>
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </OneToFivePage>
  );
};

export default injectIntl(ReviewsPage);
