import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import EventCard from './eventCard';
import Header from '../navigation/header';

const StyledContainer = styled(Container)`
  border-radius: 7px;
  font-family: Poppins;
  margin: 5px;
  padding: 20px;
  align-items: left;
  justify-content: left;
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

  return `${days[reformat.getDay()]} ${reformat.toLocaleDateString()}`;
};

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  notes: string;
  shifts: string[];
}

type EventProps = {
  eventData: Event[];
};

export default function Events({ eventData }: EventProps) {
  return (
    <div>
      <Header headerText="Events" navbar />
      <StyledContainer maxWidth="md">
        {eventData ? (
          eventData.map((event) => {
            return (
              <EventCard
                key={event.id}
                title={event.title}
                date={convertDate(event.start)}
              />
            );
          })
        ) : (
          <p key="load"> Loading ...</p>
        )}
      </StyledContainer>
    </div>
  );
}
