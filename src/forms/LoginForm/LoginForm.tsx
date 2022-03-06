import { FC } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import style from './LoginForm.module.css';

const LoginForm: FC = () => {

  const title = <FormattedMessage id="LoginForm.title" defaultMessage="Sign in" />

  return (
    <>
      <Container className={style.loginFormContainer}>
        <h2 className={style.title}>{title}</h2>
        <Button>Continue with Google</Button>
        <hr />
        <Form></Form>
      </Container>
    </>
  )
}

export default LoginForm;