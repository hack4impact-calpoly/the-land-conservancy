import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { eachWeekOfInterval, getDay, isBefore } from "date-fns";
import Header from "../navigation/header";
import Container from "./formComponents";
import { Form, Input, Submit, Label, GreenLink } from "../styledComponents";
import CustomRepeatingDate from "./customRepeatingDate";

const PORT = process.env.REACT_APP_API_URL;

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

interface Event {
  _id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  notes: string;
  shifts: string[];
}

export default function CreateEvent({
  setEvents,
}: {
  setEvents: (val: (prev: Event[]) => Event[]) => void;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setSTime] = useState("");
  const [endTime, setETime] = useState("");
  const [repeat, setRepeat] = useState("false");
  const [endAfter, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [submit, setSubmit] = useState("");
  const [link, setLink] = useState("");
  const [openCustomDate, setOpenCustomDate] = useState(false);
  const [customDays, setCustomDays] = useState<(0 | 1 | 2 | 3 | 4 | 5 | 6)[]>(
    []
  );
  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);

  const clearForm = () => {
    setTitle("");
    setDate("");
    setSTime("");
    setETime("");
    setRepeat("false");
    setEnd("");
    setLocation("");
    setNotes("");
  };

  useEffect(() => {
    console.log(customDays);
  }, [customDays]);

  const postEvent = async (
    curDate: string,
    startH: string,
    startM: string,
    endH: string,
    endM: string
  ) => {
    const startTimeDate = new Date(curDate);
    const [sYear, sMonth, sDay] = [
      startTimeDate.getUTCFullYear(),
      startTimeDate.getUTCMonth(),
      startTimeDate.getUTCDate(),
    ];
    const convertedStart = new Date(
      Date.UTC(sYear, sMonth, sDay, +startH, +startM)
    );

    const endTimeDate = new Date(curDate);
    const [eYear, eMonth, eDay] = [
      endTimeDate.getUTCFullYear(),
      endTimeDate.getUTCMonth(),
      endTimeDate.getUTCDate(),
    ];
    const convertedEnd = new Date(Date.UTC(eYear, eMonth, eDay, +endH, +endM));

    const newEvent = {
      title,
      start: convertedStart,
      end: convertedEnd,
      location,
      notes,
      shifts: [],
    };

    clearForm(); // clear form first to prevent multiple clicks => multiple submits
    fetch(`${PORT}/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((data) => setEvents((prev) => [...prev, data]))
      .then(() => {
        setSubmit("Your event has been created. ");
        setLink("Back to events");
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmit("Error submitting event");
      });
  };

  const submitEvent = async () => {
    const [startH, startM] = startTime.split(":");
    const [endH, endM] = endTime.split(":");

    if (repeat === "false") {
      postEvent(date, startH, startM, endH, endM);
    } else if (repeat === "true") {
      // need times to make sure date is correct
      const startDate = new Date(date.concat(" ", startTime));
      const endDate = new Date(endAfter.concat(" ", endTime));
      try {
        // get range of dates between the start and end dates
        const dates = eachWeekOfInterval(
          {
            start: startDate,
            end: endDate,
          },
          { weekStartsOn: getDay(startDate) }
        );
        dates.forEach((curDate) => {
          postEvent(curDate.toUTCString(), startH, startM, endH, endM);
        });
      } catch (RangeError) {
        setSubmit(
          "Invalid date range, make sure starting date is before end date"
        );
      }
    } else {
      // need times to make sure date is correct
      const startDate = new Date(date.concat(" ", startTime));
      const endDate = new Date(endAfter.concat(" ", endTime));
      try {
        // get range of dates between the start and end dates
        // DUPLICATES -- FIG OUT HOW TO SELECT VRY DAY IN INTERVAL
        // gets day before DATE if in day interval (how to get rid)
        // PASS DOWN DAY FR PARENT TO CHILD (DOESNT STICK IF CLOSE CHILD)
        for (let i = 0; i < customDays.length; i++) {
          const dates = eachWeekOfInterval(
            {
              start: startDate,
              end: endDate,
            },
            { weekStartsOn: customDays[i] }
          ).filter((x) => !isBefore(x, startDate));
          dates.forEach((curDate) => {
            console.log(curDate.toUTCString(), startH, startM, endH, endM);
            // postEvent(curDate.toUTCString(), startH, startM, endH, endM);
          });
        }
        console.log(repeat);
      } catch (RangeError) {
        setSubmit(
          "Invalid date range, make sure starting date is before end date"
        );
      }
    }
  };
  return (
    <>
      <Header headerText="Create Event" back="/events" navbar>
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
                    onChange={(e) => {
                      setRepeat(e.target.value);
                      if (e.target.value === "custom") {
                        setOpenCustomDate(true);
                      }
                    }}
                    value={repeat}
                    required
                  >
                    <option value="false">Does not repeat</option>
                    <option value="true">Repeats</option>
                    <option value="custom">Custom...</option>
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
              />
              <Submit type="submit" value="Create" />
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
      {openCustomDate && (
        <CustomRepeatingDate
          setOpenCustomDate={setOpenCustomDate}
          setCustomDays={setCustomDays}
          customDays={customDays}
          sunday={sunday}
          monday={monday}
          tuesday={tuesday}
          wednesday={wednesday}
          thursday={thursday}
          friday={friday}
          saturday={saturday}
          setSunday={setSunday}
          setMonday={setMonday}
          setTuesday={setTuesday}
          setWednesday={setWednesday}
          setThursday={setThursday}
          setFriday={setFriday}
          setSaturday={setSaturday}
        />
      )}
    </>
  );
}
