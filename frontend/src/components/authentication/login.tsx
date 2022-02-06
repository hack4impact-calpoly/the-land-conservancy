import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../imgs/logo.png';

const StyledFake = styled.p`
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

const Form = styled.form`
  input[type='button'],
  input[type='submit'],
  input[type='reset'] {
    width: 149.61px;
    height: 46.95px;

    background: #000;
    border-radius: 12px;
    cursor: pointer;
  }
  input[type='text'],
  input[type='password'],
  input[type='email'] {
    width: 347px;
    height: 47px;

    border: 1px solid #8f8f8f;
    box-sizing: border-box;
    border-radius: 15px;
  }
`;

const Button = styled.button.attrs(
  (props: { c: string; wid: string; bc: string }) => props
)`
  width: ${(props) => props.wid};
  height: 47px;

  border: 2px solid #5f8f3e;
  box-sizing: border-box;
  border-radius: 12px;

  cursor: pointer;
  background: ${({ bc }) => bc};

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  text-align: center;

  color: ${(props) => props.c};
`;

const Flex = styled.div.attrs((props: { ai: string; dir: string }) => props)`
  display: flex;
  align-items: ${({ ai }) => ai};
  justify-content: space-between;
  flex-direction: ${({ dir }) => dir};
`;

const FlexContainer = styled.div.attrs(
  (props: { mb: string; pad: string; ta: string }) => props
)`
  flex: 100%;
  width: 347px;
  margin-bottom: ${({ mb }) => mb || '10px'};
  padding: ${({ pad }) => pad || '0px'};
  text-align: ${({ ta }) => ta};
`;

const StyledImage = styled.img`
  height: auto;
  width: auto;
  max-width: 173px;
  max-height: 173px;
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
    <Flex dir="column" ai="center">
      <FlexContainer pad="40px">
        <StyledImage src={logo} alt="The Land Conservancy of SLO logo" />
      </FlexContainer>
      <FlexContainer mb="-20px">
        <Form>
          <Flex dir="column" ai="center">
            <FlexContainer>
              <input
                type="email"
                placeholder="Email/Phone Number"
                name="uname"
                onChange={(e) => setUsername(e.target.value)}
                onBlur={validateUsername}
                required
              />
            </FlexContainer>
            <FlexContainer>
              <input
                type="password"
                placeholder="Password"
                name="passwd"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                required
              />
            </FlexContainer>
            <FlexContainer>
              <Flex dir="row">
                <Button wid="176.67px" c="#5F8F3E">
                  {' '}
                  Create Account{' '}
                </Button>
                <Button
                  type="submit"
                  wid="149.61px"
                  bc="#5F8F3E"
                  c="#ffffff"
                  onClick={retrieveUser}
                >
                  {' '}
                  Sign in{' '}
                </Button>
              </Flex>
            </FlexContainer>
          </Flex>
        </Form>
      </FlexContainer>
      <FlexContainer>
        <StyledFake> Forgot password? </StyledFake>
      </FlexContainer>
    </Flex>
  );
}
