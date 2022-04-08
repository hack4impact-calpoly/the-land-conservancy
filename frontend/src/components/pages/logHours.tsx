import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import EventDesc from './eventDesc';
import Header from '../navigation/header';

const StyledContainer = styled(Container)`
  border-radius: 7px;
  margin: 5px;
  padding: 10px;
`;

const StyledInput = styled.input`
  display: block;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 6px;
  height: 33px;

  font-size: 20px;
  text-align: left;

  margin-top: 11px;
  margin-bottom: 22px;

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

interface Event {
  _id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  notes: string;
  shifts: string[];
}

type LogHoursProps = {
  eventData: Event[];
};

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

export default function LogHours({ eventData }: LogHoursProps) {
  const [hours, setHours] = React.useState('');
  const [valid, setValid] = React.useState(' ');
  const [submit, setSubmit] = React.useState(' ');
  const [link, setLink] = React.useState(' ');
  const { eventId } = useParams();
  const thisEvent = eventData.find((event) => {
    return event._id === eventId;
  });

  const validateHours = () => {
    // check: filled, isNumber, is > 0
    if (hours && (Number.isNaN(hours) || !(+hours > 0))) {
      console.log('invalid input');
      setValid('Please enter a positive number of hours');
    } else {
      console.log(`good input: ${hours || 'empty'}`);
      setValid(' ');
    }
  };

  const submitHours = () => {
    if (valid === ' ') {
      setSubmit('Hours have been submitted.');
      setLink('View your updated history here.');
      setHours('');
    } else {
      setSubmit(' ');
      setLink(' ');
    }
  };

  useEffect(() => {
    validateHours();
  }, [hours]);

  return (
    <Header headerText="Log Hours" back="/events">
      <StyledContainer maxWidth="sm">
        {thisEvent ? (
          <EventDesc
            /* eslint-disable */
            key={thisEvent._id}
            /* eslint-enable */
            title={thisEvent.title}
            start={convertDate(thisEvent.start)}
            end={convertDate(thisEvent.end)}
            location={thisEvent.location}
            notes={thisEvent.notes}
          />
        ) : (
          'hewwo'
        )}
        <StyledHeader3>Total hours volunteered</StyledHeader3>
        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            submitHours();
          }}
        >
          <StyledInput
            id="hours"
            type="number"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />

          <StyledHeader4>{valid}</StyledHeader4>
          <StyledButton type="submit">Submit</StyledButton>
          <p>{submit}</p>
          <Link to="/past-shifts">{link}</Link>
        </form>
      </StyledContainer>
    </Header>
  );
}
