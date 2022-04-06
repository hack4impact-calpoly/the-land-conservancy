import React from 'react';
import styled from 'styled-components';
import Header from '../navigation/header';
import Container from './formComponents';
import { Content, Form, Input, Submit, Label } from '../styledComponents';

const Flex = styled.div.attrs((props: { dir: string }) => props)`
  display: flex;
  align-items: left;
  justify-content: space-between;
  flex-direction: ${({ dir }) => dir};
`;

const To = styled.p`
  padding: 0 10px 0 10px;
`;

const Select = styled.select`
  display: block;
  box-sizing: border-box;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  height: 33px;
  padding-left: 10px;

  font-family: Poppins;
  font-size: 20px;
  text-align: left;

  margin-top: 11px;
  margin-bottom: 22px;

  width: 100%;
`;

export default function CreateEvent() {
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState('');
  const [startTime, setSTime] = React.useState('');
  const [endTime, setETime] = React.useState('');
  const [repeat, setRepeat] = React.useState('false');
  const [endAfter, setEnd] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [submit, setSubmit] = React.useState('');

  const clearForm = () => {
    setTitle('');
    setDate('');
    setSTime('');
    setETime('');
    setRepeat('false');
    setEnd('');
    setLocation('');
    setNotes('');
  };
  const submitEvent = async () => {
    const startDate = new Date(date.concat('T', startTime));
    const endDate = new Date(date.concat('T', endTime));

    const newEvent = {
      title,
      start: startDate,
      end: endDate,
      location,
      notes,
      shifts: [],
    };

    fetch('http://localhost:3001/events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then(() => setSubmit('Your event has been created'))
      .then(() => clearForm())
      .catch((error) => {
        console.error('Error:', error);
        setSubmit('Error submitting event');
      });
  };

  return (
    <>
      <Header headerText="Create Event" back="/events" />
      <Container>
        <Content>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitEvent();
            }}
          >
            <Input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event Title"
              value={title}
              required
            />
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
              value={date}
              required
            />

            <Label htmlFor="st">Time</Label>
            <Flex dir="row">
              <Input
                id="st"
                type="time"
                onChange={(e) => setSTime(e.target.value)}
                placeholder="Start Time"
                value={startTime}
                required
              />
              <To>to</To>
              <Input
                type="time"
                onChange={(e) => setETime(e.target.value)}
                placeholder="End Time"
                value={endTime}
                required
              />
            </Flex>

            <Flex dir="row">
              <Flex dir="column">
                <Label htmlFor="repeat-select">Repeats</Label>
                <Select
                  name="repeat"
                  id="repeat-select"
                  onChange={(e) => setRepeat(e.target.value)}
                  value={repeat}
                  required
                >
                  <option value="false">Does not repeat</option>
                  <option value="true">Repeats</option>
                </Select>
              </Flex>
              <Flex dir="column">
                <Label htmlFor="end-repeat">Ends After</Label>
                <Input
                  id="end-repeat"
                  type="date"
                  onChange={(e) => setEnd(e.target.value)}
                  placeholder="ends after"
                  value={endAfter}
                  required
                  disabled={repeat === 'false'}
                />
              </Flex>
            </Flex>

            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              value={location}
              required
            />
            <Label htmlFor="notes">Additional Notes</Label>
            <Input
              id="notes"
              type="text"
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              value={notes}
              required
            />
            <Submit type="submit" value="Create" />
            <p>{submit}</p>
          </Form>
        </Content>
        <div> </div>
      </Container>
    </>
  );
}
