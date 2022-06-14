import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { product } from '../../app/util/interfaces';
import productAPI from '../../api/product';
import { ProductList } from '../../components';

import style from './LandingPage.module.css';
import { FormattedMessage } from 'react-intl';

interface IProps {
  products: Array<product> | null;
  title: string;
  subtitle: string;
  link: string;
}

const SectionFeaturedProducts: React.FC<IProps> = props => {
  const { products, title, subtitle, link } = props;

  return (
    products && (
      <section className={style.sectionWrapper}>
        <div className={style.sectionFeaturedProducts}>
          <div className={style.sectionFeaturedProductsHeader}>
            <div className={style.sectionFeaturedProductsTitle}>
              <h4>{title}</h4>
              <span>{subtitle}</span>
            </div>

            <Link to={link} className={style.sectionFeaturedProductsExploreButton}>
              <FormattedMessage id="LandingPage.ExploreAllLabel" />
              <MdKeyboardArrowRight />
            </Link>
          </div>
          <ProductList productList={products} />
        </div>
      </section>
    )
  );
};

export default SectionFeaturedProducts;
