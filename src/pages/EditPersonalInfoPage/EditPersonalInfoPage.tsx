import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import { BsPencil } from 'react-icons/bs';

import { logInWithJWT } from '../../redux/index';
import { OneToFivePage } from '../../components';

import profileAPI from '../../api/profile';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';

import style from './EditPersonalInfoPage.module.css';

export interface UserInfo {
  email: string;
  dob: Date | null;
  phone: string;
}

interface IProps {
  intl: IntlShape;
}

const EditPersonalInfoPage: FC<IProps> = props => {
  const { intl } = props;

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
    <FormattedMessage id="EditPersonalInfoPage.emailLabel" defaultMessage="Email" />
  );
  const dobLabel = (
    <FormattedMessage id="EditPersonalInfoPage.dobLabel" defaultMessage="Birthday" />
  );
  const phoneLabel = (
    <FormattedMessage
      id="EditPersonalInfoPage.phoneLabel"
      defaultMessage="Phone number"
    />
  );
  const editBtnLabel = (
    <FormattedMessage id="EditPersonalInfoPage.editBtnLabel" defaultMessage="Edit" />
  );
  const saveBtnLabel = (
    <FormattedMessage
      id="EditPersonalInfoPage.saveBtnLabel"
      defaultMessage="Save changes"
    />
  );
  const cancelBtnLabel = (
    <FormattedMessage id="EditPersonalInfoPage.cancelBtnLabel" defaultMessage="Cancel" />
  );
  //Function to format Date object into DD/MM/YYYY
  const dateToDDMMYYYY = (date: Date | null) =>
    date ? `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}` : '';
  //Function to format Date object into YYYY-MM-DD
  const dateToYYYYMMDD = (date: Date | null) => {
    if (date && isNaN(date.getTime())) {
      return '00-00-0000';
    }
    return date?.toISOString().split('T')[0];
  };

  const params = useParams();
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isSavingChanges, setIsSavingChanges] = useState<boolean>(false);
  const [originalInfo, setOriginalInfo] = useState<UserInfo>({
    email: '',
    dob: new Date(),
    phone: '',
  });
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      //tlds: Top-Level Domain Something, set this to false because it said that built-in TLD is disabled, idk :\
      .required()
      .label('Email'),
    dob: Joi.date().iso().label('Birthday'),
    phone: Joi.string()
      .allow(null, '')
      .max(11)
      .pattern(/^[0-9]+$/, { name: 'phone numbers' }) // phone number pattern
      .label('Phone number'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    control,
  } = useForm<UserInfo>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      dob: new Date(),
      phone: '',
    },
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
        const date = new Date(user.customerDOB);
        setOriginalInfo({
          email: user.customerEmail,
          dob: user.customerDOB ? date : null,
          phone: user.customerPhone ? user.customerPhone : '',
        });
        reset({
          email: user.customerEmail,
          dob: date,
          phone: user.customerPhone ? user.customerPhone : '',
        });
      } catch (error) {
        const errorMsg = getErrorMessage(error);
        const errorCode: any =
          errorCodes.profile[errorMsg as keyof typeof errorCodes.profile];
        toast.error(intl.formatMessage({ id: `Profile.${errorCode}` }));
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
    // reset({ phone: '' });
  };

  const handleCancelEdit = () => {
    reset(originalInfo);
    setIsEditMode(false);
  };

  const handleSaveChanges: SubmitHandler<UserInfo> = async data => {
    setIsEditMode(false);
    try {
      setIsSavingChanges(true);
      await profileAPI.updateUserInfo(data);
      setIsSavingChanges(false);
      syncChangesToReduxStore();
      setOriginalInfo({ ...data });
      toast.success(
        intl.formatMessage({ id: 'ResetForgetPasswordForm.actionCompleted' }),
      );
    } catch (e) {
      reset({ ...originalInfo });
      toast.error(intl.formatMessage({ id: 'AccountVerifiedPage.failedTitle' }));
      console.log('Update user info error: ', e);
      setIsSavingChanges(false);
    }
  };

  return (
    <>
      {/* Title and subtitle */}
      <Row className={``}>
        <h1>{pageTitle}</h1>
        <h4 className="text-muted" style={{}}>
          {pageSubTitle}
        </h4>
      </Row>
      {/* Form */}
      <Row className={`mt-2`}>
        <Form className={`mx-auto p-0`} onSubmit={handleSubmit(handleSaveChanges)}>
          <div className={`border`}>
            <Form.Group
              as={Row}
              className={`m-0 ${style.infoItem} py-1`}
              controlId="email"
            >
              <Form.Label
                className={`fw-bolder pe-0 d-flex align-items-center`}
                column
                sm={12}
                md={3}
                lg={2}
              >
                {emailLabel}
              </Form.Label>
              <Col sm={12} md={4} lg={5} className="d-flex align-items-center">
                <Form.Control
                  type="email"
                  plaintext={!isEditMode}
                  readOnly={!isEditMode}
                  {...register('email')}
                  disabled={true}
                />
              </Col>
              {errors.email && (
                <Col sm={12} md={5} lg={5}>
                  <Alert variant="danger" className="my-1">
                    {errors.email.message}
                  </Alert>
                </Col>
              )}
            </Form.Group>

            <Form.Group as={Row} className={`m-0 ${style.infoItem} py-1`} controlId="dob">
              <Form.Label
                className={`fw-bolder pe-0 d-flex align-items-center`}
                column
                sm={12}
                md={3}
                lg={2}
              >
                {dobLabel}
              </Form.Label>
              <Col sm={12} md={4} lg={5} className="d-flex align-items-center">
                <Controller
                  control={control}
                  name="dob"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Form.Control
                      value={dateToYYYYMMDD(value)}
                      type="date"
                      onChange={e => onChange(new Date(e.target.value))}
                      onBlur={onBlur}
                      ref={ref}
                      plaintext={!isEditMode}
                      readOnly={!isEditMode}
                    />
                  )}
                />
              </Col>
              {errors.dob && (
                <Col sm={12} md={5} lg={5}>
                  <Alert variant="danger" className="my-1">
                    {errors.dob.message}
                  </Alert>
                </Col>
              )}
              {!isEditMode && (
                <Form.Label
                  className={`${style.textUnderlineHover} text-primary d-md-flex justify-content-end text-nowrap`}
                  column
                  sm={12}
                  md={{ span: 2, offset: 3 }}
                  lg={{ span: 2, offset: 3 }}
                  onClick={handleEnableEditMode}
                >
                  {editBtnLabel}
                </Form.Label>
              )}
            </Form.Group>

            <Form.Group
              as={Row}
              className={`m-0 ${style.infoItem} py-1`}
              controlId="phone"
            >
              <Form.Label
                className={`fw-bolder pe-0 d-flex align-items-center`}
                column
                sm={12}
                md={3}
                lg={2}
              >
                {phoneLabel}
              </Form.Label>
              <Col sm={12} md={4} lg={5} className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  placeholder='No phone number added yet'
                  plaintext={!isEditMode}
                  readOnly={!isEditMode}
                  {...register('phone')}
                />
              </Col>
              {errors.phone && (
                <Col sm={12} md={5} lg={5}>
                  <Alert variant="danger" className="my-1">
                    {errors.phone.message}
                  </Alert>
                </Col>
              )}
              {!isEditMode && (
                <Form.Label
                  className={`${style.textUnderlineHover} text-primary d-md-flex justify-content-end text-nowrap`}
                  column
                  sm={12}
                  md={{ span: 2, offset: 3 }}
                  lg={{ span: 2, offset: 3 }}
                  onClick={handleEnableEditMode}
                >
                  {editBtnLabel}
                </Form.Label>
              )}
            </Form.Group>
          </div>

          {isEditMode && (
            // Render Save and Cancel
            <div>
              <Form.Group as={Row} className="mt-3">
                <Col
                  sm={{ span: 2, offset: 5 }}
                  md={{ span: 2, offset: 3 }}
                  lg={{ span: 2, offset: 2 }}
                >
                  <Button
                    className={`d-flex align-items-center text-nowrap`}
                    type="submit"
                    disabled={!isDirty || !isValid}
                  >
                    {saveBtnLabel}
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mt-3">
                <Col
                  sm={{ span: 2, offset: 5 }}
                  md={{ span: 2, offset: 3 }}
                  lg={{ span: 2, offset: 2 }}
                >
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
          )}
        </Form>
      </Row>
    </>
  );
};

export default injectIntl(EditPersonalInfoPage);
