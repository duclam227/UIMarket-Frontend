import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from 'react';
import { Button, Container, Form, ProgressBar } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import Navbar from '../../components/common/Navbar/Navbar';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './EditShopPage.module.css';
import shopAPI from '../../api/shop/index';
import { State } from '../../redux/store';
import bannerPlaceholder from '../../app/assets/banner-placeholder.png';
import { ImageInput } from '../../components';
import s3API from '../../api/amazonS3';
import { useDispatch } from 'react-redux';
import { logInWithJWT } from '../../redux/index';
import { ToastContainer, toast } from 'react-toastify';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { MdWrongLocation } from 'react-icons/md';

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

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSavingChanges, setIsSavingChanges] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const imageInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const currentUser = useSelector((state: State) => state.auth.user);

  const id = currentUser?.shopId;

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm<ShopInfo>({
    mode: 'onTouched',
    defaultValues: {
      shopName: shopInfo.shopName,
      shopDescription: shopInfo.shopDescription,
      shopBanner: shopInfo.shopBanner,
      shopEmail: shopInfo.shopEmail,
      shopPhone: shopInfo.shopPhone,
    },
    shouldUseNativeValidation: true,
  });

  const handleEnableEditMode = () => {
    setIsEditMode(true);
    reset(shopInfo);
  };

  useEffect(() => {
    shopAPI
      .getShopInfo(id as string)
      .then((res: any) => {
        const { shop }: any = res;
        setShopInfo(shop);
        reset(shop);
      })
      .catch(error => {
        console.log('Get shop info error: ', error);
      });
  }, [id, reset]);

  const onSubmit: SubmitHandler<ShopInfo> = async (data: any) => {
    setIsEditMode(false);
    try {
      setIsSavingChanges(true);
      await shopAPI.updateShop(data);
      setIsSavingChanges(false);
      setShopInfo({ ...data });
      reset({ ...data });
      toast('Changes save successfully');
    } catch (e) {
      reset({ ...shopInfo });
      console.log('Update user info error: ', e);
      setIsSavingChanges(false);
    }
  };

  const handleChangeBanner = async ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    if (!input.files) return;
    const selectedFile = input.files[0];
    const prevBanner = shopInfo.shopBanner;
    try {
      setIsUploading(true);
      const res: any = await s3API.getSignedUrl('banner');
      const { url: signedUploadUrl } = res;
      const imageUrl = signedUploadUrl.split('?')[0];

      await s3API.uploadToS3Bucket(signedUploadUrl, selectedFile, {
        //To show progress bar
        onUploadProgress: (progressEvent: any) => {
          setUploadProgress((progressEvent.loaded / progressEvent.total) * 100);
        },
      });
      setShopInfo({ ...shopInfo, shopBanner: imageUrl });
      await shopAPI.updateShop({ ...shopInfo, shopBanner: imageUrl });
      setIsUploading(false);
      syncChangesToReduxStore();
      toast('Upload banner successfully');
    } catch (error) {
      setIsUploading(false);
      setShopInfo({ ...shopInfo, shopBanner: prevBanner });
      console.log('Upload image handler error:', error);
      toast('Something is wrong. Please try again later');
    }
  };

  const syncChangesToReduxStore = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      dispatch(logInWithJWT(authToken));
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container className={styles.mainContainer}>
          {/*no cover*/}
          <div
            className={
              'w-100 mt-4 p-4 text-center d-flex align-items-center justify-content-center ' +
              styles.shopCover
            }
            onClick={() => {
              imageInput.current?.click();
            }}
          >
            <FormattedMessage
              id="AddShopBanner"
              defaultMessage={
                'Update your cover to showcase your business. Recommended size @ 1320 x 320'
              }
            ></FormattedMessage>

            {/*with cover*/}
          </div>
          <Form>
            <Form.Control
              className={`d-none`}
              onChange={e => handleChangeBanner(e as any)}
              ref={imageInput}
              type="file"
              accept=".jpg,.jpeg,.png,"
            ></Form.Control>
          </Form>
          {isUploading && (
            <ProgressBar animated now={uploadProgress} className={`mt-2`} />
          )}

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
            {!isEditMode && (
              <div className="d-flex align-items-baseline justify-content-center">
                <h3 className="text-center mx-2">{shopInfo.shopName}</h3>
                <i
                  className="bi-pencil-fill btn p-0"
                  title="Edit shop name"
                  onClick={handleEnableEditMode}
                ></i>
              </div>
            )}
            {isEditMode && (
              <div className="form-floating my-2">
                <input
                  type="text"
                  className="form-control"
                  id="shopName"
                  placeholder="Your Shop Name"
                  {...register('shopName', {
                    required: 'Please enter your shop name',
                  })}
                />
                <label htmlFor="floatingInputValue">Shop Name</label>
              </div>
            )}
            <div className={'form-floating mw-100 my-2'}>
              <textarea
                className={'form-control '}
                id="shopDescription"
                {...register('shopDescription')}
                style={{ height: '100px' }}
              ></textarea>
              <label htmlFor="floatingTextarea">
                Write a tagline to describe your shop
              </label>
            </div>

            <div className="form-floating my-2">
              <input
                type="email"
                className="form-control"
                id="shopEmail"
                placeholder="Your shop email"
                {...register('shopEmail', {
                  required: 'Please enter your shop email',
                })}
              />
              <label htmlFor="floatingInputValue">Shop Email</label>
            </div>

            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                id="shopPhone"
                placeholder="Your shop phone"
                {...register('shopPhone', {
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: 'Please input a valid phone number',
                  },
                })}
              />
              <label htmlFor="floatingInputValue">Shop Phone</label>
            </div>
          </div>
        </Container>

        {/* sticky footer */}
        <div
          className={
            'container d-flex justify-content-between align-items-center text-center fixed-bottom p-2 bg-secondary text-light'
          }
        >
          <div className="hidden"></div>
          <div className="flex-shrink-1">
            <FormattedMessage
              id="EditShopPage.editMsg"
              defaultMessage={'You are currently editing your shop'}
            ></FormattedMessage>
          </div>
          <div className="d-flex">
            <Button variant="dark" href="./" className="m-2">
              View shop
            </Button>
            <Button variant="primary" className="m-2" type="submit" disabled={!isDirty}>
              Save changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditShopPage;
