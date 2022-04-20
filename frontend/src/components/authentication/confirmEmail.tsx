import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContainer } from './authComponents';
import {
  Content,
  Form,
  Input,
  Header,
  Label,
  StyledBack,
} from '../styledComponents';

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

const sendConfirmationcode = async (user: string) => {
  try {
    await Auth.resendSignUp(user);
    console.log('code sent successfully!');
  } catch (err) {
    console.log('error resending code: ', err);
  }
};

// eslint-disable-next-line max-len
export default function ConfirmEmailPage({
  user,
  setUser,
}: {
  user: string;
  setUser: (val: string) => void;
}) {
  // "required" attribute on input validates
  let codeAttempt = '';
  const navigate = useNavigate();

  // send code to specified email
  useEffect(() => {
    console.log('loaded confirm email page!');
    // check if the value is null, if so, set user to the empty string
    const email: string = user !== null ? user : '';
    sendConfirmationcode(email);
  }, []);

  const confirmSignUp = async (userEmail: string, code: string) => {
    try {
      await Auth.confirmSignUp(userEmail, code);
      console.log('user confirmed!');
      setUser(user);
      navigate('/login');
    } catch (error) {
      console.log('error confirming sign up', error);
      // display invalid code error
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    codeAttempt = e.target.value;
  };

  return (
    <AuthContainer>
      <Link to="/create-account">
        <StyledBack size="30" />
      </Link>
      <Content>
        <Header>Authenticate your account</Header>
        <Label>
          Please confirm your account by entering the confirmation code sent to{' '}
          {user}
        </Label>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            confirmSignUp(user, codeAttempt);
          }}
        >
          <Input
            type="text"
            id="f1"
            onChange={(e) => onChange(e)}
            placeholder="Enter code sent to email"
            required
          />
          <Button type="submit" bc="#5F8F3E" c="#ffffff" wid="100%">
            {' '}
            Confirm{' '}
          </Button>
        </Form>
      </Content>
    </AuthContainer>
  );
}
