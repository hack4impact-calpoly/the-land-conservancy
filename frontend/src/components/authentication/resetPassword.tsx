import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import StyledBack from '../styledComponents';

const StyledDiv = styled.div`
  padding: 40px;
`;

const StyledContainer = styled(Container)`
  text-align: left;
  background: #fffdfd;
  border-radius: 7px;
  border: 1px solid #c4c4c4;
  font-family: Poppins;
  margin: 5px;
  padding: 20px;
`;

const StyledHeader = styled.p`
  color: black;
  font-size: 20px;
  font-weight: 500;
`;

const StyledForm = styled.form`
  flex-direction: column;
`;

const Styledlabel = styled.label`
  display: block;
  font-family: Poppins;
  font-size: 13px;
  font-color: #5b5a5a;
  font-weight: 600;
`;

const StyledInput = styled.input`
  display: block;
  border: 1px solid #c4c4c4;
  border-radius: 6px;
  height: 33px;
  padding-left: 6px;

  font-family: Poppins;
  font-size: 20px;
  text-align: left;

  margin-top: 11px;
  margin-bottom: 22px;

  width: 98%;
`;

const StyledSubmit = styled.input`
  background: #5f8f3e;
  color: white;

  font-family: Poppins;
  font-size: 20px;
  text-align: center;

  border-radius: 6px;
  border-color: #5f8f3e;
  border-style: solid;

  margin-top: 6px;
  margin-bottom: 10px;
  width: 100%;
  height: 36px;
  align-self: center;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 10px;
  font-style: normal;
  text-align: left;
  margin-top: -20px;
`;

export default function ResetPassword() {
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [badPassMsg, setBatpassMsg] = useState('');

  const validatePass = () => {
    if (pass1 !== pass2) {
      setBatpassMsg('Passwords must match');
    } else if (pass1.length < 6) {
      setBatpassMsg('Passwords must be at least 6 characters');
    } else {
      setBatpassMsg('');
    }
  };

  const finalValidation = () => {
    // no actual functionality here yet since no backend
    validatePass();
    if (badPassMsg !== '') {
      console.log('pass NOT changed');
    } else {
      console.log('pass changed');
    }
  };

  return (
    <div>
      <StyledContainer maxWidth="sm">
        <Link to="/forgot-password">
          <StyledBack size="30" />
        </Link>
        <StyledDiv>
          <StyledHeader>Reset Password</StyledHeader>
          <StyledForm onSubmit={(e) => e.preventDefault()}>
            <Styledlabel htmlFor="np1">
              New password
              <StyledInput
                type="password"
                id="np1"
                onChange={(e) => setPass1(e.target.value)}
              />
            </Styledlabel>
            <Styledlabel htmlFor="np2">
              Re-enter new password
              <StyledInput
                type="password"
                id="np2"
                onChange={(e) => setPass2(e.target.value)}
                onBlur={validatePass}
              />
            </Styledlabel>
            <ErrorMsg>{badPassMsg}</ErrorMsg>
            <StyledSubmit
              type="submit"
              onClick={validatePass}
              onSubmit={finalValidation}
              value="Confirm"
            />
          </StyledForm>
        </StyledDiv>
      </StyledContainer>
    </div>
  );
}
