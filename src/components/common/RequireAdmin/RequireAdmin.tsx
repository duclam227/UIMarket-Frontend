import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { getJwt } from '../../../app/util/authHelpers';

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const currentUser = useSelector((state: State) => state.auth.user);
  const jwt = getJwt();

  if (!currentUser && !jwt) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const payload = parseJwt(jwt!);

  if(!payload.isAdmin) {
    return <Navigate to="/" state={{from: location}} />;
  }
  return children;
};

function parseJwt (token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
export default RequireAdmin;
