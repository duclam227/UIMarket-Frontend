import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { joiResolver } from '@hookform/resolvers/joi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { BsChevronLeft } from 'react-icons/bs';

import NoMessage from '../../app/assets/NoMessage.svg';
import { FormInput } from '../../components';
import authAPI from '../../api/auth';

export interface RecoverCredentials {
  email: string;
}

const RecoverPasswordForm: FC<{ intl: IntlShape }> = ({ intl }) => {
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
      id="RecoverPasswordForm.title"
      defaultMessage="Forgot Password"
    />
  );

  //Email form
  const emailLabel = intl.formatMessage({
    id: 'LoginForm.emailLabel',
    defaultMessage: 'Email',
  });
  const emailPlaceholder = intl.formatMessage({
    id: 'LoginForm.emailPlaceholder',
    defaultMessage: 'example@email.com',
  });
  const emailSmallText = (
    <FormattedMessage
      id="RecoverPasswordForm.emailSmallText"
      defaultMessage="Tell us the email address associated with your account, and we’ll send you an email with a link to reset your password."
    />
  );

  //Reset button
  const resetPasswordBtnLabel = (
    <FormattedMessage
      id="RecoverPasswordForm.resetPasswordBtnLabel"
      defaultMessage="Recover password"
    />
  );

  //Reset email
  const resetEmailMessage = (
    <FormattedMessage
      id="RecoverPasswordForm.resetEmailMessage"
      defaultMessage="We've just sent a link to reset your password to"
    />
  );
  const resendBtnLabel = (
    <FormattedMessage
      id="RecoverPasswordForm.resendBtnLabel"
      defaultMessage="Resend link"
    />
  );
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
  });
  const { handleSubmit, control } = useForm<RecoverCredentials>({
    resolver: joiResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const [submittedRecoverCredentials, setSubmittedRecoverCredenttials] =
    useState<RecoverCredentials>({
      email: '',
    });
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (resendCountdown > 0) setTimeout(tick, 1000);
  }, [resendCountdown]);
  const tick = () => {
    setResendCountdown(resendCountdown - 1);
  };

  const onSubmitEmail: SubmitHandler<RecoverCredentials> = data => {
    setSubmittedRecoverCredenttials(data);
    sendRecoverPasswordRequest();
  };
  const sendRecoverPasswordRequest = async () => {
    setResendCountdown(60);
    try {
      await authAPI.sendRecoverPasswordRequest(submittedRecoverCredentials);
    } catch (error) {
      console.log(error);
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
        {!submittedRecoverCredentials.email ? (
          // Email form
          <Form onSubmit={handleSubmit(onSubmitEmail)}>
            <Row className={`mt-4`}>
              <FormInput
                type="email"
                name="email"
                label={emailLabel}
                control={control}
                placeholder={emailPlaceholder}
              />
              <Form.Text>{emailSmallText}</Form.Text>
            </Row>
            <Row className="mt-4">
              <span>
                <Button type="submit">{resetPasswordBtnLabel}</Button>
              </span>
            </Row>
          </Form>
        ) : (
          // Resend link UI
          <Row
            className={'flex-column justify-content-center align-items-center'}
          >
            <img src={NoMessage} alt="Check email" height={250}></img>
            <span className="text-center">{resetEmailMessage}</span>
            <p className={`text-center fw-bold text-primary`}>
              {submittedRecoverCredentials.email}
            </p>
            <span className={`text-center`}>
              <Button
                variant={!!resendCountdown ? 'secondary' : 'primary'}
                disabled={!!resendCountdown}
                onClick={sendRecoverPasswordRequest}
              >
                {resendBtnLabel}
                {!!resendCountdown ? ` - ${resendCountdown}s` : ''}
              </Button>
            </span>
          </Row>
        )}
      </Col>
    </Container>
  );
};

export default injectIntl(RecoverPasswordForm);
