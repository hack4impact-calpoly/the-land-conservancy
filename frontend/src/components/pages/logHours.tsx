import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import EventDesc from './eventDesc';
import Header from '../navigation/header';
import { Input, Label, Submit } from '../styledComponents';
import { Event } from '../../types';

const StyledContainer = styled(Container)`
  margin: 5px;
  padding: 10px;
`;

const StyledInput = styled(Input)`
  font-size: 20px;
  text-align: left;

  margin-top: 11px;
  margin-bottom: 22px;

  max-width: 100px;
`;

const StyledLabel = styled(Label)`
  display: block;
  text-align: left;
`;

const Feedback = styled.div`
  display: block;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: red;
`;

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

  return `${days[reformat.getUTCDay()]} ${reformat.toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'short',
    timeStyle: 'short',
  })}`;
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
            key={thisEvent._id}
            title={thisEvent.title}
            start={convertDate(thisEvent.start)}
            end={convertDate(thisEvent.end)}
            location={thisEvent.location}
            notes={thisEvent.notes}
          />
        ) : (
          'Loading...'
        )}
        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            submitHours();
          }}
        >
          <StyledLabel htmlFor="hours">Total hours volunteered</StyledLabel>
          <StyledInput
            id="hours"
            type="number"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />

          <Feedback>{valid}</Feedback>
          <Submit type="submit" value="Submit" />
          <p>{submit}</p>
          <Link to="/past-shifts">{link}</Link>
        </form>
      </StyledContainer>
    </Header>
  );
}
