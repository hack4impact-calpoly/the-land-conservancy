import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import ShiftSlot from './shiftSlot';
import Header from '../navigation/header';
import { Shift, User } from '../../types';

const StyledContainer = styled(Container)`
  border-radius: 7px;
  margin: 5px;
  padding: 10px;
`;

const convertDate = (date: string) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const reformat = new Date(date);

  return `${days[reformat.getUTCDay()]} ${reformat.toLocaleDateString('en-US', {
    timeZone: 'UTC',
  })}`;
};

type ShiftProps = {
  pastShiftData: Shift[];
  setCurrentUser: (user: User) => void;
};

export default function PastShifts({
  pastShiftData,
  setCurrentUser,
}: ShiftProps) {
  pastShiftData.sort((a: Shift, b: Shift) => {
    if (a.event.start > b.event.start) {
      return -1;
    }
    if (a.event.start < b.event.start) {
      return 1;
    }
    return 0;
  });

  return (
    <Header headerText="Past Shifts" navbar setCurrentUser={setCurrentUser}>
      <StyledContainer>
        <StyledContainer maxWidth="md">
          {pastShiftData ? (
            pastShiftData.map((shift) => {
              return (
                <ShiftSlot
                  key={shift._id}
                  title={shift.event.title}
                  date={convertDate(shift.event.start)}
                  hours={shift.hours}
                />
              );
            })
          ) : (
            <p key="load"> Loading ...</p>
          )}
        </StyledContainer>
      </StyledContainer>
    </Header>
  );
}
