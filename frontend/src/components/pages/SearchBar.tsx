import React, { useState, ChangeEvent, useEffect, KeyboardEvent } from "react";
import styled from "styled-components";
import { Event } from "../../types";

const PORT = process.env.REACT_APP_API_URL;

const StyledDiv = styled.div`
  font-family: Poppins;
  display: flex;
  margin-bottom: 25px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Search = styled.input`
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 17px;
  width: 80%;
  padding: 15px;

  &::placeholder {
    text-align: left;
  }
`;

const QueryButton = styled.button`
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 15px;
  width: 15%;
  padding: 16px 0px;
  &:hover {
    background: #5f8f3e6b;
    cursor: pointer;
  }
`;

export default function SearchBar({
  setAllEvents,
}: {
  setAllEvents: (val: (prev: Event[]) => Event[]) => void;
}) {
  const [query, setQuery] = useState("");

  // If search bar is empty, display all events
  useEffect(() => {
    const loadEvents = async () => {
      await fetch(`${PORT}/events`)
        .then((res) => res.json())
        .then((data) => {
          setAllEvents(data);
        })
        .catch((err) => console.log(err));
    };

    if (query === "") {
      loadEvents();
    }
  }, [query]);

  const handleSearchBarInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // sends query to backend when user presses submit button
  const handleButtonOnClick = async () => {
    await fetch(`${PORT}/events?search=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data);
      })
      .catch((err) => console.log(err));
  };

  // sends query to backend when user presses enter button
  const handleEnterPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await fetch(`${PORT}/events?search=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setAllEvents(data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <StyledDiv>
      <Search
        type="text"
        placeholder="Location or Date (dd/mm/yyyy)"
        onChange={handleSearchBarInput}
        onKeyDown={handleEnterPress}
        value={query}
      />
      <QueryButton onClick={handleButtonOnClick}>Search</QueryButton>
    </StyledDiv>
  );
}
