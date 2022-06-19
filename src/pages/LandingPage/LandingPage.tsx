import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import { product } from '../../app/util/interfaces';
import { State } from '../../redux/store';

import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';
import productAPI from '../../api/product';

import { PageWithNavbar } from '../../components';
import SectionHero from './SectionHero';
import SectionFeaturedProducts from './SectionFeaturedProducts';
import SectionExploreForum from './SectionExploreForum';
import SectionTrendingCategories from './SectionTrendingCategories';
import SectionStartEarning from './SectionStartEarning';

import style from './LandingPage.module.css';
import classNames from 'classnames';
import { useIntersectionObserver } from '../../app/util/customHooks';

const VIEW_THRESHOLD = 0.7;

interface IProps {
  intl: IntlShape;
}

const LandingPage: React.FC<IProps> = props => {
  const { intl } = props;

  const currentUser = useSelector((state: State) => state.auth.user);
  const [trendingProducts, setTrendingProducts] = useState<Array<product> | null>(null);
  const [themeProducts, setThemeProducts] = useState<Array<product> | null>(null);

  const sectionTrendingProductsRef = useRef(null);
  const sectionTrendingCategoriesRef = useRef(null);
  const sectionFeaturedProductsRef = useRef(null);
  const sectionExploreForumRef = useRef(null);
  const sectionStartEarningRef = useRef(null);

  const trendingProductsTitle = intl.formatMessage({
    id: 'LandingPage.SectionTrendingProductsTitle',
  });
  const trendingProductsSubtitle = intl.formatMessage({
    id: 'LandingPage.SectionTrendingProductsSubtitle',
  });

  const themeProductsTitle = intl.formatMessage({
    id: 'LandingPage.SectionThemeProductsTitle',
  });
  const themeProductsSubtitle = intl.formatMessage({
    id: 'LandingPage.SectionThemeProductsSubtitle',
  });

  useEffect(() => {
    productAPI
      .getTrendingProducts(1, 4)
      .then((res: any) => {
        setTrendingProducts(res.products);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any =
          errorCodes.product[errorMsg as keyof typeof errorCodes.product];
        toast.error(intl.formatMessage({ id: `Product.${errorCode}` }));
      });
  }, []);

  useEffect(() => {
    productAPI
      .getCategoryProductsByPageNumber(1, 4, '62a45a3951ca7e1703f0b70b')
      .then((res: any) => {
        setThemeProducts(res.products);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any =
          errorCodes.product[errorMsg as keyof typeof errorCodes.product];
        toast.error(intl.formatMessage({ id: `Product.${errorCode}` }));
      });
  }, []);

  const checkAnimation = (entryArray: Array<any>) => {
    //entry array stores the one item that is registered to an observer
    const entry = entryArray[0];
    if (entry.isIntersecting) {
      const entryElement = entry.target;
      entryElement.className = classNames(style.show);
    }
  };

  useIntersectionObserver(sectionTrendingProductsRef, checkAnimation, VIEW_THRESHOLD);
  useIntersectionObserver(sectionTrendingCategoriesRef, checkAnimation, VIEW_THRESHOLD);
  useIntersectionObserver(sectionFeaturedProductsRef, checkAnimation, VIEW_THRESHOLD);
  useIntersectionObserver(sectionExploreForumRef, checkAnimation, VIEW_THRESHOLD);
  useIntersectionObserver(sectionStartEarningRef, checkAnimation, VIEW_THRESHOLD);

  return (
    <PageWithNavbar>
      <SectionHero currentUser={currentUser} />
      <div ref={sectionTrendingProductsRef} className={style.hide}>
        <SectionFeaturedProducts
          products={trendingProducts}
          title={trendingProductsTitle}
          subtitle={trendingProductsSubtitle}
          link="/products"
        />
      </div>
      <div ref={sectionTrendingCategoriesRef} className={style.hide}>
        <SectionTrendingCategories />
      </div>
      <div ref={sectionFeaturedProductsRef} className={style.hide}>
        <SectionFeaturedProducts
          products={themeProducts}
          title={themeProductsTitle}
          subtitle={themeProductsSubtitle}
          link="/products/category/627bc2f599bc9a68d1105497"
        />
      </div>
      <div ref={sectionExploreForumRef} className={style.hide}>
        <SectionExploreForum />
      </div>
      <div ref={sectionStartEarningRef} className={style.hide}>
        <SectionStartEarning />
      </div>
    </PageWithNavbar>
  );
};

export default injectIntl(LandingPage);
