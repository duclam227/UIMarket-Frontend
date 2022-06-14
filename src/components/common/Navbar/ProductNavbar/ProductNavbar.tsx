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

interface IProps {
  intl: IntlShape;
}

const ProductNavbar: FC<IProps> = (props) => {
  const { intl } = props;
  const [categories, setCategories] = useState<Array<any>>([]);

  useEffect(() => {
    categoryAPI
      .getAllCategories()
      .then((res: any) => {
        setCategories([...res.categories]);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.category[errorMsg as keyof typeof errorCodes.category];
        toast.error(intl.formatMessage({ id: `Category.${errorCode}` }));
      });
  }, []);

  return (
    <nav className={style.subNavbar}>
      <section className={style.leftSide}>
        <button className={classNames(style.button, style.trendButton)}>
          <Link to="/questions">
            <FormattedMessage id="ProductNavBar.Forum" defaultMessage="DeeX Forum" />
          </Link>
        </button>

        <div className={style.categoryList}>
          {categories.map((category: any) => (
            <Link key={category._id} to={`/products/category/${category._id}`}>
              <button key={category._id} className={style.button} >
                {category.categoryName}
              </button>
            </Link>
          ))}
        </div>
      </section>

    </nav >
  );
};

export default injectIntl(ProductNavbar);
