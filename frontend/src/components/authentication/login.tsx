import React, { useState, useEffect, useRef } from 'react';
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
  const firstRender = useRef(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  // "required" attribute on input also validates more precisely
  const validateUsername = () => {
    if (username.includes('@') && username.includes('.')) {
      console.log('valid email');
      return true;
    }
    console.log('invalid email');
    return false;
  };

  const validatePassword = () => {
    if (password.length > 0) {
      console.log('valid Password');
      return true;
    }
    console.log('invalid Password');
    return false;
  };

  useEffect(() => {
    // we want to skip validation on first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDisabled(!(validateUsername() && validatePassword()));
  }, [username, password]);

  // only runs when form not disabled (requirements met)
  const retrieveUser = () => {
    console.log(username);
    console.log(password);
  };

  return (
    <AuthContainer>
      <Flex dir="column" ai="center">
        <StyledImage src={logo} alt="The Land Conservancy of SLO logo" />
      </Flex>
      <AuthContent>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            retrieveUser();
          }}
        >
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
              disabled={disabled}
              bc="#5F8F3E"
              c="#ffffff"
              wid="45%"
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
