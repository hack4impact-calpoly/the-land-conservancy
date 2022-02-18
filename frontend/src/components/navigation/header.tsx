import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';

const Navigation = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 82px;
    margin-bottom: 45px;
`;

const BackArrow = styled(BiArrowBack)`
    color: black;
    font-size: 25px;
    position: absolute;
    left: 99px;
`;

const StyledHeader = styled.header`
  display: 'flex';
  font-family: 'Poppins';
  font-size: 48px;
  font-weight: 400;
  color: black;
`;

export default function Header( { headerText }: { headerText:string } ) {

  const navigate = useNavigate();

  return (
    <div>
        <Navigation>
            <BackArrow onClick={() => navigate(-1)}/>
            <StyledHeader>{headerText}</StyledHeader>
        </Navigation>
    </div>
  );
}