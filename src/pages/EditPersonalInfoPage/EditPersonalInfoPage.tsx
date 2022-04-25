import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
  const pageTitle = (
    <FormattedMessage
      id="EditPersonalInfoPage.pageTitle"
      defaultMessage="Personal Information"
    />
  );
  const pageSubTitle = (
    <FormattedMessage
      id="EditPersonalInfoPage.pageSubTitle"
      defaultMessage="Provide information to protect your account"
    />
  );
  const emailLabel = (
    <FormattedMessage
      id="EditPersonalInfoPage.emailLabel"
      defaultMessage="Email"
    />
  );
  const dobLabel = (
    <FormattedMessage
      id="EditPersonalInfoPage.dobLabel"
      defaultMessage="Birthday"
    />
  );
  const phoneLabel = (
    <FormattedMessage
      id="EditPersonalInfoPage.phoneLabel"
      defaultMessage="Phone number"
    />
  );
  const editBtnLabel = (
    <FormattedMessage
      id="EditPersonalInfoPage.editBtnLabel"
      defaultMessage="Edit"
    />
  );
  const saveBtnLabel = (
    <FormattedMessage
      id="EditPersonalInfoPage.saveBtnLabel"
      defaultMessage="Save changes"
    />
  );
  const cancelBtnLabel = (
    <FormattedMessage
      id="EditPersonalInfoPage.cancelBtnLabel"
      defaultMessage="Cancel"
    />
  );
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

  //Function to format Date object into DD/MM/YYYY
  const dateToDDMMYYYY = (date: Date | null) =>
    date
      ? `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`
      : '';

  //Function to format Date object into YYYY-MM-DD
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
      <Container
        className={`w-75 p-5 mt-5 bg-white`}
        style={{ minHeight: '75vh' }}
      >
        {/* Title and subtitle */}
        <Row>
          <h1>{pageTitle}</h1>
          <h4 className="text-muted" style={{}}>
            {pageSubTitle}
          </h4>
        </Row>
        {/* Form */}
        <Row className={`mt-5 d-flex`}>
          <Form className={`w-50 mx-auto`}>
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label className={`fw-bolder`} column sm={5}>
                {emailLabel}
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
                {dobLabel}
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
                {phoneLabel}
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
              // Render Save and Cancel
              <div>
                <Form.Group as={Row} className="mt-3">
                  <Col sm={{ span: 2, offset: 5 }}>
                    <Button
                      className={`d-flex align-items-center text-nowrap`}
                      onClick={handleSaveChanges}
                    >
                      {saveBtnLabel}
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
                      {cancelBtnLabel}
                    </Button>
                  </Col>
                </Form.Group>
              </div>
            ) : (
              //Render Edit button
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
                        <span className={`text-nowrap`}>{editBtnLabel}</span>
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
