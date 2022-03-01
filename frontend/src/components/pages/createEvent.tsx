import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  StyledBack,
  Header,
  Container,
  Content,
  Form,
  Input,
  Label,
  Submit,
} from './formComponents';

const Flex = styled.div.attrs((props: { dir: string }) => props)`
  display: flex;
  align-items: left;
  justify-content: space-between;
  flex-direction: ${({ dir }) => dir};
`;

export default function CreateEvent() {
  const [title, setTitle] = React.useState(' ');
  const [date, setDate] = React.useState(' ');
  const [startTime, setSTime] = React.useState(' ');
  const [endTime, setETime] = React.useState(' ');
  const [repeat, setRepeat] = React.useState(' ');
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
    <Container>
      <Link to="/events">
        <StyledBack size="30" />
      </Link>
      <Content>
        <Header>Create Event</Header>
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
          <Label>Date</Label>
          <Input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            required
          />

          <Label>Time</Label>
          <Flex dir="row">
            <Input
              type="time"
              onChange={(e) => setSTime(e.target.value)}
              placeholder="Start Time"
              required
            />
            <p> to </p>
            <Input
              type="time"
              onChange={(e) => setETime(e.target.value)}
              placeholder="End Time"
              required
            />
          </Flex>

          <Flex dir="row">
            <Flex dir="column">
              <Label>Repeats</Label>
              <Input
                type="text"
                onChange={(e) => setRepeat(e.target.value)}
                placeholder="repeat"
                required
              />
            </Flex>

            <Flex dir="column">
              <Label>Ends After</Label>
              <Input
                type="date"
                onChange={(e) => setEnd(e.target.value)}
                placeholder="ends after"
                required
              />
            </Flex>
          </Flex>

          <Label>Location</Label>
          <Input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
          />
          <Label>Additional Notes</Label>
          <Input
            type="text"
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            required
          />
          <Submit type="submit" value="Create" />
          <p>{submit}</p>
        </Form>
      </Content>
    </Container>
  );
}
