import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { getJwt } from '../../../app/util/authHelpers';

const RequireUser = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const currentUser = useSelector((state: State) => state.auth.user);
  const jwt = getJwt();

  if (!currentUser && !jwt) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireUser;
