import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { BsFillLightningChargeFill } from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import categoryAPI from '../../../../api/category';

import style from './ProductNavbar.module.css';

const ProductNavbar = () => {
  const [categories, setCategories] = useState<Array<any>>([]);

  useEffect(() => {
    categoryAPI
      .getAllCategories()
      .then((res: any) => {
        setCategories([...res.categories]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <nav className={style.subNavbar}>
      <section className={style.leftSide}>
        <button className={classNames(style.button, style.trendButton)}>
          <BsFillLightningChargeFill />
          <FormattedMessage id="ProductNavBar.Trending" defaultMessage="Trending" />
        </button>
        <div className={style.categoryList}>
          {categories.map((category: any) => (
            <Link to={`/products/category/${category._id}`}>
              <button key={category._id} className={style.button} >
                {category.categoryName}
              </button>
            </Link>
          ))}
        </div>
      </section>

      <section className={style.rightSide}>
        <Link to="/questions">
          <button className={style.button}>
            <FormattedMessage id="ProductNavBar.Forum" defaultMessage="DeeX Forum" />
          </button>
        </Link>
      </section>
    </nav>
  );
};

export default ProductNavbar;
