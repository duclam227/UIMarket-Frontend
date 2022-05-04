import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { BsChevronLeft } from 'react-icons/bs';

import NoMessage from '../../app/assets/NoMessage.svg';
import { FormInput } from '../../components';

interface RecoverCredentials {
  email: string;
}

const RecoverPasswordForm = () => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
  });
  const {
    handleSubmit,
    formState: { isSubmitted },
    control,
  } = useForm<RecoverCredentials>({
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
  const onSendRecoverLink: SubmitHandler<RecoverCredentials> = data => {
    setSubmittedRecoverCredenttials(data);
    setResendCountdown(60);
  };
  return (
    <Container className={`pt-5`}>
      <Col sm={{ span: 7, offset: 3 }}>
        <Row className="mt-5">
          <Link to="/login" className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content center me-2">
              <BsChevronLeft />
            </div>
            <span>Back to Sign In</span>
          </Link>
        </Row>
        <Row className="mt-4">
          <h2>Forgot Password</h2>
        </Row>
        {!submittedRecoverCredentials.email ? (
          <Form onSubmit={handleSubmit(onSendRecoverLink)}>
            <Row>
              <FormInput
                type="email"
                name="email"
                label="Email"
                control={control}
                className={`mt-4`}
                placeholder={`John@gmail.com`}
              />
              <Form.Text></Form.Text>
            </Row>
            <Row className="mt-1">
              <span>
                <Button type="submit">Recover password</Button>
              </span>
            </Row>
          </Form>
        ) : (
          <Row
            className={'flex-column justify-content-center align-items-center'}
          >
            <img src={NoMessage} height={250}></img>
            <span className="text-center">
              We've just sent a link to reset your password to
            </span>
            <p className={`text-center fw-bold text-primary`}>
              thisisaverylongemailname@gmail.com
            </p>
            <span className={`text-center`}>
              <Button
                variant={!!resendCountdown ? 'secondary' : 'primary'}
                disabled={!!resendCountdown}
              >
                Resend link{!!resendCountdown ? ` - ${resendCountdown}s` : ''}
              </Button>
            </span>
          </Row>
        )}
      </Col>
    </Container>
  );
};

export default RecoverPasswordForm;
