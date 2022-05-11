import Container from 'react-bootstrap/Container';
import { PageWithNavbar } from '../../components';

const NotFound = () => {
  return (
    <PageWithNavbar>
      <div>
        <Container className="vh-100 d-flex justify-content-center align-items-center">
          <h1>404 Not Found 😢</h1>
        </Container>
      </div>
    </PageWithNavbar>
  );
};

export default NotFound;
