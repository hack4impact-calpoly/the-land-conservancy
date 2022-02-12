import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';

const StyledBack = styled(BiArrowBack)`
  margin-top: 10px;
  color: black;
`;

const AuthHeader = styled.h1`
  font-family: Poppins;
  font-weight: 500;
  font-size: 27px;
  color: black;
`;

export { StyledBack, AuthHeader };
