import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { PageWithNavbar } from '../../components';
import { State } from '../../redux/store';
import style from './EditProfilePage.module.css';
interface UserProfile {
  name: string | undefined;
  bio: string | undefined;
}

const EditProfilePage = () => {
  const currentUser = useSelector((state: State) => state.auth.user);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    bio: '',
  });

  useEffect(() => {
    const user = {
      name: currentUser?.customerName,
      bio: currentUser?.customerBio,
    };
    setUserProfile({
      name: currentUser?.customerName,
      bio: currentUser?.customerBio,
    });
  }, []);

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
              <Form.Group className="mb-3" id="inputName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userProfile.name}
                  id="inputName"
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" id="inputBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={userProfile.bio}
                  id="inputBio"
                />
              </Form.Group> */}
            </Form>
            <Button>Save changes</Button>
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
