import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AuthContainer, ErrorMsg } from "./authComponents";
import {
  Content,
  Header,
  Form,
  Input,
  Label,
  Submit,
  StyledBack,
} from "../styledComponents";

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
  const [email, setEmail] = React.useState(" ");
  const [valid, setValidation] = React.useState(" ");
  const [sent, setSent] = React.useState(" ");

  const navigate = useNavigate();

  /* checks if email has the @ symbol and a period */
  const validateEmail = () => {
    if (email.includes("@") && email.includes(".")) {
      setValidation("");
    } else {
      setValidation("Please enter a valid email.");
    }
  };

  /* only called when form requirements met */
  const sendEmail = () => {
    validateEmail(); // to reset error msg
    Auth.forgotPassword(email)
      .then(() => {
        setSent("Email has been sent. Please check your email for reset code.");
        navigate("/reset-password");
      })
      .catch((err) => {
        console.log(err);
        setSent("Attempt limit exceeded, please try again later.");
      });
  };

  return (
    <AuthContainer>
      <Link to="/login">
        <StyledBack size="30" />
      </Link>
      <Content>
        <Header>Forgot Password</Header>
        <StyledParagraph>
          {" "}
          Please enter the email associated with your account to recieve
          confirmation code to reset password.{" "}
        </StyledParagraph>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            sendEmail();
          }}
        >
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setSent("");
            }}
            onBlur={validateEmail}
            placeholder="email"
            required
          />
          <ErrorMsg>{valid}</ErrorMsg>
          <Submit type="submit" value="Send" />{" "}
          <StyledSentMsg>{sent}</StyledSentMsg>
        </Form>
      </Content>
    </AuthContainer>
  );
}
