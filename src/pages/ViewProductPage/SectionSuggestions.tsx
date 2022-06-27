import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ProductList, UserAvatar } from '../../components';

import { customer, product } from '../../app/util/interfaces';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';

import shopAPI from '../../api/shop';

import style from './ViewProductPage.module.css';
import productAPI from '../../api/product';

interface Props {
  product: product;
  intl: IntlShape;
}

const SectionSuggestions: React.FC<Props> = props => {
  const { product, intl, } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<product>>([]);

  useEffect(() => {
    setIsLoading(true);
    productAPI.getCategoryProductsByPageNumber(1, 4, product.productCategory._id)
      .then((res: any) => {
        setProducts([...res.products.filter((pro: product) => pro._id !== product._id)]);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.product[errorMsg as keyof typeof errorCodes.product];
        toast.error(intl.formatMessage({ id: `Product.${errorCode}` }));
      })
      .finally(() => setIsLoading(false))
  }, [])

  return isLoading
    ? <section className={style.suggestions}>
      <Spinner animation='border' />
    </section>
    : <section className={style.suggestions}>
      <h5><FormattedMessage id='ViewProductPage.suggestions' /></h5>
      {
        products.length > 0
          ? <ProductList productList={products} />
          : null
      }

    </section>
};

export default injectIntl(SectionSuggestions);
