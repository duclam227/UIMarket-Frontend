import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';

const RequireAuthenticated = ({ children }: { children: JSX.Element }) => {
  const params = useParams();
  const currentUser = useSelector((state: State) => state.auth.user);
  if (currentUser && currentUser._id != params.id)
    return <Navigate to="/forbidden" replace />;
  return children;
};

export default RequireAuthenticated;
