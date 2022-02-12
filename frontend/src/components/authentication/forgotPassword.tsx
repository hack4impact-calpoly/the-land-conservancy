import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import StyledBack from '../styledComponents';

const StyledContainer = styled(Container)`
  text-align: left;
  border radius: 7px;

  margin: 5px;
  padding: 10px;
`;



const StyledHeader = styled.h1`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
`;

const StyledParagraph = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 27px;
  color: #000d26;
`;

const StyledHeader3 = styled.h3`
  display: block;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 19px;
  color: #5b5a5a;
`;
const StyledHeader4 = styled.h4`
  display: block;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 19px;
  color: red;
`;
const StyledSentMsg = styled.h4`
  display: block;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
  color: black;
`;

const StyledInput = styled.input`
  display: block;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 6px;
  width: 100%;
  height: 33px;
  padding-left: 6px;

  font-family: Poppins;
  text-align: left;

  margin-top: 11px;
  margin-bottom: 22px;

  @media (max-width: 600px) {
    width: 500px;
  }

  @media (max-width: 599px) {
    width: 90vw;
  }
`;

const StyledButton = styled.button`
  color: white;
  display: block;
  background: #5f8f3e;
  border-radius: 6px;

  width: 100%;
  height: 33px;
  padding-left: 6px;

  font-family: Poppins;
  text-align: center;
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
    <div>
      <StyledContainer>
        <a href="/login">
          {' '}
          <StyledBack size="30" />
        </a>
        <StyledHeader>Forgot Password</StyledHeader>
        <StyledParagraph>
          {' '}
          Please enter the email associated with your account to recieve a reset
          link.{' '}
        </StyledParagraph>
        <StyledHeader3> Email </StyledHeader3>
        <form onSubmit={(e) => e.preventDefault()}>
          <StyledInput
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          <StyledHeader4>{valid}</StyledHeader4>
          <StyledButton onClick={sendEmail}>Send</StyledButton>{' '}
          {/* Doesn't actually do anything since it is just frontend for now */}
          <StyledSentMsg>{sent}</StyledSentMsg>
        </form>
      </StyledContainer>
    </div>
  );
}
