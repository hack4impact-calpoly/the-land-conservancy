import React, { ReactChild } from 'react';
import styled from 'styled-components';

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

type Props = {
  children: ReactChild[];
};

function AuthContainer({ children }: Props) {
  return (
    <Div>
      <StyledContainer>{children}</StyledContainer>
    </Div>
  );
}

const ErrorMsg = styled.p`
  color: red;
  font-size: 15px;
  font-style: normal;
  text-align: left;
  margin-top: -20px;
`;

export { AuthContainer, ErrorMsg };
