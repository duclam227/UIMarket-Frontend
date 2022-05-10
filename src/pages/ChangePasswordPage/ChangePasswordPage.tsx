import { FC } from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useParams, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, SubmitHandler } from 'react-hook-form';

import Row from 'react-bootstrap/row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import { FormInput } from '../../components';
import { OneToFivePage } from '../../components';
import style from './ChangePasswordPage.module.css';
import authAPI from '../../api/auth';
import { getErrorMessage } from '../../app/util';

interface ChangePasswordRHFProps {
  newPassword: string;
  confirmPassword: string;
}
//Input current password
const ChangePasswordPage: FC<{ intl: IntlShape }> = ({ intl }) => {
  const newPasswordLabel = intl.formatMessage({
    id: 'ResetForgetPasswordForm.newPasswordLabel',
    defaultMessage: 'New password',
  });
  const newPasswordPlaceholder = intl.formatMessage({
    id: 'ResetForgetPasswordForm.newPasswordPlaceholder',
    defaultMessage: 'New password',
  });
  const confirmPasswordLabel = intl.formatMessage({
    id: 'ResetForgetPasswordForm.confirmPasswordLabel',
    defaultMessage: 'Confirm password',
  });
  const confirmPasswordPlaceholder = intl.formatMessage({
    id: 'ResetForgetPasswordForm.confirmPasswordPlaceholder',
    defaultMessage: 'Confirm password',
  });
  const changePasswordBtnLabel = (
    <FormattedMessage id="ChangePasswordPage.changePasswordBtnLabel" />
  );

  const navigate = useNavigate();
  const params = useParams();
  const schema = Joi.object({
    newPassword: Joi.string().required().label('New password'),
    confirmPassword: Joi.any()
      .equal(Joi.ref('newPassword'))
      .required()
      .label('Confirm password')
      .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  });

  const { handleSubmit, control } = useForm<ChangePasswordRHFProps>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onChangePassword: SubmitHandler<
    ChangePasswordRHFProps
  > = async data => {
    const { id: userId } = params;
    if (!userId) return;

    try {
      await authAPI.changePassword({
        userId,
        newPassword: data.newPassword,
      });
      navigate(`/user/${userId}`, { replace: true });
    } catch (error) {
      console.log(getErrorMessage(error));
    }
  };
  return (
    <OneToFivePage>
      <Container className={`w-75 p-5 mt-5 bg-white ${style.pageContainer}`}>
        <Col lg={{ span: 9, offset: 1 }}>
          <Row className={`mt-5`}>
            <h1>Change password</h1>
          </Row>
          <Form onSubmit={handleSubmit(onChangePassword)}>
            <Row className={`mt-4`}>
              <FormInput
                type="password"
                name="newPassword"
                label={newPasswordLabel}
                control={control}
                placeholder={newPasswordPlaceholder}
              />
            </Row>
            <Row className={`mt-4`}>
              <FormInput
                type="password"
                name="confirmPassword"
                label={confirmPasswordLabel}
                control={control}
                placeholder={confirmPasswordPlaceholder}
              />
            </Row>
            <Row className={`mt-4`}>
              <span>
                <Button type="submit">{changePasswordBtnLabel}</Button>
              </span>
            </Row>
          </Form>
        </Col>
      </Container>
    </OneToFivePage>
  );
};

export default injectIntl(ChangePasswordPage);
