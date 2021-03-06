import { FC, useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useLocation, useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { GoogleLogin, googleLogout, GoogleOAuthProvider } from '@react-oauth/google';
import { errors as errorCodes } from '../../app/util/errors';
import { authCredentials, customer } from '../../app/util/interfaces';
import { logIn, logInWithGoogle, loginSuccess, setError } from '../../redux';
import { State } from '../../redux/store';

import style from './LoginForm.module.css';
import { FormInput } from '../../components';
import authAPI from '../../api/auth';
import { getErrorMessage } from '../../app/util';
import { toast } from 'react-toastify';

interface loginFormProps {
  intl: IntlShape;
}

const LoginForm: FC<loginFormProps> = props => {
  const { intl } = props;
  const navigate = useNavigate();
  const location = useLocation();

  //general login form labels
  const title = <FormattedMessage id="LoginForm.title" defaultMessage="Sign in" />;
  const forgotPasswordMessage = (
    <FormattedMessage
      id="LoginForm.forgotPassword"
      defaultMessage="Forgot your password?"
    />
  );
  const newToUsMessage = (
    <FormattedMessage id="LoginForm.newToUs" defaultMessage="New to us?" />
  );
  const signUpMessage = (
    <FormattedMessage id="LoginForm.signUp" defaultMessage="Sign up." />
  );
  const dividerMesage = <FormattedMessage id="LoginForm.divider" defaultMessage="Or" />;

  //button labels
  const submitMessage = (
    <FormattedMessage id="LoginForm.submit" defaultMessage="Sign in" />
  );
  const continueWithGoogleLabel = intl.formatMessage({
    id: 'LoginForm.continueWithGoogleLabel',
  });

  const loginFormEmailLabel = intl.formatMessage({
    id: 'LoginForm.emailLabel',
    defaultMessage: 'Email',
  });
  const loginFormEmailPlaceholder = intl.formatMessage({
    id: 'LoginForm.emailPlaceholder',
    defaultMessage: 'example@email.com',
  });

  //password
  const loginFormPasswordLabel = intl.formatMessage({
    id: 'LoginForm.passwordLabel',
  });
  const loginFormPasswordPlaceholder = intl.formatMessage({
    id: 'LoginForm.passwordPlaceholder',
    defaultMessage: 'some-secret-password',
  });

  const dispatch = useDispatch();

  const schema = Joi.object({
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
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    getFieldState,
  } = useForm<authCredentials>({
    resolver: joiResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      customerEmail: '',
      customerPassword: '',
    },
  });

  const handleLogin: SubmitHandler<authCredentials> = async data => {
    try {
      const res: any = await authAPI.logIn(data);
      const { user, token } = res;
      localStorage.setItem('authToken', token);
      const customer: customer = { ...user };
      dispatch(loginSuccess({ ...customer }));
      const { state: locationState }: { state: any } = location;
      navigate(locationState ? locationState.from.pathname : '/');
    } catch (e: any) {
      if (e.response && e.response.data.msg === 'account-inactived') {
        const { userId } = e.response.data;
        navigate(`/login/not-verified?userId=${userId}`);
      } else if (e.response && e.response.data.msg === 'account-banned') {
        navigate(`/account-banned`);
      } else {
        const errorMsg = getErrorMessage(e);
        const errorCode: any = errorCodes.auth[errorMsg as keyof typeof errorCodes.auth];
        toast.error(intl.formatMessage({ id: `Auth.${errorCode}` }));
      }
    }
  };

  const handleGoogleLogin = async (data: any) => {
    const { credential } = data;
    try {
      //dispatch(logInWithGoogle(credential));

      const res = (await authAPI.logInWithGoogle(credential)) as any;
      const { user, accessToken } = res;
      const customer: customer = { ...user };
      localStorage.setItem('authToken', accessToken);
      dispatch(loginSuccess({ ...customer }));

    } catch (error: any) {
      if (error.response && error.response.data.msg === 'account-banned') {
        navigate(`/account-banned`);
      }
      else {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.auth[errorMsg as keyof typeof errorCodes.auth];
        toast.error(intl.formatMessage({ id: `Auth.${errorCode}` }));
      }
    }
  };

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    dispatch(setError(null));
  }, []);

  return (
    <>
      <div className={style.loginFormContainer}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.otherIdpButtonRow}>
          <GoogleLogin
            // buttonText={continueWithGoogleLabel}
            theme="outline"
            onSuccess={(res: any) => {
              console.log(res);
              handleGoogleLogin(res);
            }}
            onError={() => toast.error(intl.formatMessage({ id: 'Auth.actionFailed' }))}
            allowed_parent_origin={['https://deex.tk', 'https://www.deex.tk']}
          />
        </div>
        <div className={style.divider}>
          <span>{dividerMesage}</span>
        </div>

        <Form onSubmit={handleSubmit(handleLogin)}>
          <FormInput
            label={loginFormEmailLabel}
            placeholder={loginFormEmailPlaceholder}
            name="customerEmail"
            control={control}
            className={`mb-3`}
          />

          <FormInput
            label={loginFormPasswordLabel}
            placeholder={loginFormPasswordPlaceholder}
            name="customerPassword"
            control={control}
            className={`mb-3`}
            type="password"
          />
          <Form.Text>
            <Link to="/recover" className={style.forgetPasswordText}>
              {forgotPasswordMessage}
            </Link>
          </Form.Text>

          <Button variant="primary" type="submit" className={style.submitButton}>
            {submitMessage}
          </Button>
        </Form>

        <div className={style.bottomWrapper}>
          <span>{newToUsMessage}</span>
          <Link to="/signup">{signUpMessage}</Link>
        </div>
      </div>
    </>
  );
};

export default injectIntl(LoginForm);
