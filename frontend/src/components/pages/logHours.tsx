import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import EventDesc from './eventDesc';

const StyledContainer = styled(Container)`
  border radius: 7px;
  margin: 5px;
  padding: 10px;
`;

const StyledBack = styled.button`
  display: block;
  border: none;
  text-align: left;
  background: white;
  font-size: 25px;
  color: black;
`;
const StyledHeader = styled.h1`
  text-align: center;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
  color: #000000;
`;
const StyledInput = styled.input`
  display: block;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 6px;

  text-align: left;

  margin-top: 11px;
  margin-bottom: 22px;

  @media (max-width: 600px) {
    width: 500px;
  }

  @media (max-width: 599px) {
    width: 90vw;
  }
`;

const StyledHeader3 = styled.h3`
  display: block;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 19px;
  color: #5b5a5a;
`;

const StyledButton = styled.button`
  color: white;
  display: block;
  background: #5f8f3e;
  border-radius: 6px;

  width: 100%;
  height: 33px;
  padding-left: 6px;

  font-family: Poppins;
  text-align: center;
`;

const StyledHeader4 = styled.h4`
  display: block;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 19px;
  color: red;
`;

const testEvents = [
  {
    title: 'Event One',
    date: 'Monday 2/14/2022',
    start: '12:00 pm',
    end: '12:00 am',
    location: '123 Street st.',
    notes: "don't be late :)",
    key: 1,
  },
];

export default function LogHours() {
  const [hours, setHours] = React.useState(' ');
  const [valid, setValid] = React.useState(' ');
  const [submit, setSubmit] = React.useState(' ');

  const validateHours = () => {
    if (Number.isNaN(+hours) === false) {
      console.log('true');
      setValid(' ');
    } else {
      console.log('false');
      setValid('Please enter a valid number');
    }
  };

  const submitHours = () => {
    if (valid === ' ') {
      setSubmit('Hours have been submitted.');
    } else {
      setSubmit(' ');
    }
  };
  const eventDesc = testEvents.map((event) => {
    return (
      <EventDesc
        key={event.key}
        title={event.title}
        date={event.date}
        start={event.start}
        end={event.end}
        location={event.location}
        notes={event.notes}
      />
    );
  });

  return (
    <div>
      <StyledContainer maxWidth="sm">
        <StyledBack>
          <Link to="/events">
            <BiArrowBack />
          </Link>
        </StyledBack>
        <StyledHeader>Log Hours</StyledHeader>
        {eventDesc}
        <StyledHeader3>Total hours volunteered</StyledHeader3>
        <form onSubmit={(e) => e.preventDefault()}>
          <StyledInput
            id="hours"
            type="text"
            onChange={(e) => setHours(e.target.value)}
            onBlur={validateHours}
          />
          <StyledHeader4>{valid}</StyledHeader4>
          <StyledButton onClick={submitHours}>Submit</StyledButton>
          <p>{submit}</p>
        </form>
      </StyledContainer>
    </div>
  );
}
