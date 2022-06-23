import { FC, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { authCredentials } from '../../app/util/interfaces';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';
import { logInWithGoogle, signUp } from '../../redux';
import { State } from '../../redux/store';

import { FormInput } from '../../components';
import authAPI from '../../api/auth';

import style from './SignupForm.module.css';
interface SignupFormProps {
  intl: IntlShape;
}

const SignupForm: FC<SignupFormProps> = props => {
  const { intl } = props;

  //general signup form labels
  const title = (
    <FormattedMessage id="SignupForm.title" defaultMessage="Sign in" />
  );
  const hasAnAccountMessage = (
    <FormattedMessage
      id="SignupForm.hasAnAccount"
      defaultMessage="Already has an account?"
    />
  );
  const signInMessage = (
    <FormattedMessage id="SignupForm.signIn" defaultMessage="Sign in." />
  );
  const dividerMesage = (
    <FormattedMessage id="SignupForm.divider" defaultMessage="Or" />
  );

  //button labels
  const submitMessage = (
    <FormattedMessage id="SignupForm.submit" defaultMessage="Sign in" />
  );
  const continueWithGoogleLabel = intl.formatMessage({
    id: 'LoginForm.continueWithGoogleLabel',
  });
  const continueWithFacebookLabel = (
    <FormattedMessage
      id="SignupForm.continueWithFacebookLabel"
      defaultMessage="Continue with Facebook"
    />
  );

  const signupFormNameLabel = intl.formatMessage({
    id: 'SignupForm.nameLabel',
    defaultMessage: 'Name',
  });
  const signupFormNamePlaceholder = intl.formatMessage({
    id: 'SignupForm.namePlaceholder',
    defaultMessage: 'John',
  });

  const signupFormEmailLabel = intl.formatMessage({
    id: 'SignupForm.emailLabel',
    defaultMessage: 'Email',
  });
  const signupFormEmailPlaceholder = intl.formatMessage({
    id: 'SignupForm.emailPlaceholder',
    defaultMessage: 'example@email.com',
  });

  const signupFormPasswordLabel = intl.formatMessage({
    id: 'SignupForm.passwordLabel',
    defaultMessage: 'Password',
  });
  const signupFormPasswordPlaceholder = intl.formatMessage({
    id: 'SignupForm.passwordPlaceholder',
    defaultMessage: 'some-secret-password',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = Joi.object({
    customerName: Joi.string().max(20).trim().required().label('Name')
      .messages({
        "string.base": intl.formatMessage({ id: "FormValidation.missingName" }),
        "string.empty": intl.formatMessage({ id: "FormValidation.requiredName" }),
        "string.max": intl.formatMessage({ id: "FormValidation.maxLengthName" }),
        "any.required": intl.formatMessage({ id: "FormValidation.requiredName" })
      }),
    customerEmail: Joi.string()
      .email({ tlds: { allow: false } })
      //tlds: Top-Level Domain Something, set this to false because it said that built-in TLD is disabled, idk :\
      .required()
      .messages({
        "string.base": intl.formatMessage({ id: "FormValidation.missingEmail" }),
        "string.empty": intl.formatMessage({ id: "FormValidation.requiredEmail" }),
        "string.email": intl.formatMessage({ id: "FormValidation.missingEmail" }),
        "any.required": intl.formatMessage({ id: "FormValidation.requiredEmail" })
      })
      .label('Email'),
    customerPassword: Joi.string().required().label('Password').min(6)
      .messages({
        "string.base": intl.formatMessage({ id: "FormValidation.requiredPassword" }),
        "string.empty": intl.formatMessage({ id: "FormValidation.requiredPassword" }),
        "string.min": intl.formatMessage({ id: "FormValidation.minLengthPassword" }, { min: 6 }),
        "any.required": intl.formatMessage({ id: "FormValidation.requiredPassword" })
      }), //Remember to add min(8) rule
  });

  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<authCredentials>({
    resolver: joiResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      customerEmail: '',
      customerPassword: '',
      customerName: '',
    },
  });

  const handleSignup: SubmitHandler<authCredentials> = async data => {
    try {
      const res: any = await authAPI.signUp(data);
      navigate(
        `/signup/verify-prompt?email=${data.customerEmail}&userId=${res.userId}`,
      );
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      const errorCode: any = errorCodes.auth[errorMsg as keyof typeof errorCodes.auth];
      toast.error(intl.formatMessage({ id: `Auth.${errorCode}` }))
    }
  };

  const handleGoogleLogin = (data: any) => {
    const { credential } = data;
    try {
      dispatch(logInWithGoogle(credential));
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      const errorCode: any = errorCodes.auth[errorMsg as keyof typeof errorCodes.auth];
      toast.error(intl.formatMessage({ id: `Auth.${errorCode}` }));
    }
  };

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <>
      <div className={style.signupFormContainer}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.otherIdpButtonRow}>
          <GoogleLogin
            // buttonText={continueWithGoogleLabel}
            text='continue_with'
            theme="outline"
            onSuccess={(res: any) => {
              console.log(res);
              handleGoogleLogin(res);
            }}
            onError={() => toast.error(intl.formatMessage({ id: 'Auth.actionFailed' }))}
          />
        </div>
        <div className={style.divider}>
          <span>{dividerMesage}</span>
        </div>

        <Form onSubmit={handleSubmit(handleSignup)}>
          <FormInput
            label={signupFormNameLabel}
            placeholder={signupFormNamePlaceholder}
            name="customerName"
            control={control}
            className={`mb-3`}
          />
          <FormInput
            type="email"
            label={signupFormEmailLabel}
            placeholder={signupFormEmailPlaceholder}
            name="customerEmail"
            control={control}
            className={`mb-3`}
          />
          <FormInput
            type="password"
            label={signupFormPasswordLabel}
            placeholder={signupFormPasswordPlaceholder}
            name="customerPassword"
            control={control}
            className={`mb-3`}
          />

          {/* <Form.Group className="mb-3">
            <Form.Label className={style.label}>
              {signupFormNameLabel}
            </Form.Label>
            <Form.Control
              id="customerName"
              type="name"
              placeholder={signupFormNamePlaceholder}
              required={true}
              onChange={e => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={style.label}>
              {signupFormEmailLabel}
            </Form.Label>
            <Form.Control
              id="customerEmail"
              type="email"
              placeholder={signupFormEmailPlaceholder}
              required={true}
              onChange={e => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={style.label}>
              {signupFormPasswordLabel}
            </Form.Label>
            <Form.Control
              id="customerPassword"
              type="password"
              placeholder={signupFormPasswordPlaceholder}
              required={true}
              onChange={e => onChange(e)}
            />
          </Form.Group> */}

          <Button
            variant="primary"
            type="submit"
            className={style.submitButton}
            disabled={!isValid}
          >
            {submitMessage}
          </Button>
        </Form>

        <div className={style.bottomWrapper}>
          <span>{hasAnAccountMessage}</span>
          <Link to="/login">{signInMessage}</Link>
        </div>
      </div>
    </>
  );
};

export default injectIntl(SignupForm);
