import { useState, useEffect, FC } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { BsChevronLeft } from 'react-icons/bs';

import NoMessage from '../../app/assets/NoMessage.svg';
import authAPI from '../../api/auth';
import { AuthenticationLayout } from '../../components';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

const VerifyPromptPage = () => {
  const backSignInNavLabel = (
    <FormattedMessage
      id="RecoverPasswordForm.backSignInNavLabel"
      defaultMessage="Back to Sign In"
    />
  );
  //Page title
  const title = <FormattedMessage id="VerifyPromptPage.title" />;
  const verifyMessage = (
    <FormattedMessage id="VerifyPromptPage.verifyMessage" />
  );
  const sentEmailMessage = (
    <FormattedMessage id="VerifyPromptPage.sentEmailMessage" />
  );
  const checkSpamMessage = (
    <FormattedMessage id="VerifyPromptPage.checkSpamMessage" />
  );
  const resendBtnLabel = (
    <FormattedMessage id="AccountNotVerifiedPage.resendBtnLabel" />
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');
  const userId = searchParams.get('userId');

  const [resendCountdown, setResendCountdown] = useState(0);

  //Check if there's email in searchParams
  useEffect(() => {
    if (!email || !userId) navigate(-1);
    else setResendCountdown(60);
  }, []);

  //Countdown ticking down logic
  useEffect(() => {
    if (resendCountdown > 0) setTimeout(tick, 1000);
  }, [resendCountdown]);
  const tick = () => {
    setResendCountdown(resendCountdown - 1);
  };

  const resendVerifyEmail = async () => {
    if (!userId) return;
    setResendCountdown(60);
    try {
      await authAPI.resendVerifyEmail(userId);
    } catch (e) {
      console.log('Resend verify email failed: ', e);
    }
  };

  return (
    <AuthenticationLayout>
      <Container className={`pt-5 mb-5`}>
        <Col sm={{ span: 7, offset: 3 }}>
          {/* Navigate to Sign In */}
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

          {/* Title */}
          <Row className="mt-4">
            <h2>{title}</h2>
          </Row>
          <Row
            className={'flex-column justify-content-center align-items-center'}
          >
            <img src={NoMessage} alt="Check email" height={250}></img>
            <span className="text-center">{verifyMessage}</span>
            <span className="text-center">{sentEmailMessage}</span>
            <span className={`text-center fw-bold text-primary`}>
              {email || 'No email provided'}
            </span>
            <p className="text-center">{checkSpamMessage}</p>
            <span className={`text-center`}>
              <Button
                variant={!!resendCountdown ? 'secondary' : 'primary'}
                disabled={!!resendCountdown}
                onClick={resendVerifyEmail}
              >
                {resendBtnLabel}
                {!!resendCountdown ? ` - ${resendCountdown}s` : ''}
              </Button>
            </span>
          </Row>
        </Col>
      </Container>
    </AuthenticationLayout>
  );
};

export default VerifyPromptPage;
