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
		</Container>
	  </PageWithNavbar>
	);
	
};

export default Contact;
