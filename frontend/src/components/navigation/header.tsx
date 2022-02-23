import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import NavBar from './navBar';

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 0 10px 0;
  @media screen and (min-width: 768px) {
    padding: 30px 0 20px 0;
  }
`;

const BackArrow = styled(BiArrowBack)`
  color: black;
  position: absolute;
  left: 20px;
  font-size: 25px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    left: 80px;
    font-size: 30px;
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

type headerPropTypes = {
  headerText: string;
  navbar?: boolean; // optional prop, default defined below
};

/* note for future devs: pages that can be accessed from the navbar
 * will pass navbar as a prop, otherwise the back arrow will show
 */
export default function Header({ headerText, navbar }: headerPropTypes) {
  const navigate = useNavigate();

  return (
    <Navigation>
      {navbar ? <NavBar /> : <BackArrow onClick={() => navigate(-1)} />}
      <StyledHeader>{headerText}</StyledHeader>
    </Navigation>
  );
}
Header.defaultProps = {
  navbar: false,
};
