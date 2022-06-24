import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { BsChevronLeft } from 'react-icons/bs';

import errorImg from '../../app/assets/error-general.png';
import { AuthenticationLayout, EmptyState } from '../../components';
import { FormattedMessage } from 'react-intl';
import styles from './AccountBannedPage.module.css';
import PageWithNavbar from '../../components/common/PageWithNavbar/PageWithNavbar';

const AccountBannedPage = () => {
  const pageTitle = <FormattedMessage id="AccountBannedPage.pageTitle" />;
  const contactUsMessage = <FormattedMessage id="AccountBannedPage.contactUsMessage" />;
  const backSignInNavLabel = (
    <FormattedMessage id="RecoverPasswordForm.backSignInNavLabel" />
  );
  return (
    <PageWithNavbar>
      <Container>
        <div className={styles.formContainer}>
          <div className={'mt-4 ' + styles.title}>
            {/* Navigate to Sign In */}
            <Link to="/login" className="d-flex align-items-center">
              <div className="d-flex align-items-center justify-content center me-2">
                <BsChevronLeft />
              </div>
              <span>{backSignInNavLabel}</span>
            </Link>
            {/* Title */}
            <h2 className="mt-4 text-center">{pageTitle}</h2>
          </div>
          <EmptyState
            img={errorImg}
            messageId="AccountBannedPage.accountBannedMessage"
            btn={false}
          >
            <span className="text-center text-black">{contactUsMessage}</span>
          </EmptyState>
        </div>
      </Container>
    </PageWithNavbar>
  );
};

export default AccountBannedPage;
