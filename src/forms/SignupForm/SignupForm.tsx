import { FC, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authCredentials } from "../../app/util/interfaces";
import { signUp } from "../../redux";
import { State } from "../../redux/store";

import style from './SignupForm.module.css';

interface SignupFormProps {
  intl: IntlShape
}

const SignupForm: FC<SignupFormProps> = (props) => {
  const { intl } = props;

  //general signup form labels
  const title = <FormattedMessage id="SignupForm.title" defaultMessage="Sign in" />
  const hasAnAccountMessage = <FormattedMessage
    id="SignupForm.hasAnAccount" defaultMessage="Already has an account?" />;
  const signInMessage = <FormattedMessage
    id="SignupForm.signIn" defaultMessage="Sign in." />
  const dividerMesage = <FormattedMessage
    id="SignupForm.divider" defaultMessage="Or" />

  //button labels
  const submitMessage = <FormattedMessage
    id="SignupForm.submit" defaultMessage="Sign in" />
  const continueWithGoogleLabel = <FormattedMessage
    id="SignupForm.continueWithGoogleLabel" defaultMessage="Continue with Google" />
  const continueWithFacebookLabel = <FormattedMessage
    id="SignupForm.continueWithFacebookLabel" defaultMessage="Continue with Facebook" />

  //name
  const signupFormNameLabel = <FormattedMessage
    id="SignupForm.nameLabel" defaultMessage="Name" />
  const signupFormNamePlaceholder = intl.formatMessage({
    id: "SignupForm.namePlaceholder",
    defaultMessage: "John",
  })

  //email
  const signupFormEmailLabel = <FormattedMessage
    id="SignupForm.emailLabel" defaultMessage="Email" />
  const signupFormEmailPlaceholder = intl.formatMessage({
    id: "SignupForm.emailPlaceholder",
    defaultMessage: "example@email.com",
  })

  //password
  const signupFormPasswordLabel = <FormattedMessage
    id="SignupForm.passwordLabel" defaultMessage="Password" />
  const signupFormPasswordPlaceholder = intl.formatMessage({
    id: "SignupForm.passwordPlaceholder",
    defaultMessage: "some-secret-password",
  })

  const dispatch = useDispatch();
  const authError = useSelector((state: State) => state.auth.error);

  const [credentials, setCredentials] = useState<authCredentials>({
    customerEmail: '',
    customerPassword: '',
    customerName: '',
  });

  const onChange = ({ currentTarget: input }: any) => {
    setCredentials({ ...credentials, [input.id]: input.value });
  }

  const handleSignup = () => {
    dispatch(signUp(credentials))
  }

  return (
    <>
      <div className={style.SignupFormContainer}>
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
            <Form.Label className={style.label}>{signupFormNameLabel}</Form.Label>
            <Form.Control
              id="customerName"
              type="name"
              placeholder={signupFormNamePlaceholder}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={style.label}>{signupFormEmailLabel}</Form.Label>
            <Form.Control
              id="customerEmail"
              type="email"
              placeholder={signupFormEmailPlaceholder}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={style.label}>{signupFormPasswordLabel}</Form.Label>
            <Form.Control
              id="customerPassword"
              type="password"
              placeholder={signupFormPasswordPlaceholder}
              required={true}
              onChange={(e) => onChange(e)}
            />
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
            onClick={handleSignup}
          >
            {submitMessage}
          </Button>
        </Form>

        <div className={style.bottomWrapper}>
          <span>{hasAnAccountMessage}</span>
          <Link to="/signup">{signInMessage}</Link>
        </div>
      </div>
    </>
  )
}

export default injectIntl(SignupForm);