import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { FormattedMessage, injectIntl } from "react-intl";

import style from './LoginForm.module.css';

const LoginForm: FC = () => {

  //general login form labels
  const title = <FormattedMessage id="LoginForm.title" defaultMessage="Sign in" />
  const continueWithGoogleLabel = <FormattedMessage
    id="LoginForm.continueWithGoogleLabel" defaultMessage="Continue with Google" />
  const continueWithFacebookLabel = <FormattedMessage
    id="LoginForm.continueWithFacebookLabel" defaultMessage="Continue with Facebook" />

  //login form fields labels
  const loginFormEmailLabel = <FormattedMessage
    id="LoginForm.emailLabel" defaultMessage="Email" />
  const loginFormPasswordLabel = <FormattedMessage
    id="LoginForm.passwordLabel" defaultMessage="Password" />

  return (
    <>
      <div className={style.loginFormContainer}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.otherIdpButtonRow}>
          <Button>{continueWithGoogleLabel}</Button>
          <Button>{continueWithFacebookLabel}</Button>
        </div>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{loginFormEmailLabel}</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{loginFormPasswordLabel}</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  )
}

export default LoginForm;