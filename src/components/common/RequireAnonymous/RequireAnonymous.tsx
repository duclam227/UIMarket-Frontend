import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';

const RequireAnonymous = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: State) => state.auth.user);
  if (currentUser) {
    navigate('/', { replace: true });
  }
  return children;
};

export default RequireAnonymous;
