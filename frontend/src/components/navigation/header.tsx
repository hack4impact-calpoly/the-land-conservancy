import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import NavBar from './navBar';

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0 10px 0;
  @media screen and (min-width: 768px) {
    padding: 40px 0 20px 0;
  }
`;

const BackArrow = styled(BiArrowBack)`
  color: black;
  position: absolute;
  left: 30px;
  top: 30px;
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

const Container = styled.div`
  padding: 30px 0 10px 0;
  @media screen and (min-width: 768px) {
    padding: 40px 0 20px 0;
  }
`;

type headerPropTypes = {
  headerText: string;
  navbar?: boolean; // optional prop, default defined below
  back?: string;
  children: React.ReactChild;
};

/* note for future devs: pages that can be accessed from the navbar
 * will pass navbar as a prop, otherwise the back arrow will show
 */
export default function Header({
  headerText,
  navbar,
  back,
  children,
}: headerPropTypes) {
  const navigate = useNavigate();

  const previous = back ? (
    <Link to={back}>
      <BackArrow />
    </Link>
  ) : (
    <BackArrow onClick={() => navigate(-1)} />
  );

  return (
    <Navigation>
      {navbar ? (
        <NavBar>
          <Container>
            <StyledHeader>{headerText}</StyledHeader>
            {children}
          </Container>
        </NavBar>
      ) : (
        <>
          <StyledHeader>{headerText}</StyledHeader>
          {previous}
          {children}
        </>
      )}
    </Navigation>
  );
}
Header.defaultProps = {
  navbar: false,
  back: '',
};
