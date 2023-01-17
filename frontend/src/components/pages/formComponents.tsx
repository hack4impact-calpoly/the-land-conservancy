import React, { ReactChild } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  text-align: left;
  font-family: Poppins;
  padding: 20px;
  @media only screen and (min-width: 768px) {
    width: 600px;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  @media only screen and (min-width: 768px) {
    // justify-content: center;
    align-items: center;
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

// eslint-disable-next-line no-restricted-exports
export { Container as default };
