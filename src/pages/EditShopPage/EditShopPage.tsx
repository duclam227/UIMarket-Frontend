import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from 'react';
import { Button, Container, Form, ProgressBar, Modal, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import Navbar from '../../components/common/Navbar/Navbar';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './EditShopPage.module.css';
import shopAPI from '../../api/shop/index';
import { State } from '../../redux/store';
import bannerPlaceholder from '../../app/assets/banner-placeholder.png';
import { ImageInput, OneToFivePage } from '../../components';
import s3API from '../../api/amazonS3';
import { useDispatch } from 'react-redux';
import { logInWithJWT } from '../../redux/index';
import { ToastContainer, toast } from 'react-toastify';
import { injectIntl, IntlShape } from 'react-intl';
import { genericAvatarUrl } from '../../app/util/const';
import { Link, useNavigate, useParams } from 'react-router-dom';

export interface ShopInfo {
  _id?: string;
  shopName: string;
  shopDescription: string;
  shopBanner: string;
  shopEmail: string;
  shopPhone: string;
}

interface IProps {
  intl: IntlShape;
}

const EditShopPage: FunctionComponent<IProps> = props => {
  const { intl } = props;
  const editNameBtnLabel = intl.formatMessage({ id: 'EditShopPage.EditNameBtnLabel' });
  const shopNameRequiredMsg = intl.formatMessage({ id: 'EditShopPage.ShopNameRequired' });
  const shopEmailRequiredMsg = intl.formatMessage({
    id: 'EditShopPage.ShopEmailRequired',
  });
  const phoneErrMsg = intl.formatMessage({
    id: 'EditShopPage.PhoneErrMsg',
  });

  const navigate = useNavigate();
  const params = useParams();
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    shopName: '',
    shopDescription: '',
    shopBanner: '',
    shopEmail: '',
    shopPhone: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSavingChanges, setIsSavingChanges] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const imageInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [shopAvatar, setShopAvatar] = useState<string>('');

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
    if (!id) {
      return;
    }

    setIsLoading(true);
    shopAPI
      .getShopById(id as string)
      .then((res: any) => {
        const { shop }: any = res;
        setShopInfo(shop);
        reset(shop);
        const { customerAvatar } = shop.userId;
        setShopAvatar(customerAvatar);
      })
      .catch(error => {
        if (error.response && error.response.data.msg === 'shop-deactivated')
          setShowModal(true);
        else console.log('Get shop info error: ', error);
      })
      .finally(() => {
        setIsLoading(false);
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
    if (selectedFile.type.includes('image')) {
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
    } else {
      toast('Please upload an image file.');
    }
  };

  const syncChangesToReduxStore = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      dispatch(logInWithJWT(authToken));
    }
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleGoBack = () => {
    setShowModal(false);
    navigate(`/user/${params.id}`);
  };
  return (
    <OneToFivePage>
      <Container className={styles.mainContainer}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            {' '}
            <Spinner animation="border" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
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
                <button
                  type="button"
                  className="btn btn-light position-absolute bottom-0 end-0 m-3"
                  onClick={() => {
                    imageInput.current?.click();
                  }}
                >
                  <i className="bi-image"></i>Edit cover
                </button>
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
              {!isEditMode && (
                <div className="d-flex align-items-baseline justify-content-center">
                  <h3 className="text-center mx-2">{shopInfo.shopName}</h3>
                  <i
                    className="bi-pencil-fill btn p-0"
                    title={editNameBtnLabel}
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
                      required: shopNameRequiredMsg,
                    })}
                  />
                  <label htmlFor="floatingInputValue">
                    <FormattedMessage
                      id="EditShopPage.ShopNameLabel"
                      defaultMessage={'Shop Name'}
                    ></FormattedMessage>
                  </label>
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
                  <FormattedMessage
                    id="EditShopPage.TagLineLabel"
                    defaultMessage={'Write a tagline'}
                  ></FormattedMessage>
                </label>
              </div>

              <div className="form-floating my-2">
                <input
                  type="email"
                  className="form-control"
                  id="shopEmail"
                  placeholder="Your shop email"
                  {...register('shopEmail', {
                    required: shopEmailRequiredMsg,
                  })}
                  autoFocus={false}
                />
                <label htmlFor="floatingInputValue">
                  <FormattedMessage
                    id="EditShopPage.ShopEmailLabel"
                    defaultMessage={'Shop email'}
                  ></FormattedMessage>
                </label>
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
                      message: phoneErrMsg,
                    },
                  })}
                />
                <label htmlFor="floatingInputValue">
                  <FormattedMessage
                    id="EditShopPage.PhoneLabel"
                    defaultMessage={'Shop phone'}
                  ></FormattedMessage>
                </label>
              </div>

              <div className="d-flex justify-content-center">
                {/* <Link to={`/shop/${shopInfo._id}`}> */}
                <Button
                  variant="dark"
                  className="m-2"
                  disabled={!shopInfo._id}
                  onClick={() => navigate(`/shop/${shopInfo._id}`)}
                >
                  <FormattedMessage
                    id="EditShopPage.ViewBtnLabel"
                    defaultMessage={'View shop'}
                  ></FormattedMessage>
                </Button>
                {/* </Link> */}
                <Button
                  variant="primary"
                  className="m-2"
                  type="submit"
                  disabled={!isDirty}
                >
                  <FormattedMessage
                    id="EditShopPage.SaveBtnLabel"
                    defaultMessage={'Save changes'}
                  ></FormattedMessage>
                </Button>
              </div>
            </div>
            <Modal show={showModal} onHide={handleClose}>
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
                <Button variant="secondary" onClick={handleClose}>
                  <FormattedMessage id="ReportModal.closeBtnLabel" />
                </Button>
                <Button variant="primary" onClick={handleGoBack}>
                  <FormattedMessage id="ViewShopPage.deactivatedModalBackBtnLabel" />
                </Button>
              </Modal.Footer>
            </Modal>
          </form>
        )}
      </Container>
    </OneToFivePage>
  );
};

export default injectIntl(EditShopPage);
