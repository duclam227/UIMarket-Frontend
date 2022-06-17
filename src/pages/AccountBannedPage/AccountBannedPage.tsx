import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BsChevronLeft } from 'react-icons/bs';

import FlatCross from '../../app/assets/FlatCross.svg';
import { AuthenticationLayout } from '../../components';
import { FormattedMessage } from 'react-intl';

const AccountBannedPage = () => {
  const pageTitle = <FormattedMessage id="AccountBannedPage.pageTitle" />;
  const accountBannedMessage = (
    <FormattedMessage id="AccountBannedPage.accountBannedMessage" />
  );
  const contactUsMessage = <FormattedMessage id="AccountBannedPage.contactUsMessage" />;
  const backSignInNavLabel = (
    <FormattedMessage id="RecoverPasswordForm.backSignInNavLabel" />
  );
  return (
    <AuthenticationLayout>
      <Container className={`pt-5`}>
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
            <h2>{pageTitle}</h2>
          </Row>
          <Row className={'flex-column justify-content-center align-items-center'}>
            <img src={FlatCross} alt="Check email" height={200}></img>
            <span className="text-center mt-3">{accountBannedMessage}</span>
            <span className="text-center">{contactUsMessage}</span>
          </Row>
        </Col>
      </Container>
    </AuthenticationLayout>
  );
};

export default AccountBannedPage;
