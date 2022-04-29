import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import ShiftSlot from './shiftSlot';
import Header from '../navigation/header';
import { Shift } from '../../types';
import ProgressBar from './progressBar';

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
};

export default function PastShifts({ pastShiftData }: ShiftProps) {
  const totalHours = pastShiftData
    ? pastShiftData.reduce((hours, shift) => hours + shift.hours, 0)
    : 0;

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
    <Header headerText="Past Shifts" navbar>
      <StyledContainer>
        <ProgressBar hours={totalHours} />
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
