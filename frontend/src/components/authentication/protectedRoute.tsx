import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export type ProtectedRouteProps = {
  children: JSX.Element;
  authorization: boolean;
  setAuthorization: (cond: boolean) => void;
  setUser: (val: string) => void;
};

function ProtectedRoute({
  children,
  setUser,
  authorization,
  setAuthorization,
}: ProtectedRouteProps) {
  const [pending, setPending] = useState(true);
  const [found, setFound] = useState({});
  const location = useLocation();
  let auth = authorization;

  // fetches Mongo user who signed in
  const getMongoUser = async (id: string) => {
    try {
      fetch(`http://localhost:3001/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          return data;
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log('error getting user from mongodb', error);
    }
    return undefined;
  };

  const isAuthenticated = () => {
    Auth.currentAuthenticatedUser()
      .then((response: { username: string }) => {
        return getMongoUser(response.username);
      })
      .then((response) => {
        console.log(response);
        if (response) {
          setAuthorization(true);

          setFound(response);
          auth = true;
          console.log('in the authorization loop');
          console.log(response);
          console.log('after');
          console.log(authorization);
        } else {
          setPending(false);
          console.log('nope');
          // redirectToLogin();
        }
      })
      .catch(() => {
        console.log('no user found');
        setPending(false);
        // redirectToLogin();
      });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  useEffect(() => {
    console.log(found === true);
    if (found !== undefined) {
      setPending(false);
    }
  }, [found]);

  if (pending) {
    return <div>Loading...</div>;
  }
  console.log('auth: ', authorization);
  if (!found) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    console.log('in auth statement');
    console.log(auth);
    return <Navigate to="/login" state={{ from: location }} />;
  }
  console.log('auth = ', authorization);

  return children;
}

export default ProtectedRoute;
