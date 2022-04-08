import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  text-decoration: none;
  z-index: 100;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const convertDate = (dateString: string) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const date = new Date(dateString);

  return `${days[date.getDay()]} ${date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
  })}`;
};

interface Event {
  _id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  notes: string;
  shifts: [string];
}

type EventProps = {
  eventData: Event[];
};

export default function Events({ eventData }: EventProps) {
  eventData.sort((a: Event, b: Event) => {
    if (a.start > b.start) {
      return -1;
    }
    if (a.start < b.start) {
      return 1;
    }
    return 0;
  });

  return (
    <Header headerText="Events" navbar>
      <StyledContainer maxWidth="md">
        {eventData ? (
          eventData.map((event) => {
            return (
              <StyledLink
                /* eslint-disable */
                  to={`/log-hours/${event._id}`}
                  key={event._id}
                  /* eslint-enable */
              >
                <EventCard
                  title={event.title}
                  date={convertDate(event.start)}
                  /* eslint-disable */
                    key={event._id}
                    /* eslint-enable */
                />
              </StyledLink>
            );
          })
        ) : (
          <p key="load"> Loading ...</p>
        )}
      </StyledContainer>
    </Header>
  );
}
