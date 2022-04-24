import { ChangeEvent, useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { OneToFivePage } from '../../components';
import profileAPI from '../../api/profile';
import style from './EditProfilePage.module.css';
import s3API from '../../api/amazonS3';
export interface ProfileInfo {
  name: string | undefined;
  bio: string | undefined;
}

const EditProfilePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const imageInput = useRef<HTMLInputElement>(null);
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
        setProfileInfo({ name: user.customerName, bio: user.customerBio });
      } catch (error) {
        console.log('Get user profile error: ', error);
      }
    };
    getUserProfile(id);
  }, []);

  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({
      ...profileInfo,
      [input.id]: input.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await profileAPI.updateUserProfile(profileInfo);
      navigate(-1);
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
      const res: any = await s3API.getSignedUrl('avatar');
      const { url: signedUploadUrl } = res;
      const imageUrl = signedUploadUrl.split('?')[0];
      await s3API.uploadToS3Bucket(signedUploadUrl, selectedFile);
      setAvatarUrl(imageUrl);
      await profileAPI.updateUserAvatar(imageUrl);
    } catch (error) {
      setAvatarUrl(previousAvatar);
      console.log('Upload image handler error:', error);
    }
  };
  return (
    <OneToFivePage>
      <Container className={`w-75 p-5 mt-5 min-vh-100 bg-white`}>
        {/* Page title */}
        <Row>
          <h1>Edit Profile</h1>
          <h4 className="text-muted" style={{}}>
            Manage how others see your profile
          </h4>
        </Row>

        <Row className={`mt-5`}>
          {/* Edit Profile */}
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={profileInfo.name}
                  onChange={e => handleChange(e as any)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={profileInfo.bio}
                  onChange={e => handleChange(e as any)}
                />
              </Form.Group>
            </Form>
            <Button onClick={handleSubmit}>Save changes</Button>
          </Col>
          {/* Edit avatar */}
          <Col className={`d-flex flex-column align-items-center`}>
            <div className={style.editAvatarWrapper}>
              <div className={style.avatarWrapper}>
                <img
                  src={
                    avatarUrl ||
                    'https://i.pinimg.com/originals/dc/fa/f9/dcfaf90445559ec3997517ad7a34f8ee.jpg'
                  }
                  alt=""
                  className={style.avatar}
                />
              </div>
            </div>
            <Button
              className={`mt-3`}
              variant="dark"
              onClick={() => {
                imageInput.current?.click();
              }}
            >
              Change Avatar
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
