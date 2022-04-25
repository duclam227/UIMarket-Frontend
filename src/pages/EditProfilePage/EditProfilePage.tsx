import { ChangeEvent, useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { logInWithJWT } from '../../redux/index';
import { OneToFivePage } from '../../components';
import profileAPI from '../../api/profile';
import style from './EditProfilePage.module.css';
import s3API from '../../api/amazonS3';
import { genericAvatarUrl } from '../../app/util/const';
export interface ProfileInfo {
  name: string | undefined;
  bio: string | undefined;
}

const EditProfilePage = () => {
  const pageTitle = (
    <FormattedMessage
      id="EditProfilePage.pageTitle"
      defaultMessage="Edit Profile"
    />
  );
  const pageSubTitle = (
    <FormattedMessage
      id="EditProfilePage.pageSubTitle"
      defaultMessage="Manage how others see your profile"
    />
  );
  const nameFormInputLabel = (
    <FormattedMessage
      id="EditProfilePage.nameFormInputLabel"
      defaultMessage="Name"
    />
  );
  const bioFormInputLabel = (
    <FormattedMessage
      id="EditProfilePage.bioFormInputLabel"
      defaultMessage="Bio"
    />
  );
  const saveBtnLabel = (
    <FormattedMessage
      id="EditProfilePage.saveBtnLabel"
      defaultMessage="Save changes"
    />
  );
  const changeAvatarBtnLabel = (
    <FormattedMessage
      id="EditProfilePage.changeAvatarBtnLabel"
      defaultMessage="Change Avatar"
    />
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const imageInput = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    name: '',
    bio: '',
  });
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const { id } = params;
    if (!id) {
      return;
    }
    const getUserProfile = async (id: string) => {
      try {
        const res: any = await profileAPI.getUserProfileInfoById(id);
        const { user } = res;
        console.log(user);
        setAvatarUrl(user.customerAvatar);
        setProfileInfo({ name: user.customerName, bio: user.customerBio });
      } catch (error) {
        console.log('Get user profile error: ', error);
      }
    };
    getUserProfile(id);
  }, []);

  const syncChangesToReduxStore = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      dispatch(logInWithJWT(authToken));
    }
  };

  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({
      ...profileInfo,
      [input.id]: input.value,
    });
  };
  const handleSubmit = async () => {
    try {
      await profileAPI.updateUserProfile(profileInfo);
      const { id } = params;
      if (id) navigate(`/user/${id}/activity`);
      else navigate(-1);
      //To sync changes with local redux store
      syncChangesToReduxStore();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeAvatar = async ({
    target: input,
  }: ChangeEvent<HTMLInputElement>) => {
    if (!input.files) return;
    const selectedFile = input.files[0];
    const previousAvatar = avatarUrl;
    try {
      setIsUploading(true);
      const res: any = await s3API.getSignedUrl('avatar');
      const { url: signedUploadUrl } = res;
      const imageUrl = signedUploadUrl.split('?')[0];
      await s3API.uploadToS3Bucket(signedUploadUrl, selectedFile, {
        //To show progress bar
        onUploadProgress: (progressEvent: any) => {
          setUploadProgress((progressEvent.loaded / progressEvent.total) * 100);
        },
      });
      setAvatarUrl(imageUrl);
      await profileAPI.updateUserAvatar(imageUrl);
      setIsUploading(false);
      syncChangesToReduxStore();
    } catch (error) {
      setIsUploading(false);
      setAvatarUrl(previousAvatar);
      console.log('Upload image handler error:', error);
    }
  };
  return (
    <OneToFivePage>
      <Container className={`w-75 p-5 mt-5 min-vh-100 bg-white`}>
        {/* Page title */}

        <Row>
          <h1>{pageTitle}</h1>
          <h4 className="text-muted" style={{}}>
            {pageSubTitle}
          </h4>
        </Row>

        <Row className={`mt-5`}>
          {/* Edit Profile */}
          <Col className={`order-1`}>
            <Form>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>{nameFormInputLabel}</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={profileInfo.name}
                  onChange={e => handleChange(e as any)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bio">
                <Form.Label>{bioFormInputLabel}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={profileInfo.bio}
                  onChange={e => handleChange(e as any)}
                />
              </Form.Group>
            </Form>
            <Button onClick={handleSubmit}>{saveBtnLabel}</Button>
          </Col>
          {/* Edit avatar */}
          <Col
            sm={12}
            md={6}
            className={`d-flex flex-column align-items-center mb-3 mb-md-0 order-0 order-md-1`}
          >
            <div className={style.editAvatarWrapper}>
              <div className={style.avatarWrapper}>
                <img
                  src={avatarUrl || genericAvatarUrl}
                  alt=""
                  className={style.avatar}
                />
              </div>
              {isUploading && (
                <ProgressBar animated now={uploadProgress} className={`mt-2`} />
              )}
            </div>
            <Button
              className={`mt-3`}
              variant="dark"
              onClick={() => {
                imageInput.current?.click();
              }}
            >
              {changeAvatarBtnLabel}
            </Button>
            <Form>
              <Form.Control
                className={`d-none`}
                onChange={e => handleChangeAvatar(e as any)}
                ref={imageInput}
                type="file"
              ></Form.Control>
            </Form>
          </Col>
        </Row>
      </Container>
    </OneToFivePage>
  );
};

export default EditProfilePage;
