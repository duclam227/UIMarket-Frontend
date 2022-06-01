import { FunctionComponent, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import shopAPI from '../../api/shop/index';
import { State } from '../../redux/store';
import bannerPlaceholder from '../../app/assets/banner-placeholder.png';
import { useParams } from 'react-router-dom';
import PageWithNavbar from '../../components/common/PageWithNavbar/PageWithNavbar';
import styles from './ViewShopPage.module.css';
import { FormattedMessage } from 'react-intl';
import { ProductList } from '../../components';
import productAPI from '../../api/product/index';

export interface ShopInfo {
  shopName: string;
  shopDescription: string;
  shopBanner: string;
  shopEmail: string;
  shopPhone: string;
}

const EditShopPage: FunctionComponent = () => {
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    shopName: '',
    shopDescription: '',
    shopBanner: '',
    shopEmail: '',
    shopPhone: '',
  });
  const [products, setProducts] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const currentUser = useSelector((state: State) => state.auth.user);

  useEffect(() => {
    shopAPI
      .getShopInfo(id as string)
      .then((res: any) => {
        const { shop }: any = res;
        setShopInfo(shop);
        console.log(shop);
      })
      .catch(error => {
        console.log('Get shop info error: ', error);
      });

    productAPI
      .getShopProductsByPageNumber(id as string, 1, 20)
      .then((res: any) => {
        const newProducts = res.products;
        setProducts(newProducts);
      })
      .catch((error: any) => {
        console.log('Get shop products error: ', error);
      });
  }, []);

  return (
    <PageWithNavbar>
      <Container>
        <div>
          <div className={styles.bannerImageWrapper}>
            <img
              className={styles.bannerImageElement}
              src={shopInfo.shopBanner as string}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = bannerPlaceholder;
              }}
              alt="banner"
            />
          </div>

          <div className={styles.avatarWrapper}>
            <img
              src="https://d3ui957tjb5bqd.cloudfront.net/images/users/132/1321/1321357/avatar-75-75-r.jpg?1619119787"
              className={styles.avatarImage}
              alt={shopInfo.shopName}
            />
          </div>
        </div>

        <div className={'my-2 ' + styles.shopInfo}>
          <h3 className="text-center mx-2">{shopInfo.shopName}</h3>
          <p className="text-center mx-2">{shopInfo.shopDescription}</p>
        </div>

        <div>
          <h3>
            <FormattedMessage id="ViewShopPage.Items" defaultMessage={'Items'} />
          </h3>

          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <ProductList productList={products} />
          )}
        </div>
      </Container>
    </PageWithNavbar>
  );
};

export default EditShopPage;
