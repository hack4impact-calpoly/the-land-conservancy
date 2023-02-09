import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import EventCard from "./eventCard";
import DeleteModal from "./deleteModal";
import Header from "../navigation/header";
import { Event, Shift } from "../../types";
import UserContext from "../../userContext";
import SearchBar from "./SearchBar";

const StyledContainer = styled(Container)`
  border-radius: 7px;
  font-family: Poppins;
  margin: 5px;
  padding: 20px;
  align-items: left;
  justify-content: left;
  text-decoration: none;
`;

const StyledCont = styled(Container)`
  justify-content: right;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledDelete = styled(RiDeleteBin6Line)`
  font-size: 20px;
  cursor: pointer;
  color: black;
  &:hover {
    color: white;
  }
`;

const StyledEdit = styled(BiEdit)`
  font-size: 20px;
  cursor: pointer;
  color: black;
  &:hover {
    color: white;
  }
  margin-right: 10px;
`;

const convertDate = (dateString: string) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(dateString);

  return `${days[date.getUTCDay()]} ${date.toLocaleDateString("en-US", {
    timeZone: "UTC",
  })}`;
};

type EventProps = {
  eventData: Event[];
  setAllEvents: (val: (prev: Event[]) => Event[]) => void;
  setAllShifts: (val: (prev: Shift[]) => Shift[]) => void;
};

export default function Events({
  eventData,
  setAllEvents,
  setAllShifts,
}: EventProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [eventId, setEvent] = useState("");
  const { currentUser } = useContext(UserContext);

  const setDeleteStates = (id: string) => {
    setDeleteOpen(true);
    setEvent(id);
  };

  eventData.sort((a: Event, b: Event) => {
    if (a.start > b.start) {
      return -1;
    }
    if (a.start < b.start) {
      return 1;
    }
    return 0;
  });

  return (
    <Header headerText="Events" navbar>
      <StyledContainer maxWidth="md">
        <SearchBar setAllEvents={setAllEvents} />
        {eventData ? (
          eventData
            .filter((event) => {
              const date = new Date(event.start);
              const currentDate = new Date();
              return (
                // for volunteers:
                // only show events 2 months before current date and
                // events 2 weeks after current date for volunteers
                currentUser.isAdmin
                  ? event
                  : date <
                      new Date(
                        currentDate.setDate(currentDate.getDate() + 14)
                      ) &&
                      date >
                        new Date(
                          currentDate.setMonth(currentDate.getMonth() - 2)
                        )
              );
            })
            .map((event) =>
              currentUser.isAdmin ? (
                <StyledLink to={`/log-hours/${event._id}`} key={event._id}>
                  <EventCard
                    title={event.title}
                    date={convertDate(event.start)}
                    key={event._id}
                  >
                    <StyledCont>
                      <StyledLink
                        to={`/edit-event/${event._id}`}
                        key={event._id}
                      >
                        <StyledEdit />
                      </StyledLink>
                      <StyledDelete
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteStates(event._id);
                        }}
                      />
                    </StyledCont>
                  </EventCard>
                </StyledLink>
              ) : (
                <StyledLink to={`/log-hours/${event._id}`} key={event._id}>
                  <EventCard
                    title={event.title}
                    date={convertDate(event.start)}
                    key={event._id}
                  />
                </StyledLink>
              )
            )
        ) : (
          <p key="load"> Loading ...</p>
        )}
        <DeleteModal
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          itemId={eventId}
          setAllShifts={setAllShifts}
          setAllEvents={setAllEvents}
          isShifts={false}
        />
      </StyledContainer>
    </Header>
  );
}
