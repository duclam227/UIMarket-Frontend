import Container from 'react-bootstrap/Container';
import { PageWithNavbar } from '../../components';

const NotFound = () => {
  return (
    <PageWithNavbar>
      <div>
        <Container>
          <h1>404 Not Found 😢</h1>
        </Container>
      </div>
    </PageWithNavbar>
  );
};

export default NotFound;
