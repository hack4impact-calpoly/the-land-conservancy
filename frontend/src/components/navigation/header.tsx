import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 25px 0 10px 0;
  @media screen and (min-width: 768px) {
    padding: 50px 0 20px 0;
  }
`;

const BackArrow = styled(BiArrowBack)`
  color: black;
  position: absolute;
  left: 20px;
  font-size: 20px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    left: 99px;
    font-size: 25px;
  }
`;

const StyledHeader = styled.header`
  display: 'flex';
  font-family: 'Poppins';
  font-size: 28px;
  font-weight: 400;
  color: black;
  @media screen and (min-width: 768px) {
    font-size: 48px;
  }
`;

export default function Header({ headerText }: { headerText: string }) {
  const navigate = useNavigate();

  return (
    <Navigation>
      <BackArrow onClick={() => navigate(-1)} />
      <StyledHeader>{headerText}</StyledHeader>
    </Navigation>
  );
}
