import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../imgs/logo.png';
import { AuthContainer, AuthContent, Form, Input } from './authComponents';

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
  const [validUsername, setValidUsername] = useState('');

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState('');

  const validateUsername = () => {
    if (username.length > 0) {
      console.log('Is valid');
      setValidUsername('');
    } else {
      console.log('Is not valid');
      setValidUsername('Please enter a username.');
    }
  };

  const validatePassword = () => {
    if (password.length > 0) {
      console.log('Password is valid');
      setValidPassword('');
    } else {
      console.log('Password is not valid');
      setValidPassword('Please enter a password.');
    }
  };

  const retrieveUser = () => {
    if (validUsername === '' && validPassword === '') {
      console.log(username);
      console.log(password);
    }
  };

  return (
    <AuthContainer>
      <Flex dir="column" ai="center">
        <StyledImage src={logo} alt="The Land Conservancy of SLO logo" />
      </Flex>
      <AuthContent>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="email"
            id="f1"
            onChange={(e) => setUsername(e.target.value)}
            onBlur={validateUsername}
            placeholder="email"
            required
          />
          <Input
            type="password"
            id="f2"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
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
            <Button
              type="submit"
              bc="#5F8F3E"
              c="#ffffff"
              wid="45%"
              onClick={retrieveUser}
            >
              {' '}
              Sign in{' '}
            </Button>
          </Flex>
        </Form>
        <FLink to="/forgot-password">
          <StyledForgot> Forgot password? </StyledForgot>
        </FLink>
      </AuthContent>
    </AuthContainer>
  );
}
