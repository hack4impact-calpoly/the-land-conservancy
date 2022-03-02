import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

// TODO: change to containr later and text-aling left
// but that will probably go into styledComponenets as well

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [badMsg, setBadMsg] = useState('');
  const [disabled, setDisabled] = useState(true);

  // submit only calls when form meets requirements
  const createAccount = () => {
    const account = {
      Name: name,
      Email: email,
      Number: number,
      Password: pass1,
    };
    console.log(account);
    // print to console for now, call some backend/ cognito function later
  };

  const validateForm = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /[0-9]{10}/;

    if (email && !emailRegex.test(email)) {
      setBadMsg('Please enter a valid email address.');
      return false;
    }

    if (number && !(phoneRegex.test(number) && number.length === 10)) {
      setBadMsg('please enter the 10 digits of your phone number only');
      return false;
    }
    if (pass1 && pass1.length < 8) {
      // TODO: add validation for other requirements (see msg below)
      setBadMsg(
        'Passwords must be at least 8 characters, contain 1 number, 1 uppercase letter, and 1 lowercase letter'
      );
      return false;
    }
    if (pass1 && pass1 !== pass2) {
      setBadMsg('Passwords must match');
      return false;
    }

    setBadMsg('');
    return true;
  };

  useEffect(() => {
    setDisabled(!validateForm());
  }, [email, number, pass1, pass2]);

  return (
    <AuthContainer>
      <Link to="/login">
        <StyledBack size="30" />
      </Link>
      <Content>
        <Header>Create an account</Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            createAccount();
          }}
        >
          <Label htmlFor="f1">First and Last Name</Label>
          <Input
            type="text"
            id="f1"
            onChange={(e) => setName(e.target.value)}
            placeholder="First Last"
            required
          />

          <Label htmlFor="f2">Email</Label>
          <Input
            type="email"
            id="f2"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
            required
          />

          <Label htmlFor="f3">Phone Number</Label>
          <Input
            type="tel"
            id="f3"
            onChange={(e) => setNumber(e.target.value)}
            placeholder="8053215678"
          />
          <Label htmlFor="f4">Password</Label>
          <Input
            type="password"
            id="f4"
            onChange={(e) => setPass1(e.target.value)}
            placeholder="password"
            required
          />
          <Label htmlFor="f5">Re-enter Password</Label>
          <Input
            type="password"
            id="f5"
            onChange={(e) => setPass2(e.target.value)}
            placeholder="password"
            required
          />
          <ErrorMsg>{badMsg}</ErrorMsg>
          <Submit type="submit" value="Create Account" disabled={disabled} />
        </Form>
      </Content>
    </AuthContainer>
  );
}
