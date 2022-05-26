import Container from 'react-bootstrap/Container';
import { PageWithNavbar } from '../../components';

const NotFound = () => {
  return (
    <PageWithNavbar>
      <Container className="my-5 py-5 d-flex justify-content-center">
        <h1>404 Not Found ❗</h1>
      </Container>
    </PageWithNavbar>
  );
};

export default NotFound;
