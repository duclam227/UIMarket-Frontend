import { FunctionComponent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Spinner, Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import shopAPI from '../../api/shop/index';
import { State } from '../../redux/store';
import bannerPlaceholder from '../../app/assets/banner-placeholder.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageWithNavbar from '../../components/common/PageWithNavbar/PageWithNavbar';
import styles from './ViewShopPage.module.css';
import { FormattedMessage } from 'react-intl';
import { EmptyState, ProductList } from '../../components';
import productAPI from '../../api/product/index';
import { genericAvatarUrl } from '../../app/util/const';
import { BsPencil } from 'react-icons/bs';

export interface ShopInfo {
  shopName: string;
  shopDescription: string;
  shopBanner: string;
  shopEmail: string;
  shopPhone: string;
  _id: string;
}

const EditShopPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    shopName: '',
    shopDescription: '',
    shopBanner: '',
    shopEmail: '',
    shopPhone: '',
    _id: '',
  });
  const [shopAvatar, setShopAvatar] = useState<string>('');
  const [products, setProducts] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { id } = useParams();
  const currentUser = useSelector((state: State) => state.auth.user);

  useEffect(() => {
    shopAPI
      .getShopById(id as string)
      .then((res: any) => {
        const { shop }: any = res;
        setShopInfo(shop);
        const { customerAvatar } = shop.userId;
        setShopAvatar(customerAvatar);
      })
      .catch(error => {
        if (error.response && error.response.data.msg === 'shop-deactivated')
          setShowModal(true);
        else if (error.response && error.response.status === 404)
          toast.error('Shop does not exist');
        else console.log('Get shop info error: ', error);
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
  }, [id]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleGoBack = () => {
    setShowModal(false);
    navigate(-1);
  };
  return (
    <PageWithNavbar>
      <Container className="my-4">
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
              src={shopAvatar || genericAvatarUrl}
              className={styles.avatarImage}
              alt={shopInfo.shopName}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = genericAvatarUrl;
              }}
            />
          </div>
        </div>

        <div className={'my-2 ' + styles.shopInfo}>
          <h3 className="text-center mx-2">{shopInfo.shopName}</h3>
          <p className="text-center mx-2">{shopInfo.shopDescription}</p>
          {currentUser?.shopId === id && (
            <div className="d-flex justify-content-center">
              <Button
                variant="dark"
                className="m-2"
                onClick={() => navigate(`/user/${currentUser?._id}/shop/edit`)}
              >
                <BsPencil className="me-1" />
                <FormattedMessage id="ViewShopPage.EditShop"></FormattedMessage>
              </Button>
              <Button
                variant="primary"
                className="m-2"
                type="submit"
                onClick={() => navigate('/products/add')}
              >
                <FormattedMessage
                  id="ViewShopPage.AddNewProduct"
                  defaultMessage={'Add new product'}
                ></FormattedMessage>
              </Button>
            </div>
          )}
        </div>

        <div>
          <h3 className="mt-4">
            <FormattedMessage id="ViewShopPage.Items" defaultMessage={'Items'} />
          </h3>

          {isLoading ? (
            <Spinner animation="border" />
          ) : products.length > 0 ? (
            <ProductList productList={products} />
          ) : (
            <EmptyState
              img="error-nothing"
              btn={false}
              messageId="ViewShopPage.NoItem"
            ></EmptyState>
          )}
        </div>
      </Container>
      <Modal show={showModal} onHide={handleGoBack}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="ViewShopPage.deactivatedModalTitle" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <FormattedMessage id="ViewShopPage.deactivatedModalBody1" />
          </div>
          <div>
            <FormattedMessage id="ViewShopPage.deactivatedModalBody2" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleGoBack}>
            <FormattedMessage id="ViewShopPage.deactivatedModalBackBtnLabel" />
          </Button>
        </Modal.Footer>
      </Modal>
    </PageWithNavbar>
  );
};

export default EditShopPage;
