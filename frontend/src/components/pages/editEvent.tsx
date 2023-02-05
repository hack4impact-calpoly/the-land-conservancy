import React, { useState } from "react";
import styled from "styled-components";
// import { eachWeekOfInterval, getDay } from "date-fns";
import Header from "../navigation/header";
import Container from "./formComponents";
import { Form, Input, Submit, Label, GreenLink } from "../styledComponents";

// const PORT = process.env.REACT_APP_API_URL;

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

  margin-top: 5px;
  margin-bottom: 20px;

  width: 100%;
`;

// interface Event {
//   _id: string;
//   title: string;
//   start: string;
//   end: string;
//   location: string;
//   notes: string;
//   shifts: string[];
// }

export default function EditEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setSTime] = useState("");
  const [endTime, setETime] = useState("");
  const [repeat, setRepeat] = useState("false");
  const [endAfter, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [submit] = useState("");
  const [link] = useState("");

  // const clearForm = () => {
  //   setTitle("");
  //   setDate("");
  //   setSTime("");
  //   setETime("");
  //   setRepeat("false");
  //   setEnd("");
  //   setLocation("");
  //   setNotes("");
  // };

  // const postEvent = async () => {};

  const submitEvent = async () => {};

  return (
    <Header headerText="Edit Event" back="/events" navbar>
      <Container>
        <div>
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
                <Label htmlFor="repeat-select">Weekly Repeat</Label>
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
                  disabled={repeat === "false"}
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
            <Submit type="submit" value="Update" />
            <p>
              <b>
                {submit}
                <GreenLink to="/events">{link}</GreenLink>
              </b>
            </p>
          </Form>
        </div>
        <div> </div>
      </Container>
    </Header>
  );
}
