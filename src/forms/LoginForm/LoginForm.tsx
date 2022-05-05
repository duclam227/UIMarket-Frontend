import { FC, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { authCredentials } from "../../app/util/interfaces";
import { logIn, logInWithGoogle } from "../../redux";
import { State } from "../../redux/store";

import style from './LoginForm.module.css';
import { FormInput } from '../../components';

interface loginFormProps {
  intl: IntlShape;
}

const LoginForm: FC<loginFormProps> = props => {
  const { intl } = props;

  //general login form labels
  const title = (
    <FormattedMessage id="LoginForm.title" defaultMessage="Sign in" />
  );
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
  const dividerMesage = (
    <FormattedMessage id="LoginForm.divider" defaultMessage="Or" />
  );

  //button labels
  const submitMessage = <FormattedMessage
    id="LoginForm.submit" defaultMessage="Sign in" />
  const continueWithGoogleLabel = intl.formatMessage({
    id: "LoginForm.continueWithGoogleLabel"
  });

  //email
  // const loginFormEmailLabel = (
  //   <FormattedMessage id="LoginForm.emailLabel" defaultMessage="Email" />
  // );
  const loginFormEmailLabel = intl.formatMessage({
    id: 'LoginForm.emailLabel',
    defaultMessage: 'Email',
  });
  const loginFormEmailPlaceholder = intl.formatMessage({
    id: 'LoginForm.emailPlaceholder',
    defaultMessage: 'example@email.com',
  });

  //password
  const loginFormPasswordLabel = (
    <FormattedMessage id="LoginForm.passwordLabel" defaultMessage="Password" />
  );
  const loginFormPasswordPlaceholder = intl.formatMessage({
    id: 'LoginForm.passwordPlaceholder',
    defaultMessage: 'some-secret-password',
  });

  const dispatch = useDispatch();
  const authError = useSelector((state: State) => state.auth.error);

  const schema = Joi.object({
    customerEmail: Joi.string()
      .email({ tlds: { allow: false } })
      //tlds: Top-Level Domain Something, set this to false because it said that built-in TLD is disabled, idk :\
      .required()
      .label('Email'),
    customerPassword: Joi.string().required().label('Password'), //Remember to add min(8) rule
  });
  // const [credentials, setCredentials] = useState<authCredentials>({
  //   customerEmail: '',
  //   customerPassword: '',
  // });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    getFieldState,
  } = useForm<authCredentials>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      customerEmail: '',
      customerPassword: '',
    },
  });

  // const onChange = ({ currentTarget: input }: any) => {
  //   setCredentials({ ...credentials, [input.id]: input.value });
  // };

  const handleLogin: SubmitHandler<authCredentials> = data => {
    dispatch(logIn(data));
  };

  const handleGoogleLogin = (data: any) => {
    const { tokenId } = data;
    dispatch(logInWithGoogle(tokenId));
  }

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <>
      <div className={style.loginFormContainer}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.otherIdpButtonRow}>
          <GoogleLogin
            clientId={CLIENT_ID!}
            buttonText={continueWithGoogleLabel}
            onSuccess={(res: any) => handleGoogleLogin(res)}
            onFailure={(res: any) => console.log(res)}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <div className={style.divider}>
          <span>{dividerMesage}</span>
        </div>

        <Form onSubmit={handleSubmit(handleLogin)}>
          {/* <Form.Group className="mb-3">
            <Form.Label className={style.label}>
              {loginFormEmailLabel}
            </Form.Label>
            <Form.Control
              id="customerEmail"
              type="email"
              placeholder={loginFormEmailPlaceholder}
              required={true}
              onChange={e => onChange(e)}
            />
          </Form.Group> */}
          <FormInput
            label={loginFormEmailLabel}
            placeholder={loginFormEmailPlaceholder}
            name="customerEmail"
            control={control}
            className={`mb-3`}
          />
          <Form.Group className="mb-3" controlId="customerPassword">
            <Form.Label className={style.label}>
              {loginFormPasswordLabel}
            </Form.Label>
            <Form.Control
              type="password"
              placeholder={loginFormPasswordPlaceholder}
              isInvalid={getFieldState('customerPassword').error ? true : false}
              {...register('customerPassword')}
            />
            <Form.Text>
              <Link to="/" className={style.forgetPasswordText}>
                {forgotPasswordMessage}
              </Link>
            </Form.Text>
            {errors.customerPassword && (
              <Alert variant="danger" className="mt-1">
                {errors.customerPassword.message}
              </Alert>
            )}
          </Form.Group>

          {authError ? (
            <Form.Text>
              <Alert variant="danger">{authError}</Alert>
            </Form.Text>
          ) : null}

          <Button
            variant="primary"
            type="submit"
            className={style.submitButton}
          >
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
