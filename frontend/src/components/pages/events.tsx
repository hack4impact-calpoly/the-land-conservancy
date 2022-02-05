import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { BiArrowBack } from 'react-icons/bi';
import EventCard from './eventCard';

const StyledArrow = styled(BiArrowBack)`
  margin-top: 10px;
  color: black;
  text-align: left;
  display: block;
`;

const StyledHeader = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;

  color: #000000;
`;

const StyledContainer = styled(Container)`
  border-radius: 7px;
  font-family: Poppins;
  margin: 5px;
  padding: 20px;
  align-items: left;
  justify-content: left;
`;

const StyledButton = styled.button`
  background: #5f8f3e;
  color: white;
  font-family: Poppins;
  font-size: 15px;
  text-align: center;
  border-radius: 6px;
  border-color: #5f8f3e;
  border-style: solid;
  margin-top: 6px;
  margin-bottom: 10px;
  width: 100%;
  height: 36px;
  align-self: center;
`;

const testEvents = [
  {
    title: "Ben's party",
    start: new Date(121170),
    end: new Date(),
    location: '35.30254888400675, -120.69751392967409',
    notes: 'very fun',
    id: 12,
  },
  {
    title: 'Kyle Concert',
    start: new Date(22222222),
    end: new Date(44444444444444),
    location: 'university union',
    notes: 'also very fun',
    id: 13,
  },
  {
    title: "Armstrong's Winter Staff Party",
    start: new Date(),
    end: new Date(),
    location: 'PAC',
    notes: "Everyone's invited!",
    id: 99900,
  },
];

export default function Events() {
  console.log(testEvents);

  const eventCards = testEvents.map((event) => {
    return (
      <EventCard key={event.id} title={event.title} location={event.location} />
    );
  });

  console.log(eventCards);
  return (
    <div>
      <StyledContainer maxWidth="sm">
        <StyledArrow />
        <StyledHeader>Events</StyledHeader>
        {eventCards}
        <StyledButton>Select</StyledButton>
      </StyledContainer>
    </div>
  );
}
