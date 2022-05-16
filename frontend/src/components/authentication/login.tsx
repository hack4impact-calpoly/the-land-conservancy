import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../imgs/logo.png';
import { AuthContainer } from './authComponents';
import { Content, Form, Input } from '../styledComponents';
import landscape from '../../imgs/tlc_background.jpeg';
import UserContext from '../../userContext';
import { User } from '../../types';

const PORT = process.env.REACT_APP_API_URL;

const Background = styled.div`
  background-image: url(${landscape});
  background-size: cover;
`;

const StyledForgot = styled.p`
  height: 15px;

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  cursor: pointer;

  text-align: right;

  color: #011338;
`;

const Button = styled.button.attrs(
  (props: { c: string; wid: string; bc: string }) => props
)`
  height: 47px;

  border: 2px solid #5f8f3e;
  box-sizing: border-box;
  border-radius: 12px;

  cursor: pointer;
  background: ${({ bc }) => bc};

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  text-align: center;

  width: 100%;
  @media only screen and (min-width: 300px) {
    width: ${({ wid }) => wid};
  }

  color: ${(props) => props.c};
`;

const Flex = styled.div.attrs((props: { ai: string; dir: string }) => props)`
  display: flex;
  align-items: ${({ ai }) => ai};
  justify-content: space-between;
  flex-direction: ${({ dir }) => dir};
`;

const StyledImage = styled.img`
  height: auto;
  width: auto;
  max-width: 173px;
  max-height: 173px;
`;

const CLink = styled(Link)`
  width: 45%;
`;

const FLink = styled(Link)`
  text-decoration: none;
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // "required" attribute on input validates

  // only runs when form not disabled (requirements met)
  const retrieveUser = () => {
    console.log(username);
  };

  const sendConfirmationcode = async (userEmail: string) => {
    try {
      await Auth.resendSignUp(userEmail);
      console.log('code sent successfully!');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  };

  // fetches Mongo user who signed in
  const getMongoUser = async (id: string) => {
    try {
      fetch(`${PORT}/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log('error getting user from mongodb', error);
    }
  };

  // authenticate sign in
  const signIn = async () => {
    try {
      // first get cognitoUser
      const user = await Auth.signIn(username, password);
      setUser(user.attributes.sub);
      // note: the user id is stored in the username when
      // user is not yet confirmed;
      // when user is confirmed, email is stored in username
      // and user id is in user.attributes.sub

      // then get mongoUser from userSub
      await getMongoUser(user.attributes.sub);
      if (user) {
        console.log(`Successful sign in for user: ${username}`);
        navigate('/');
      }
    } catch (error) {
      console.log('error signing in', error);
      if ((error as Error).name === 'UserNotConfirmedException') {
        setUser({ email: `${username}` } as User);
        sendConfirmationcode(username).then(() => {
          navigate('/confirm-email');
        });
      } else {
        window.alert((error as Error).message);
      }
    }
  };

  return (
    <Background>
      <AuthContainer>
        <Flex dir="column" ai="center">
          <StyledImage src={logo} alt="The Land Conservancy of SLO logo" />
        </Flex>
        <Content>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              retrieveUser();
              signIn().then(() => navigate('/'));
            }}
          >
            <Input
              type="email"
              id="f1"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="email"
              required
            />
            <Input
              type="password"
              id="f2"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />

            <Flex dir="row">
              <CLink to="/create-account">
                <Button type="button" c="#5F8F3E" wid="100%">
                  {' '}
                  Create Account{' '}
                </Button>
              </CLink>
              <Button type="submit" bc="#5F8F3E" c="#ffffff" wid="45%">
                {' '}
                Sign in{' '}
              </Button>
            </Flex>
          </Form>
          <FLink to="/forgot-password">
            <StyledForgot> Forgot password? </StyledForgot>
          </FLink>
        </Content>
      </AuthContainer>
    </Background>
  );
}
