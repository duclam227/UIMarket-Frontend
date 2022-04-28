import { FC, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { authCredentials } from "../../app/util/interfaces";
import { logIn } from "../../redux";
import { State } from "../../redux/store";

import style from './LoginForm.module.css';

interface loginFormProps {
  intl: IntlShape
}

const LoginForm: FC<loginFormProps> = (props) => {
  const { intl } = props;

  //general login form labels
  const title = <FormattedMessage id="LoginForm.title" defaultMessage="Sign in" />
  const forgotPasswordMessage = <FormattedMessage
    id="LoginForm.forgotPassword" defaultMessage="Forgot your password?" />
  const newToUsMessage = <FormattedMessage
    id="LoginForm.newToUs" defaultMessage="New to us?" />;
  const signUpMessage = <FormattedMessage
    id="LoginForm.signUp" defaultMessage="Sign up." />
  const dividerMesage = <FormattedMessage
    id="LoginForm.divider" defaultMessage="Or" />

  //button labels
  const submitMessage = <FormattedMessage
    id="LoginForm.submit" defaultMessage="Sign in" />
  const continueWithGoogleLabel = intl.formatMessage({
    id: "LoginForm.continueWithGoogleLabel"
  });

  //email
  const loginFormEmailLabel = <FormattedMessage
    id="LoginForm.emailLabel" defaultMessage="Email" />
  const loginFormEmailPlaceholder = intl.formatMessage({
    id: "LoginForm.emailPlaceholder",
    defaultMessage: "example@email.com",
  })

  //password
  const loginFormPasswordLabel = <FormattedMessage
    id="LoginForm.passwordLabel" defaultMessage="Password" />
  const loginFormPasswordPlaceholder = intl.formatMessage({
    id: "LoginForm.passwordPlaceholder",
    defaultMessage: "some-secret-password",
  })

  const dispatch = useDispatch();
  const authError = useSelector((state: State) => state.auth.error);

  const [credentials, setCredentials] = useState<authCredentials>({
    customerEmail: '',
    customerPassword: '',
  });

  const onChange = ({ currentTarget: input }: any) => {
    setCredentials({ ...credentials, [input.id]: input.value });
  }

  const handleLogin = () => {
    dispatch(logIn(credentials));
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
            onSuccess={(res: any) => console.log(res)}
            onFailure={(res: any) => console.log(res)}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <div className={style.divider}>
          <span>{dividerMesage}</span>
        </div>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label className={style.label}>{loginFormEmailLabel}</Form.Label>
            <Form.Control
              id="customerEmail"
              type="email"
              placeholder={loginFormEmailPlaceholder}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={style.label}>{loginFormPasswordLabel}</Form.Label>
            <Form.Control
              id="customerPassword"
              type="password"
              placeholder={loginFormPasswordPlaceholder}
              required={true}
              onChange={(e) => onChange(e)}
            />
            <Form.Text>
              <Link to='/' className={style.forgetPasswordText}>{forgotPasswordMessage}</Link>
            </Form.Text>
          </Form.Group>

          {authError ?
            <Form.Text>
              <Alert variant="danger">{authError}</Alert>
            </Form.Text>
            : null}


          <Button
            variant="primary"
            type='button'
            className={style.submitButton}
            onClick={handleLogin}
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
  )
}

export default injectIntl(LoginForm);