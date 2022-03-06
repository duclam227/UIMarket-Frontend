import { FC } from "react";
import { Button, Container, Form } from "react-bootstrap";

import style from './LoginForm.module.css';

const LoginForm: FC = () => {
  return (
    <>
      <Container className={style.loginFormContainer}>
        <h2 className={style.title}>Sign in</h2>
        <Button>Continue with Google</Button>
        <hr />
        <Form></Form>
      </Container>
    </>
  )
}

export default LoginForm;