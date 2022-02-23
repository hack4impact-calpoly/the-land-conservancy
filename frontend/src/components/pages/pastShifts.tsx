import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import EventSlot from './eventSlot';
import Header from '../navigation/header';

const StyledContainer = styled(Container)`
  border radius: 7px;

  margin: 5px;
  padding: 10px;
`;

const testEvents = [
  {
    title: 'Event one',
    date: 'Tuesday 1/04/2022',
    hours: 6,
    key: 1,
  },

  {
    title: 'Event two',
    date: ' Monday 11/04/2021',
    hours: 4,
    key: 2,
  },

  {
    title: 'Event three',
    date: ' Wednesday 1/20/2021',
    hours: 3,
    key: 3,
  },
];

export default function PastShifts() {
  const eventSlots = testEvents.map((event) => {
    return (
      <EventSlot
        key={event.key}
        title={event.title}
        date={event.date}
        hours={event.hours}
      />
    );
  });

  return (
    <div>
      <Header headerText="Past Shifts" />
      <StyledContainer>{eventSlots}</StyledContainer>
    </div>
  );
}
