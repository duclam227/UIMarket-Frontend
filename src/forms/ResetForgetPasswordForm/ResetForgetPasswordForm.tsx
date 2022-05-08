import { FC } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import Joi from 'joi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { BsChevronLeft } from 'react-icons/bs';

import { FormInput } from '../../components';
import authAPI from '../../api/auth';

interface UpdatePasswordRHFProps {
  password: string;
  confirmPassword: string;
}
const ResetForgetPasswordForm: FC<{ intl: IntlShape }> = ({ intl }) => {
  // Navigate to Sign In
  const backSignInNavLabel = (
    <FormattedMessage
      id="RecoverPasswordForm.backSignInNavLabel"
      defaultMessage="Back to Sign In"
    />
  );

  //Page title
  const title = (
    <FormattedMessage
      id="ResetForgetPasswordForm.title"
      defaultMessage="Reset your password"
    />
  );

  //Reset password form
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

  //Reset button
  const resetPasswordBtnLabel = (
    <FormattedMessage
      id="RecoverPasswordForm.resetPasswordBtnLabel"
      defaultMessage="Recover password"
    />
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const schema = Joi.object({
    password: Joi.string().required().label('New password'),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  });
  const { handleSubmit, control } = useForm<UpdatePasswordRHFProps>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onResetPassword: SubmitHandler<UpdatePasswordRHFProps> = async data => {
    const userId = searchParams.get('userId');
    const verifyCode = searchParams.get('verifyCode');
    if (!userId || !verifyCode)
      return console.log('UserId or verifyCode not found in searchParams');
    const credentials = {
      userId,
      verifyCode,
      newPassword: data.password,
    };
    try {
      await authAPI.resetPassword(credentials);
      navigate('/login');
    } catch (e) {
      console.log('Reset password API call failed: ', e);
    }
  };

  return (
    <Container className={`pt-5`}>
      <Col sm={{ span: 7, offset: 3 }}>
        {/* Navigate to Sign In */}
        <Row className="mt-5">
          <Link
            to="/login"
            className="d-flex align-items-center"
            style={{ width: 'fit-content' }}
          >
            <div className="d-flex align-items-center justify-content center me-2">
              <BsChevronLeft />
            </div>
            <span>{backSignInNavLabel}</span>
          </Link>
        </Row>

        {/* Title */}
        <Row className="mt-4">
          <h2>{title}</h2>
        </Row>

        {/* Reset password form */}
        <Form onSubmit={handleSubmit(onResetPassword)}>
          <Row className={`mt-4`}>
            <FormInput
              type="password"
              name="password"
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
              <Button type="submit">{resetPasswordBtnLabel}</Button>
            </span>
          </Row>
        </Form>
      </Col>
    </Container>
  );
};

export default injectIntl(ResetForgetPasswordForm);
