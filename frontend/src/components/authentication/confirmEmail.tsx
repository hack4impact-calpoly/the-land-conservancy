import React, { useState, useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContainer } from './authComponents';
import {
  Content,
  Form,
  Input,
  Header,
  Label,
  StyledBack,
  Submit,
} from '../styledComponents';
import UserContext from '../../userContext';

const Feedback = styled.div`
  font-size: 1.15rem;
  color: #2b7800;
  font-weight: bold;
`;

export default function ConfirmEmailPage() {
  const [feedback, setFeedback] = useState('');
  const { currentUser } = useContext(UserContext);
  // "required" attribute on input validates
  let codeAttempt = '';
  const navigate = useNavigate();

  // send code to specified email
  useEffect(() => {
    console.log('loaded confirm email page!');
    // check if the value is null, if so, set user to the empty string
    // const email: string = user !== null ? user : '';
    // sendConfirmationcode(email);
  }, []);

  const confirmSignUp = async (userEmail: string, code: string) => {
    try {
      setFeedback('');
      await Auth.confirmSignUp(userEmail, code);
      console.log('user confirmed!');
      navigate('/login');
    } catch (error) {
      console.log('error confirming sign up', error);
      // display invalid code error
      window.alert((error as Error).message);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    codeAttempt = e.target.value;
  };

  const sendConfirmationcode = async () => {
    try {
      setFeedback('');
      await Auth.resendSignUp(currentUser.email);
      console.log('code sent successfully!');
      setFeedback(`code resent to ${currentUser.email}`);
    } catch (err) {
      console.log('error resending code: ', err);
      setFeedback(`${(err as Error).message}`);
    }
  };

  return (
    <AuthContainer>
      <Link to="/login">
        <StyledBack size="30" />
      </Link>
      <Content>
        <Header>Authenticate your account</Header>
        <Label>
          Please confirm your account by entering the confirmation code sent to{' '}
          {currentUser.email}
        </Label>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            confirmSignUp(currentUser.email, codeAttempt);
          }}
        >
          <Input
            type="text"
            id="f1"
            onChange={(e) => onChange(e)}
            placeholder="Enter code sent to email"
            required
          />
          <Submit type="submit" value="Confirm" />
          <br />
          <Submit
            onClick={sendConfirmationcode}
            type="button"
            value="Resend confirmation code"
          />
          <Feedback>{feedback}</Feedback>
        </Form>
      </Content>
    </AuthContainer>
  );
}
