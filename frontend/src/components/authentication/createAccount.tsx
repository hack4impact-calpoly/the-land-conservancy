import React, { useState, useEffect, useContext } from 'react';
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
import UserContext from '../../userContext';
import { User } from '../../types';

// TODO: change to containr later and text-aling left
// but that will probably go into styledComponenets as well

// create account type
type Account = {
  Name: string;
  Email: string;
  Number: string;
  Password: string;
};

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [badMsg, setBadMsg] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { setUser } = useContext(UserContext);

  const PORT = process.env.REACT_APP_API_URL;

  const addUserToDb = async (awsUserId: string) => {
    const mongoUser = {
      _id: awsUserId,
      isAdmin: false, // defaulting to non-admin accounts
      name,
      email,
      phone: number,
      pastShifts: [], // no shifts or hours on init
    };
    console.log(mongoUser);
    await fetch(`${PORT}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mongoUser),
    });
  };

  // create new user based on inputted credentials, after the form is validated

  const signUp = async (newAccount: Account) => {
    try {
      /* Auth.signUp() returns an ISignUpResult {
        user: CognitoUser;
        userConfirmed: boolean;
        userSub: string;
      } */
      // make cognito user
      const { userSub } = await Auth.signUp({
        username: newAccount.Email,
        password: newAccount.Password,
        attributes: {
          name: newAccount.Name,
          email: newAccount.Email, // optional
          phone_number: newAccount.Number, // optional - E.164 number convention
          // other custom attributes
        },
      });
      // now make mongodb user, once AWS user is made
      try {
        await addUserToDb(userSub);
      } catch (error) {
        console.log('error adding user to mongoDB:', error);
      }
      return true;
    } catch (error) {
      console.log('error signing up:', error);
      window.alert(error);
    }
    return false;
  };

  // submit only calls when form meets requirements
  const createAccount = () => {
    const account: Account = {
      Name: name,
      Email: email,
      Number: '+1'.concat(number),
      Password: pass1,
    };
    // console.log(account);
    return account;
    // print to console for now, call some backend/ cognito function later
  };

  const validateForm = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /[0-9]{10}/;
    const hasNum = (str: string) => /\d/.test(str);
    const hasLower = (str: string) => /[a-z]/.test(str);
    const hasUpper = (str: string) => /[A-Z]/.test(str);

    if (email && !emailRegex.test(email)) {
      setBadMsg('Please enter a valid email address.');
      return false;
    }

    if (number && !(phoneRegex.test(number) && number.length === 10)) {
      setBadMsg('please enter the 10 digits of your phone number');
      return false;
    }
    if (
      pass1 &&
      !(
        pass1.length >= 8 &&
        hasNum(pass1) &&
        hasLower(pass1) &&
        hasUpper(pass1)
      )
    ) {
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

  const navigate = useNavigate();

  return (
    <AuthContainer>
      <Link to="/login">
        <StyledBack size="30" />
      </Link>
      <Content>
        <Header>Create an account</Header>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            // if signup successful, set email & nav to confirm-email page
            if (await signUp(createAccount())) {
              setUser({ email } as User);
              navigate('/confirm-email');
            }
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
            required
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
