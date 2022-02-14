import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  StyledBack,
  AuthHeader,
  AuthContainer,
  AuthContent,
  Input,
  Form,
  Label,
  Submit,
  ErrorMsg,
} from './authComponents';

export default function ResetPassword() {
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [badPassMsg, setBatpassMsg] = useState('');

  const validatePass = () => {
    if (pass1 !== pass2) {
      setBatpassMsg('Passwords must match');
    } else if (pass1.length < 8) {
      // must add valifation for other requirements
      // or can catch the error because cognito also checks
      setBatpassMsg(
        'Passwords must be at least 8 characters, contain 1 number, 1 uppercase letter, and 1 lowercase letter'
      );
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
    <AuthContainer>
      <Link to="/forgot-password">
        <StyledBack size="30" />
      </Link>
      <AuthContent>
        <AuthHeader>Reset Password</AuthHeader>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Label htmlFor="np1">
            New password
            <Input
              type="password"
              id="np1"
              onChange={(e) => setPass1(e.target.value)}
            />
          </Label>
          <Label htmlFor="np2">
            Re-enter new password
            <Input
              type="password"
              id="np2"
              onChange={(e) => setPass2(e.target.value)}
              onBlur={validatePass}
            />
          </Label>
          <ErrorMsg>{badPassMsg}</ErrorMsg>
          <Submit
            type="submit"
            onClick={validatePass}
            onSubmit={finalValidation}
            value="Confirm"
          />
        </Form>
      </AuthContent>
    </AuthContainer>
  );
}
