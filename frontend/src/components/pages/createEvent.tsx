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
  const [title, setTitle] = React.useState(' ');
  const [date, setDate] = React.useState(' ');
  const [startTime, setSTime] = React.useState(' ');
  const [endTime, setETime] = React.useState(' ');
  const [repeat, setRepeat] = React.useState('false');
  const [endAfter, setEnd] = React.useState(' ');
  const [location, setLocation] = React.useState(' ');
  const [notes, setNotes] = React.useState(' ');
  const [submit, setSubmit] = React.useState(' ');

  const submitEvent = () => {
    console.log(title);
    console.log(date);
    console.log(startTime);
    console.log(endTime);
    console.log(repeat);
    console.log(endAfter);
    console.log(location);
    console.log(notes);

    setSubmit('Your event has been created');
  };

  return (
    <Header headerText="Create Event" back="/events">
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
              required
            />
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
              required
            />

            <Label htmlFor="st">Time</Label>
            <Flex dir="row">
              <Input
                id="st"
                type="time"
                onChange={(e) => setSTime(e.target.value)}
                placeholder="Start Time"
                required
              />
              <To>to</To>
              <Input
                type="time"
                onChange={(e) => setETime(e.target.value)}
                placeholder="End Time"
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
              required
            />
            <Label htmlFor="notes">Additional Notes</Label>
            <Input
              id="notes"
              type="text"
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              required
            />
            <Submit type="submit" value="Create" />
            <p>{submit}</p>
          </Form>
        </Content>
        <div> </div>
      </Container>
    </Header>
  );
}
