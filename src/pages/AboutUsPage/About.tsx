import Container from 'react-bootstrap/Container';
import PageWithNavbar from '../../components/common/PageWithNavbar/PageWithNavbar';
import { FormattedMessage } from 'react-intl';
import Kim from './imgs/Kim.jpg';
import Duc from './imgs/Duc.jpg';
import Khoa from './imgs/Khoa.jpg';
import Tan from './imgs/Tan.jpg';
import Lam from './imgs/Lam.jpg';
import Person from './Person';
import styles from './AboutPage.module.css';
const About = () => {
  return (
    <PageWithNavbar>
      <Container className="my-5">
        <h1>
          <FormattedMessage id="AboutPage.Title" defaultMessage={'About Us'} />
        </h1>
        <h5 className={'text-secondary my-4 ' + styles.description}>
          <FormattedMessage
            id="AboutPage.Description"
            values={{
              br: () => <br />,
            }}
          />
        </h5>
        <div className={`${styles.row} + d-flex justify-content-center my-5`}>
          <Person name="Kim" image={Kim} title="Front-end Developer"></Person>
          <Person name="Đức" image={Duc} title="Front-end Developer"></Person>
          <Person name="Khoa" image={Khoa} title="Front-end Developer"></Person>
        </div>
        <div className={`${styles.row} + d-flex justify-content-center my-5`}>
          <Person name="Lâm" image={Lam} title="Back-end Developer"></Person>
          <Person name="Tân" image={Tan} title="Back-end Developer"></Person>
        </div>
      </Container>
    </PageWithNavbar>
  );
};

export default About;
