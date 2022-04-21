import { ChangeEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { PageWithNavbar } from '../../components';
import profileAPI from '../../api/profile';
import style from './EditProfilePage.module.css';
export interface ProfileInfo {
  name: string | undefined;
  bio: string | undefined;
}

const EditProfilePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    name: '',
    bio: '',
  });

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
      await profileAPI.updateUserProfileInfo(profileInfo);
      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <PageWithNavbar>
      <Container className={`p-5 mt-5 min-vh-100 bg-white`}>
        {/* Page title */}
        <Row>
          <h1>Edit Profile</h1>
          <h4 className="text-muted" style={{}}>
            Manage how others see your profile
          </h4>
        </Row>

        <Row className={`mt-5`}>
          {/* Edit form */}
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
                  src="https://i.pinimg.com/originals/dc/fa/f9/dcfaf90445559ec3997517ad7a34f8ee.jpg"
                  alt=""
                  className={style.avatar}
                />
              </div>
            </div>
            <Button className={`mt-3`} variant="dark">
              Change Avatar
            </Button>
          </Col>
        </Row>
      </Container>
    </PageWithNavbar>
  );
};

export default EditProfilePage;
