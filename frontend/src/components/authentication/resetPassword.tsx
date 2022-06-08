import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthContainer, ErrorMsg } from './authComponents';
import {
  Content,
  Header,
  Form,
  Input,
  Label,
  Submit,
  StyledBack,
} from '../styledComponents';

export default function ResetPassword() {
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [code, setCode] = useState('');
  const [badPassMsg, setBadpassMsg] = useState('');
  const [disabled, setDisabled] = useState(true);
  const firstRender = useRef(true);

  const navigate = useNavigate();

  const validatePass = () => {
    const hasNum = (str: string) => /\d/.test(str);
    const hasLower = (str: string) => /[a-z]/.test(str);
    const hasUpper = (str: string) => /[A-Z]/.test(str);
    if (
      !(
        pass1.length >= 8 &&
        hasNum(pass1) &&
        hasLower(pass1) &&
        hasUpper(pass1)
      )
    ) {
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
    if (validatePass()) {
      Auth.forgotPasswordSubmit(currentUser, code, pass1)
        .then(() => {
          alert('Password successfully reset!');
          navigate('/login');
        })
        .catch((err) => {
          console.log(err);
          alert(
            'Could not change password, please confirm email and code are correct. New Password must be different than old password.'
          );
        });
    }
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
      <Content>
        <Header>Reset Password (Code sent to email)</Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            changePassword();
          }}
        >
          <Label htmlFor="user">Username (email)</Label>
          <Input
            type="email"
            id="email"
            onChange={(e) => setCurrentUser(e.target.value)}
          />
          <Label htmlFor="code">Confirmation Code</Label>
          <Input
            type="code"
            id="code"
            onChange={(e) => setCode(e.target.value)}
          />
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
      </Content>
    </AuthContainer>
  );
}
