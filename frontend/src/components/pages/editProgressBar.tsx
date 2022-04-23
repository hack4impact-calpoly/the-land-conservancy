import React from 'react';
import styled from 'styled-components';
import Header from '../navigation/header';
import { User } from '../../types';

const StyledHeader = styled.header`
  display: 'flex';
  flex-direction: 'column';
  align-items: 'center';
  justify-content: 'center';
  font-size: calc(10px + 2vmin);
  color: black;
`;

function EditProgressBar({
  setCurrentUser,
}: {
  setCurrentUser: (user: User) => void;
}) {
  return (
    <Header headerText="Edit Prizes" navbar setCurrentUser={setCurrentUser}>
      <StyledHeader>
        This is the blank edit-progress-bar page for admins.
      </StyledHeader>
    </Header>
  );
}

export default EditProgressBar;
