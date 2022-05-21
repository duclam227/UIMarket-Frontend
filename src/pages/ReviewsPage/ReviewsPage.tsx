import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Form, Spinner } from 'react-bootstrap';
import { State } from '../../redux/store';

import invoiceAPI from '../../api/invoice';

import { OneToFivePage } from '../../components';

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
  const [products, setProducts] = useState<Array<any> | null>(null);

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
              : products && products.length > 0
                ? <div className={style.productList}>
                  {products.map((purchase: any) => <div>review</div>)}
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