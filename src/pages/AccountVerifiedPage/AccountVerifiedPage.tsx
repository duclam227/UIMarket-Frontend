import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { BsChevronLeft } from 'react-icons/bs';

import GreenCheckmark from '../../app/assets/GreenCheckmark.svg';
import FlatCross from '../../app/assets/FlatCross.svg';
import authAPI from '../../api/auth';
import { AuthenticationLayout } from '../../components';
import { FormattedMessage } from 'react-intl';
// Check whether sent account has been verified or not
const AccountVerifiedPage = () => {
  const backSignInNavLabel = (
    <FormattedMessage
      id="RecoverPasswordForm.backSignInNavLabel"
      defaultMessage="Back to Sign In"
    />
  );
  //Success
  const verifedTitle = (
    <FormattedMessage id="AccountVerifiedPage.verifedTitle" />
  );
  const welcomeMessage = (
    <FormattedMessage id="AccountVerifiedPage.welcomeMessage" />
  );
  const redirectMessage = (
    <FormattedMessage id="AccountVerifiedPage.redirectMessage" />
  );

  //Failed
  const failedTitle = <FormattedMessage id="AccountVerifiedPage.failedTitle" />;
  const failedMessage = (
    <FormattedMessage id="AccountVerifiedPage.failedMessage" />
  );
  const instructionMessage = (
    <FormattedMessage id="AccountVerifiedPage.instructionMessage" />
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('userId');
  const verifyCode = searchParams.get('verifyCode');

  const [redirectCountdown, setRedirectCountdown] = useState(20);

  const [isVerifying, setIsVerifying] = useState(true);
  const [accountVerified, setAccountVerified] = useState(false);
  //Countdown ticking down logic
  useEffect(() => {
    if (accountVerified === true) {
      if (redirectCountdown > 0) setTimeout(tick, 1000);
      if (redirectCountdown <= 0) navigate('/login', { replace: true });
    }
  }, [redirectCountdown]);
  const tick = () => {
    setRedirectCountdown(redirectCountdown - 1);
  };

  useEffect(() => {
    if (!userId || !verifyCode) {
      setIsVerifying(false);
      setAccountVerified(false);
      return;
    }

    const verifyEmailCode = async () => {
      try {
        setIsVerifying(true);
        await authAPI.verifyEmailCode(userId, verifyCode);
        setIsVerifying(false);
        setAccountVerified(true);
        setRedirectCountdown(10);
      } catch (e) {
        setIsVerifying(false);
        setAccountVerified(false);
      }
    };
    verifyEmailCode();
  }, []);

  return (
    <AuthenticationLayout>
      <Container className={`pt-5`}>
        {isVerifying ? (
          <Col sm={{ span: 1, offset: 6 }}>
            <Spinner animation="border" />
          </Col>
        ) : accountVerified ? (
          //Success
          <Col sm={{ span: 7, offset: 3 }}>
            <Row className="mt-5">
              <h2>{verifedTitle}</h2>
            </Row>
            <Row
              className={
                'flex-column justify-content-center align-items-center'
              }
            >
              <img
                src={GreenCheckmark}
                className={`mt-4`}
                alt="Check mark"
                height={200}
              ></img>
              <span className="text-center mt-3 fw-bold">{welcomeMessage}</span>
              <span className={`text-center mt-3`}>
                {redirectMessage} {redirectCountdown}.
              </span>
            </Row>
          </Col>
        ) : (
          //Failed
          <Col sm={{ span: 7, offset: 3 }}>
            <Row className="mt-5">
              <Link
                to="/login"
                className="d-flex align-items-center"
                style={{ width: 'fit-content' }}
              >
                <div className="d-flex align-items-center justify-content center me-2">
                  <BsChevronLeft />
                </div>
                <span>{backSignInNavLabel}</span>
              </Link>
            </Row>
            <Row className="mt-5">
              <h2>{failedTitle}</h2>
            </Row>
            <Row
              className={
                'flex-column justify-content-center align-items-center'
              }
            >
              <img
                src={FlatCross}
                className={`mt-4`}
                alt="Check mark"
                height={200}
              ></img>
              <span className="text-center mt-3 fw-bold">{failedMessage}</span>
              <span className="text-center">{instructionMessage}</span>
            </Row>
          </Col>
        )}
      </Container>
    </AuthenticationLayout>
  );
};

export default AccountVerifiedPage;
