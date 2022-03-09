import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";
import { Link } from "react-router-dom";

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
  const continueWithGoogleLabel = <FormattedMessage
    id="LoginForm.continueWithGoogleLabel" defaultMessage="Continue with Google" />
  const continueWithFacebookLabel = <FormattedMessage
    id="LoginForm.continueWithFacebookLabel" defaultMessage="Continue with Facebook" />

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

  return (
    <>
      <div className={style.loginFormContainer}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.otherIdpButtonRow}>
          <Button>{continueWithGoogleLabel}</Button>
          <Button>{continueWithFacebookLabel}</Button>
        </div>
        <div className={style.divider}>
          <span>{dividerMesage}</span>
        </div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className={style.label}>{loginFormEmailLabel}</Form.Label>
            <Form.Control type="email" placeholder={loginFormEmailPlaceholder} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={style.label}>{loginFormPasswordLabel}</Form.Label>
            <Form.Control type="password" placeholder={loginFormPasswordPlaceholder} />
            <Form.Text>
              <Link className={style.forgetPasswordText} to="/">{forgotPasswordMessage}</Link>
            </Form.Text>
          </Form.Group>

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
  )
}

export default injectIntl(LoginForm);