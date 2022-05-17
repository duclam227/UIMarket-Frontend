import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";

import { product } from "../../app/util/interfaces";
import { State } from "../../redux/store";

import productAPI from "../../api/product";

import { PageWithNavbar } from "../../components";
import SectionHero from "./SectionHero";
import SectionFeaturedProducts from "./SectionFeaturedProducts";
import SectionExploreForum from "./SectionExploreForum";
import SectionTrendingCategories from "./SectionTrendingCategories";
import SectionStartEarning from "./SectionStartEarning";

import style from './LandingPage.module.css';

interface IProps {
  intl: IntlShape;
}

const LandingPage: React.FC<IProps> = (props) => {
  const { intl } = props;

  const currentUser = useSelector((state: State) => state.auth.user);
  const [trendingProducts, setTrendingProducts] = useState<Array<product> | null>(null);
  const [themeProducts, setThemeProducts] = useState<Array<product> | null>(null);

  const trendingProductsTitle = intl.formatMessage({ id: 'LandingPage.SectionTrendingProductsTitle' });
  const trendingProductsSubtitle = intl.formatMessage({ id: 'LandingPage.SectionTrendingProductsSubtitle' });

  const themeProductsTitle = intl.formatMessage({ id: 'LandingPage.SectionThemeProductsTitle' });
  const themeProductsSubtitle = intl.formatMessage({ id: 'LandingPage.SectionThemeProductsSubtitle' });

  useEffect(() => {
    productAPI.getTrendingProducts(1, 4)
      .then((res: any) => {
        setTrendingProducts(res.products);
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    productAPI.searchProducts('template', 1, 4)
      .then((res: any) => {
        setThemeProducts(res.products);
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <PageWithNavbar>
      <SectionHero currentUser={currentUser} />
      <SectionFeaturedProducts
        products={trendingProducts}
        title={trendingProductsTitle}
        subtitle={trendingProductsSubtitle}
        link="/products"
      />
      <SectionExploreForum />
      <SectionTrendingCategories />
      <SectionFeaturedProducts
        products={themeProducts}
        title={themeProductsTitle}
        subtitle={themeProductsSubtitle}
        link="/products&title=theme"
      />
      <SectionStartEarning />
    </PageWithNavbar>
  )
}

export default injectIntl(LandingPage);