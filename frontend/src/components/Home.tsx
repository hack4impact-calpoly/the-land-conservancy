import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: 'flex';
  flex-direction: 'column';
  align-items: 'center';
  justify-content: 'center';
  font-size: calc(10px + 2vmin);
  color: black;
`;

function Home() {
  return (
    <div>
      <StyledHeader>
        This is the beginning of The Land Conservancy project.
      </StyledHeader>
    </div>
  );
}

export default Home;
