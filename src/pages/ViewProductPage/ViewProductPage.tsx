import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { State } from '../../redux/store';
import { product } from '../../app/util/interfaces';
import { PageWithNavbar } from '../../components';
import SectionDescription from './SectionDescription';
import SectionHeader from './SectionHeader';
import SectionImages from './SectionImages';

import productAPI from '../../api/product';

import style from './ViewProductPage.module.css';

const ViewProductPage: React.FC = () => {
  const { id } = useParams();

  const currentUser = useSelector((state: State) => state.auth.user);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    setIsLoading(true);
    productAPI
      .getProductById(id!)
      .then((res: any) => {
        setProduct(res.product);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

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
        <SectionHeader product={product!} currentUser={currentUser!} />
        <SectionImages images={product?.productPictures!} />
        <SectionDescription body={product?.productDescription!} />
        {/* </div> */}
      </div>
    </PageWithNavbar>
  );
};

export default ViewProductPage;
