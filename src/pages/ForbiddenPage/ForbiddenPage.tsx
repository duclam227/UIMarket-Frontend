import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { PageWithNavbar } from '../../components';

import FlatCross from '../../app/assets/FlatCross.svg';
const ForbiddenPage = () => {
  return (
    <PageWithNavbar>
      <Container className="vh-100 p-5">
        <Row>
          <img src={FlatCross} height={250} alt="Forbidden" />
        </Row>
        <Row className="mt-3 text-center">
          <h1>403 Forbidden</h1>
        </Row>
      </Container>
    </PageWithNavbar>
  );
};

export default ForbiddenPage;
