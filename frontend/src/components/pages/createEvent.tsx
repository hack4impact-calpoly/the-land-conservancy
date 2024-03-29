import React, { useState } from "react";
import styled from "styled-components";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  eachWeekOfInterval,
  getDay,
  isAfter,
  isBefore,
} from "date-fns";
import { BsFillPencilFill } from "react-icons/bs";
import Header from "../navigation/header";
import Container from "./formComponents";
import { Form, Input, Submit, Label, GreenLink } from "../styledComponents";
import { DaysSelected } from "../../types";
import CustomRepeatingDate from "./customRepeatingDate";

const PORT = process.env.REACT_APP_API_URL;

const Flex = styled.div.attrs((props: { dir: string }) => props)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ dir }) => dir};
`;

const PencilIcon = styled(BsFillPencilFill)`
  margin-left: 8px;
  color: black;
  text-align: left;
  display: block;
  font-size: 18px;
  cursor: pointer;
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

const Notes = styled.textarea`
  font-size: 20px;
  border-radius: 10px;
  resize: none;
  font-family: Poppins;
  border: 1px solid #c4c4c4;
  padding-left: 10px;
  margin: 5px 0px 20px 0px;
  width: 98%;
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
  const [customDays, setCustomDays] = useState<number[]>([]);
  const [customEnd, setCustomEnd] = useState("");
  const [customPeriod, setCustomPeriod] = useState("weeks");
  const [customPeriodNum, setCustomPeriodNum] = useState(1);
  const [occurences, setOccurences] = useState(1);

  const [daysSelected, setDaysSelected] = useState<DaysSelected>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

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
      // CUSTOM REPEAT -- need times to make sure date is correct
      const startDate = new Date(date.concat(" ", startTime));
      const endDate = new Date(endAfter.concat(" ", endTime));
      try {
        // get range of dates between the start and end dates
        if (customEnd === "on" && customPeriod === "weeks") {
          // dates for CUSTOM INTERVAL week repeat on custom days
          let dates = [];
          if (endDate < startDate) {
            alert("End date cannot be before start date");
          }
          // add start date if its Day is not included in custom repeat
          if (!daysSelected[getDay(startDate)]) {
            dates.push(startDate);
          }
          for (
            let j = startDate;
            j <= endDate;
            j = addWeeks(j, customPeriodNum)
          ) {
            for (let k = 0; k < customDays.length; k++) {
              const diff = customDays[k] - getDay(startDate);
              dates.push(addDays(j, diff));
            }
          }
          dates = dates.filter(
            (x) => !isBefore(x, startDate) && !isAfter(x, endDate)
          );
          dates.forEach((curDate) => {
            postEvent(curDate.toUTCString(), startH, startM, endH, endM);
          });
        } else if (customEnd === "after" && customPeriod === "weeks") {
          // dates for custom interval repeat after X occurences
          let dates = [];
          // add start date if its Day is not included in custom repeat
          if (!daysSelected[getDay(startDate)]) {
            dates.push(startDate);
          }
          const end = addWeeks(startDate, customPeriodNum * occurences);
          for (let j = startDate; j <= end; j = addWeeks(j, customPeriodNum)) {
            for (let k = 0; k < customDays.length; k++) {
              const diff = customDays[k] - getDay(startDate);
              dates.push(addDays(j, diff));
            }
          }
          dates = dates.filter((x) => !isBefore(x, startDate));
          dates.forEach((curDate) => {
            postEvent(curDate.toUTCString(), startH, startM, endH, endM);
          });
        } else if (customEnd === "on" && customPeriod === "days") {
          // dates for day-based repeats
          let dates = [];
          if (endDate < startDate) {
            alert("End date cannot be before start date");
          }
          for (
            let d = startDate;
            d <= endDate;
            d = addDays(d, customPeriodNum)
          ) {
            dates.push(d);
          }
          dates = dates.filter((x) => isBefore(x, endDate));
          dates.forEach((curDate) => {
            postEvent(curDate.toUTCString(), startH, startM, endH, endM);
          });
        } else if (customEnd === "after" && customPeriod === "days") {
          // dates for day-based repeats after X occurences
          let i = 0;
          let d = startDate;
          const dates = [];
          while (i++ < occurences) {
            dates.push(d);
            d = addDays(d, customPeriodNum);
          }
          dates.forEach((curDate) => {
            postEvent(curDate.toUTCString(), startH, startM, endH, endM);
          });
        } else if (customEnd === "on" && customPeriod === "months") {
          // dates for custom-month repeat
          if (endDate < startDate) {
            alert("End date cannot be before start date");
          }
          let dates = [];
          for (
            let j = startDate;
            j <= endDate;
            j = addMonths(j, customPeriodNum)
          ) {
            dates.push(j);
          }
          dates = dates.filter(
            (x) => !isBefore(x, startDate) && !isAfter(x, endDate)
          );
          dates.forEach((curDate) => {
            postEvent(curDate.toUTCString(), startH, startM, endH, endM);
          });
        } else if (customEnd === "after" && customPeriod === "months") {
          // dates for custom-month repeat after X occurences
          const dates = [];
          let i = 0;
          let j = startDate;
          while (i++ < occurences) {
            dates.push(j);
            j = addMonths(j, customPeriodNum);
          }
          dates.forEach((curDate) => {
            postEvent(curDate.toUTCString(), startH, startM, endH, endM);
          });
        } else if (customEnd === "on" && customPeriod === "years") {
          // dates for custom-year repeat
          if (endDate < startDate) {
            alert("End date cannot be before start date");
          }
          let dates = [];
          for (
            let j = startDate;
            j <= endDate;
            j = addYears(j, customPeriodNum)
          ) {
            dates.push(j);
          }
          dates = dates.filter(
            (x) => !isBefore(x, startDate) && !isAfter(x, endDate)
          );
          dates.forEach((curDate) => {
            postEvent(curDate.toUTCString(), startH, startM, endH, endM);
          });
        } else if (customEnd === "after" && customPeriod === "years") {
          // dates for custom-year repeat after X occurences
          const dates = [];
          let i = 0;
          let j = startDate;
          while (i++ < occurences) {
            dates.push(j);
            j = addYears(j, customPeriodNum);
          }
          dates.forEach((curDate) => {
            postEvent(curDate.toUTCString(), startH, startM, endH, endM);
          });
        } else {
          alert("Custom repeat form must be filled out.");
        }
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
                  <Flex dir="row">
                    <Label htmlFor="repeat-select">Repeat</Label>
                    {repeat === "custom" && (
                      <PencilIcon onClick={() => setOpenCustomDate(true)} />
                    )}
                  </Flex>
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
                    disabled={repeat === "false" || repeat === "custom"}
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
              <Notes
                id="notes"
                rows={5}
                cols={50}
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
          customPeriod={customPeriod}
          customPeriodNum={customPeriodNum}
          customEnd={customEnd}
          endAfter={endAfter}
          occurences={occurences}
          setEnd={setEnd}
          setCustomEnd={setCustomEnd}
          setCustomPeriod={setCustomPeriod}
          setCustomPeriodNum={setCustomPeriodNum}
          setOccurences={setOccurences}
          daysSelected={daysSelected}
          setDaysSelected={setDaysSelected}
        />
      )}
    </>
  );
}
