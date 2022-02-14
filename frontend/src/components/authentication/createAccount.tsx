import React, { useState } from 'react';
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
} from './authComponents';

// TODO: change to containr later and text-aling left
// but that will probably go into styledComponenets as well

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const createAccount = () => {
    // regex for email validation
    // TODO: add validation for password requirements
    const re =
      /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (
      name &&
      email &&
      number &&
      password &&
      rePassword &&
      password === rePassword &&
      re.test(email)
    ) {
      const account = {
        Name: name,
        Email: email,
        Number: number,
        Password: password,
      };
      console.log(account);
    } else {
      // print to console for now, change to actual errors later
      console.log('Unable to create account');
    }
  };

  return (
    <AuthContainer>
      <Link to="/login">
        <StyledBack size="30" />
      </Link>
      <AuthContent>
        <AuthHeader>Create an account</AuthHeader>
        <Form onSubmit={(e) => e.preventDefault()}>
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <Label htmlFor="f5">Re-enter Password</Label>
          <Input
            type="password"
            id="f5"
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="password"
            required
          />
          <Submit
            type="submit"
            onClick={createAccount}
            value="Create Account"
          />
        </Form>
      </AuthContent>
    </AuthContainer>
  );
}
