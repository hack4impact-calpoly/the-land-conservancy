import { Auth } from 'aws-amplify';
import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

export type ProtectedRouteProps = {
  children: JSX.Element;
  authorization: boolean;
  setAuthorization: (cond: boolean) => void;
};

function ProtectedRoute({
  children,
  authorization,
  setAuthorization,
}: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  let auth = authorization;

  const redirectToLogin = () => {
    navigate('/login');
  };

  const isAuthenticated = () => {
    Auth.currentAuthenticatedUser()
      .then((response: { isValid: () => unknown }) => {
        console.log(response);
        if (response) {
          setAuthorization(true);
          auth = true;
          console.log('in the authorization loop');
          console.log(response);
          console.log('after');
          console.log(authorization);
        } else {
          console.log('nope');
          redirectToLogin();
        }
      })
      .catch(() => {
        redirectToLogin();
      });
  };

  useEffect(() => {
    console.log('auth changed: ', authorization);
    isAuthenticated();
  }, [authorization]);

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    console.log('in auth statement');
    console.log(auth);
    return <Navigate to="/login" state={{ from: location }} />;
  }
  console.log('auth = ', auth);

  return children;
}

export default ProtectedRoute;
