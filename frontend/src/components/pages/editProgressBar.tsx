import React from 'react';
import styled from 'styled-components';
import Header from '../navigation/header';

const StyledHeader = styled.header`
  display: 'flex';
  flex-direction: 'column';
  align-items: 'center';
  justify-content: 'center';
  font-size: calc(10px + 2vmin);
  color: black;
`;

function EditProgressBar() {
  return (
    <Header headerText="Edit Prizes" navbar>
      <StyledHeader>
        This is the blank edit-progress-bar page for admins.
      </StyledHeader>
    </Header>
  );
}

export default EditProgressBar;
