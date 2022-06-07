import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";

import { product } from "../../app/util/interfaces";
import { State } from "../../redux/store";

import { getErrorMessage } from "../../app/util";
import { errors as errorCodes } from "../../app/util/errors";
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
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.product[errorMsg as keyof typeof errorCodes.product];
        toast.error(intl.formatMessage({ id: `Product.${errorCode}` }));
      })
  }, [])

  useEffect(() => {
    productAPI.getCategoryProductsByPageNumber(1, 4, '627bc2f599bc9a68d1105497')
      .then((res: any) => {
        setThemeProducts(res.products);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.product[errorMsg as keyof typeof errorCodes.product];
        toast.error(intl.formatMessage({ id: `Product.${errorCode}` }));
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
        link="/products/category/627bc2f599bc9a68d1105497"
      />
      <SectionStartEarning />
    </PageWithNavbar>
  )
}

export default injectIntl(LandingPage);