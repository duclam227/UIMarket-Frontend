import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';

const RequireUser = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const currentUser = useSelector((state: State) => state.auth.user);
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireUser;
