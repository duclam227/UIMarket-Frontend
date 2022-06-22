import Container from 'react-bootstrap/Container';
import PageWithNavbar from '../../components/common/PageWithNavbar/PageWithNavbar';
import { FormattedMessage } from 'react-intl';

const Contact = () => {
  return (
    <PageWithNavbar>
      <Container className="my-5">
        <h1>
          <FormattedMessage id="ContactUs.Title" defaultMessage={'Contact Us'} />
        </h1>
        <h5 className={'text-secondary my-4 '}>
          <FormattedMessage
            id="ContactUs.Description"
            values={{
              br: () => <br />,
            }}
          />
        </h5>
        <div className="d-flex justify-content-center align-items-center">
          <iframe
            title="Feedback Form"
            src="https://docs.google.com/forms/d/e/1FAIpQLScbFatkHrHYra9vHUqnF7YQ2sf_zwIjBQQvF5jUX2p-LaWnqw/viewform?embedded=true"
            width="640"
            height="840"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
          >
            Loading…
          </iframe>
        </div>
      </Container>
    </PageWithNavbar>
  );
};

export default Contact;
