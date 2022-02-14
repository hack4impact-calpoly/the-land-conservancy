import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  StyledBack,
  AuthHeader,
  AuthContainer,
  AuthContent,
  Form,
  Input,
  Label,
  Submit,
  ErrorMsg,
} from './authComponents';

const StyledParagraph = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;
  color: #000d26;
`;

const StyledSentMsg = styled.h4`
  display: block;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: black;
`;

export default function ForgotPassword() {
  const [email, setEmail] = React.useState(' ');
  const [valid, setValidation] = React.useState(' ');
  const [sent, setSent] = React.useState(' ');

  /* checks if email has the @ symbol and a period */
  const validateEmail = () => {
    if (email.includes('@') && email.includes('.')) {
      console.log('Is valid');
      setValidation('');
    } else {
      console.log('Is not valid');
      setValidation('Please enter a valid email.');
    }
  };

  /* if the email is valid then after pressing send it will display message */
  const sendEmail = () => {
    validateEmail();
    if (valid === '') {
      setSent(
        'Email has been sent. Please check your email for your reset link.'
      );
    } else {
      setSent('');
    }
  };

  return (
    <AuthContainer>
      <Link to="/login">
        <StyledBack size="30" />
      </Link>
      <AuthContent>
        <AuthHeader>Forgot Password</AuthHeader>
        <StyledParagraph>
          {' '}
          Please enter the email associated with your account to recieve a reset
          link.{' '}
        </StyledParagraph>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Label htmlFor="email">
            Email
            <Input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
          </Label>
          <ErrorMsg>{valid}</ErrorMsg>
          <Submit type="submit" onClick={sendEmail} value="Send" />{' '}
          {/* Doesn't actually do anything since it is just frontend for now */}
          <StyledSentMsg>{sent}</StyledSentMsg>
        </Form>
      </AuthContent>
    </AuthContainer>
  );
}
