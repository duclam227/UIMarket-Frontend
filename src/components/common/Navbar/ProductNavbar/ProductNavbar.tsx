import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Link } from 'react-router-dom';

import { BsFillLightningChargeFill, BsJournalBookmarkFill } from 'react-icons/bs';
import categoryAPI from '../../../../api/category';
import { getErrorMessage } from '../../../../app/util';
import { errors as errorCodes } from '../../../../app/util/errors';

import style from './ProductNavbar.module.css';
import { Spinner } from 'react-bootstrap';
import { navbarCategories } from '../../../../app/util/config';

interface IProps {
  intl: IntlShape;
}

const ProductNavbar: FC<IProps> = props => {
  const { intl } = props;
  // const [categories, setCategories] = useState<Array<any>>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   setIsLoading(true);
  //   categoryAPI
  //     .getAllCategories()
  //     .then((res: any) => {
  //       setCategories([...res.categories]);
  //     })
  //     .catch(error => {
  //       const errorMsg = getErrorMessage(error);
  //       const errorCode: any =
  //         errorCodes.category[errorMsg as keyof typeof errorCodes.category];
  //       toast.error(intl.formatMessage({ id: `Category.${errorCode}` }));
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <nav className={style.subNavbar}>
      <div className="container-fluid d-flex align-items-center">
        <section className={style.leftSide}>
          <button className={classNames(style.button, style.trendButton)}>
            <Link to="/questions">
              <FormattedMessage id="ProductNavBar.Forum" defaultMessage="DeeX Forum" />
            </Link>
          </button>

        <div className={style.categoryList}>
          <Link to={`/products`}>
            <button className={style.button}>
              <FormattedMessage id="ProductNavBar.AllProducts" />
            </button>
          </Link>
          {navbarCategories.map((category: any) => (
            <Link key={category.id} to={`/products/category/${category.id}`}>
              <button className={style.button}>
                <FormattedMessage id={`Navbar.${category.key}`} />
              </button>
            </Link>
          ))
          }
        </div>
      </section>
    </nav>
  );
};

export default injectIntl(ProductNavbar);
