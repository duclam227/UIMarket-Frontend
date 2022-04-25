import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { BsPencil } from 'react-icons/bs';

import { logInWithJWT } from '../../redux/index';
import { OneToFivePage } from '../../components';
import profileAPI from '../../api/profile';

export interface UserInfo {
  email: string;
  dob: Date | null;
  phone: string;
}
const EditPersonalInfoPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isSavingChanges, setIsSavingChanges] = useState<boolean>(false);
  const [readOnlyInfo, setReadOnlyInfo] = useState<UserInfo>({
    email: '',
    dob: new Date(),
    phone: '',
  });
  const [editableInfo, setEditableInfo] = useState<UserInfo>({
    email: '',
    dob: new Date(),
    phone: '',
  });

  const dateToDDMMYYYY = (date: Date | null) =>
    date
      ? `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`
      : '';

  const dateToYYYYMMDD = (date: Date | null) =>
    date ? date.toISOString().split('T')[0] : '';

  useEffect(() => {
    const { id } = params;
    if (!id) {
      return;
    }
    const getUserProfile = async (id: string) => {
      try {
        const res: any = await profileAPI.getUserProfileInfoById(id);
        const { user } = res;
        const date = new Date(user.customerDOB);
        console.log(dateToDDMMYYYY(date));
        setReadOnlyInfo({
          email: user.customerEmail,
          dob: user.customerDOB ? date : null,
          phone: user.customerPhone ? user.customerPhone : '',
        });
      } catch (error) {
        console.log('Get user info error: ', error);
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

  const handleEnableEditMode = () => {
    setIsEditMode(true);
    setEditableInfo({ ...readOnlyInfo });
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleSaveChanges = async () => {
    const previousInfo = { ...readOnlyInfo };
    try {
      setIsSavingChanges(true);
      setIsEditMode(false);
      setReadOnlyInfo({ ...editableInfo });
      await profileAPI.updateUserInfo(editableInfo);
      setIsSavingChanges(false);
      syncChangesToReduxStore();
    } catch (e) {
      setReadOnlyInfo({ ...previousInfo });
      console.log('Update user info error: ', e);
      setIsSavingChanges(false);
    }
  };

  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setEditableInfo({
      ...editableInfo,
      [input.id]: input.value,
    });
  };

  const handleDateChange = ({
    target: input,
  }: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(input.value);
    setEditableInfo({
      ...editableInfo,
      dob: date,
    });
  };

  return (
    <OneToFivePage>
      <Container className={`w-75 p-5 mt-5 min-vh-100 bg-white`}>
        <Row>
          <h1>Personal Information</h1>
          <h4 className="text-muted" style={{}}>
            Provide information to protect your account
          </h4>
        </Row>
        <Row className={`mt-5 d-flex`}>
          <Form className={`w-50 mx-auto`}>
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label className={`fw-bolder`} column sm={5}>
                Email
              </Form.Label>
              <Col sm={7}>
                {isEditMode ? (
                  <Form.Control
                    value={editableInfo.email}
                    type="email"
                    onChange={handleChange}
                  />
                ) : (
                  <Form.Label className={``} column>
                    {readOnlyInfo.email}
                  </Form.Label>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="dob">
              <Form.Label className={`fw-bolder`} column sm={5}>
                Birthday
              </Form.Label>
              <Col sm={7}>
                {isEditMode ? (
                  <Form.Control
                    value={dateToYYYYMMDD(editableInfo.dob)}
                    type="date"
                    onChange={handleDateChange}
                  />
                ) : (
                  <Form.Label className={``} column>
                    {dateToDDMMYYYY(readOnlyInfo.dob) ||
                      'No birthday added yet'}
                  </Form.Label>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="" controlId="phone">
              <Form.Label className={`fw-bolder`} column sm={5}>
                Phone number
              </Form.Label>
              <Col sm={7}>
                {isEditMode ? (
                  <Form.Control
                    value={editableInfo.phone}
                    type="text"
                    onChange={handleChange}
                  />
                ) : (
                  <Form.Label className={``} column>
                    {readOnlyInfo.phone || 'No phone number added yet'}
                  </Form.Label>
                )}
              </Col>
            </Form.Group>
            {isEditMode ? (
              <div>
                <Form.Group as={Row} className="mt-3">
                  <Col sm={{ span: 2, offset: 5 }}>
                    <Button
                      className={`d-flex align-items-center text-nowrap`}
                      onClick={handleSaveChanges}
                    >
                      Save changes
                    </Button>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-3">
                  <Col sm={{ span: 1, offset: 5 }}>
                    <Button
                      className={`d-flex align-items-center text-nowrap`}
                      onClick={handleCancelEdit}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                  </Col>
                </Form.Group>
              </div>
            ) : (
              <Form.Group as={Row} className="mt-3">
                <Col sm={{ span: 1, offset: 5 }}>
                  <Button
                    className={`d-flex align-items-center mx-auto`}
                    onClick={handleEnableEditMode}
                    disabled={isSavingChanges}
                  >
                    {isSavingChanges ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <>
                        <BsPencil className="me-1" />
                        <span className={`text-nowrap`}>Edit</span>
                      </>
                    )}
                  </Button>
                </Col>
              </Form.Group>
            )}
          </Form>
        </Row>
      </Container>
    </OneToFivePage>
  );
};

export default EditPersonalInfoPage;
