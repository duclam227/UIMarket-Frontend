import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { product } from '../../app/util/interfaces';
import { PageWithNavbar } from '../../components';

import productAPI from '../../api/product';

import style from './ViewProductPage.module.css';
import SectionDescription from './SectionDescription';
import SectionHeader from './SectionHeader';
import SectionImages from './SectionImages';

const ViewProductPage: React.FC = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    productAPI
      .getProductById(id!)
      .then((res: any) => {
        setProduct(res.product[0]);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(product);

  return isLoading ? (
    <PageWithNavbar>
      <div className={style.wrapper}>
        <Spinner animation="border" />
      </div>
    </PageWithNavbar>
  ) : (
    <PageWithNavbar>
      <div className={style.wrapper}>
        {/* <div className={style.content}> */}
        <SectionHeader title={product?.productName!} />
        <SectionImages images={product?.productPictures!} />
        <SectionDescription body={product?.productDescription!} />
        {/* </div> */}
      </div>
    </PageWithNavbar>
  );
};

export default ViewProductPage;
