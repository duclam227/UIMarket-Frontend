import { FunctionComponent, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { genericAvatarUrl } from '../../app/util/const';
import Navbar from '../../components/common/Navbar/Navbar';
import PageWithSideNav from '../../components/common/OneToFivePage/OneToFivePage';
import PageWithNavbar from '../../components/common/PageWithNavbar/PageWithNavbar';
import styles from './EditShopPage.module.css';

export interface ShopInfo {
  shopEmail: string;
  shopPhone: string | null;
  shopDescription: string | null;
  shopOwner: any;
}

const EditShopPage: FunctionComponent = () => {
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  return (
    <div>
      <Container>
        <div
          className={
            'mt-4 p-2 text-center d-flex align-items-center justify-content-center ' +
            styles.shopCover
          }
        >
          {/*no cover*/}
          <i className="bi-patch-plus fs-3"></i>
          <FormattedMessage
            id="AddShopBanner"
            defaultMessage={'Add a cover to showcase your business'}
          ></FormattedMessage>

          {/*with cover*/}
        </div>

        <div
          className={
            'p-4 d-flex justify-content-between align-items-center' + styles.shopHeader
          }
        >
          <div>
            <h1>Shop Name</h1>
            <p>Add a shop description</p>
          </div>

          <div className="d-flex flex-column ">
            <div className={'mb-1 ' + styles.profilePictureWrapper}>
              <img
                className={styles.profilePicture}
                src={shopInfo?.shopOwner.customerAvatar || genericAvatarUrl}
                alt="Avatar"
              />
            </div>
            <p>Shop Owner Email</p>
          </div>
        </div>

        <div
          className={
            'container d-flex justify-content-between align-items-center text-center fixed-bottom p-2 bg-primary text-light'
          }
        >
          <div className="hidden"></div>
          <FormattedMessage
            id="EditShopPage.editMsg"
            defaultMessage={'You are currently editing your shop'}
          ></FormattedMessage>

          <Button variant="dark" href="./">
            View shop
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default EditShopPage;
