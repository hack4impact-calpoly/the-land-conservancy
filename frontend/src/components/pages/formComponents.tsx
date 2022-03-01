import React, { ReactChild } from 'react';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';

const StyledBack = styled(BiArrowBack)`
  margin-top: 10px;
  color: black;
`;

const Header = styled.h1`
  font-family: Poppins;
  font-weight: 500;
  font-size: 27px;
  color: black;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  @media only screen and (min-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const Content = styled.div`
  padding: 0;
  @media only screen and (min-width: 768px) {
    padding: 40px;
  }
`;

const StyledContainer = styled.div`
  text-align: left;
  font-family: Poppins;
  padding: 20px;
  @media only screen and (min-width: 768px) {
    width: 600px;
    background: #fffdfd;
    border: 1px solid #c4c4c4;
    border-radius: 7px;
  }
`;

type Props = {
  children: ReactChild[];
};

function Container({ children }: Props) {
  return (
    <Div>
      <StyledContainer>{children}</StyledContainer>
    </Div>
  );
}

const Form = styled.form`
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-family: Poppins;
  font-weight: 600;
  font-size: 20px;
  color: #5b5a5a;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  height: 33px;
  padding-left: 10px;

  font-family: Poppins;
  font-size: 20px;
  text-align: left;

  margin-top: 11px;
  margin-bottom: 22px;

  width: 100%;
`;

const Submit = styled.input`
  background: #5f8f3e;
  color: white;
  cursor: pointer;

  font-family: Poppins;
  font-size: 20px;
  text-align: center;

  border-radius: 10px;
  border-color: #5f8f3e;
  border-style: solid;

  margin-top: 6px;
  margin-bottom: 10px;
  min-width: 100%;
  height: 36px;
  align-self: center;
`;

export { StyledBack, Header, Container, Content, Form, Input, Label, Submit };
