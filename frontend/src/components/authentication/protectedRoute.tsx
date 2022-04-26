import { Auth } from 'aws-amplify';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../userContext';

export type ProtectedRouteProps = {
  children: JSX.Element;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { setUser } = useContext(UserContext);
  const [pending, setPending] = useState(true);
  const [found, setFound] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  // fetches Mongo user who signed in
  const getMongoUser = async (id: string) => {
    try {
      fetch(`http://localhost:3001/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setFound(data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log('error getting user from mongodb', error);
    }
  };

  const checkAuth = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      await getMongoUser(cognitoUser.username);
    } catch (err) {
      // error indicataes no user is logged in
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    console.log(found);
    if (found !== undefined) {
      setPending(false);
    }
  }, [found]);

  if (pending) {
    return <div>Loading...</div>;
  }
  if (!found) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    console.log('redirecting');
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
