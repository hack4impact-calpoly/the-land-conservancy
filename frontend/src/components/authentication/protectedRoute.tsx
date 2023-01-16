import { Auth } from "aws-amplify";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../userContext";

const PORT = process.env.REACT_APP_API_URL;

export type ProtectedRouteProps = {
  children: JSX.Element;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { setUser } = useContext(UserContext);
  const [pending, setPending] = useState(true);
  const [found, setFound] = useState();
  const navigate = useNavigate();

  // fetches Mongo user who signed in
  const getMongoUser = async (id: string) => {
    try {
      fetch(`${PORT}/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setFound(data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error getting user from mongodb", error);
    }
  };

  const checkAuth = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      await getMongoUser(cognitoUser.attributes.sub);
    } catch (err) {
      // error indicataes no user is logged in
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    // console.log(found);
    if (found !== undefined) {
      setPending(false);
    }
  }, [found]);

  if (pending) {
    return <div>Loading...</div>;
  }
  if (!found) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
