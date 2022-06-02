import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { PageWithNavbar } from '../../components';

const BadRequestPage = () => {
  return (
    <PageWithNavbar>
      <Container className="my-5 p-5">
        <Row className="mt-3 text-center">
          <h1>400 Bad Request ❗</h1>
        </Row>
      </Container>
    </PageWithNavbar>
  );
};

export default BadRequestPage;
