import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { getJwt } from '../../../app/util/authHelpers';
import { useEffect, useState } from 'react';

const RequireAnonymous = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: State) => state.auth.user);
  const jwt = getJwt();

  useEffect(() => {
    if (currentUser || jwt) {
      navigate('/', { replace: true });
    }
  }, [currentUser])

  return children;
};

export default RequireAnonymous;
