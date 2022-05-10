import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { BsFillLightningChargeFill } from 'react-icons/bs';
import categoryAPI from '../../../../api/category';

import style from './ProductNavbar.module.css';

const ProductNavbar = () => {

  const [categories, setCategories] = useState<Array<any>>([]);

  useEffect(() => {
    categoryAPI.getAllCategories()
      .then((res: any) => {
        setCategories([...res.categories]);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <nav className={style.subNavbar}>
      <section className={style.leftSide}>
        <button className={classNames(style.button, style.trendButton)}>
          <BsFillLightningChargeFill />
          Trending
        </button>
        <div className={style.categoryList}>
          {categories.map(category => <button key={category._id} className={style.button}>{category.categoryName}</button>)}
        </div>
      </section>

      <section className={style.rightSide}>
        <button className={style.button}>DeeX Forum</button>
      </section>
    </nav>
  )
}

export default ProductNavbar;