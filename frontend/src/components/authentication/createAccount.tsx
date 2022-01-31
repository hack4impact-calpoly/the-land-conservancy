import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackArrow = styled(ArrowBackIcon)`
  padding: 31px;
  float: left;
`;

const TopBar = styled.div`
  box-sizing: border-box;
  height: 144px;
`;

const Card = styled.div`
  width: 414px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  padding-left: 53px;
  text-align: left;

  color: #000000;
`;

const Label = styled.h3`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 19px;
  padding-left: 56px;
  text-align: left;

  color: #5b5a5a;
`;

const Input = styled.input`
  width: 302px;
  height: 33px;
  border: 1px solid #c4c4c4;
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  margin-left: 56px;
  margin-right: 56px;
`;

const Button = styled.button`
  width: 305px;
  height: 36px;
  background: #5f8f3e;
  border-radius: 6px;
  border: none;
  margin: 29px;

  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
`;

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const createAccount = () => {
    // regex for email validation
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
    <Card>
      <TopBar>
        <BackArrow />
      </TopBar>
      <Header>Create an account</Header>
      <Label>Name</Label>
      <Input onChange={(e) => setName(e.target.value)} />
      <Label>Email</Label>
      <Input onChange={(e) => setEmail(e.target.value)} />
      <Label>Phone number</Label>
      <Input onChange={(e) => setNumber(e.target.value)} />
      <Label>Password</Label>
      <Input onChange={(e) => setPassword(e.target.value)} />
      <Label>Re-enter password</Label>
      <Input onChange={(e) => setRePassword(e.target.value)} />
      <Button onClick={createAccount}>Create Account</Button>
    </Card>
  );
}
