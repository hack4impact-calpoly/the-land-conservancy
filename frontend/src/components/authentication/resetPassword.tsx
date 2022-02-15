import React, { useState, useEffect, useRef } from 'react';
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
  const [badPassMsg, setBadpassMsg] = useState('');
  const [disabled, setDisabled] = useState(true);
  const firstRender = useRef(true);

  const validatePass = () => {
    if (pass1.length < 8) {
      // TODO: add validation for other requirements (see msg below)
      setBadpassMsg(
        'Passwords must be at least 8 characters, contain 1 number, 1 uppercase letter, and 1 lowercase letter'
      );
      return false;
    }
    if (pass1 !== pass2) {
      setBadpassMsg('Passwords must match');
      return false;
    }
    setBadpassMsg('');
    return true;
  };

  // only called when form is not disabled
  const changePassword = () => {
    // no actual functionality here yet since no backend
    console.log('pass changed');
  };

  useEffect(() => {
    // we want to skip validation on first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setDisabled(!validatePass());
  }, [pass1, pass2]);

  return (
    <AuthContainer>
      <Link to="/forgot-password">
        <StyledBack size="30" />
      </Link>
      <AuthContent>
        <AuthHeader>Reset Password</AuthHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            changePassword();
          }}
        >
          <Label htmlFor="np1">New password</Label>
          <Input
            type="password"
            id="np1"
            onChange={(e) => setPass1(e.target.value)}
          />
          <Label htmlFor="np2">Re-enter new password</Label>
          <Input
            type="password"
            id="np2"
            onChange={(e) => setPass2(e.target.value)}
          />
          <ErrorMsg>{badPassMsg}</ErrorMsg>
          <Submit type="submit" value="Confirm" disabled={disabled} />
        </Form>
      </AuthContent>
    </AuthContainer>
  );
}
