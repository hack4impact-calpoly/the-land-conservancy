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

const StyledDivLeft = styled.div`
  font-family: Poppins;
  display: flex;
  margin-bottom: 25px;
  justify-content: left;
  align-items: left;
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

const DropDownContainer = styled("div")`
  position: relative;
  display: inline-block;
`;

const DropDownHeader = styled("div")`
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 15px;
  width: 10.5em;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #5f8f3e6b;
    color: #fff;
  }
`;

const DropDownListContainer = styled("div")`
  left: 0;
`;

const DropDownList = styled("ul")`
  position: absolute;
  background: #fff;
  border: 2px solid #e5e5e5;
  border-radius: 7px;
  box-sizing: border-box;
  color: black;
  font-size: 1rem;
  font-weight: 500;
  left: 0;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("ul")`
  list-style: none;
  padding: 2em;
  cursor: pointer;
  transiiton: all 0.3 ease-in-out;
  margin-left: -2.5em;
  &:hover {
    background: #5f8f3e6b;
    color: #fff;
  }
`;

let locations = [
  "All Locations",
  "San Luis Obispo",
  "Arroyo Grande",
  "Pismo Preserve",
  "Morro Bay",
  "Atascadero",
  "Cambria",
  "Los Osos",
  "Avila Beach",
  "Nipomo",
  "Santa Maria",
  "Santa Rita Ranch",
  "Kathleen's Canyon Overlook",
  "Santa Margarita Elementary",
];

export default function SearchBar({
  setAllEvents,
}: {
  setAllEvents: (val: (prev: Event[]) => Event[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggling = () => setIsOpen(!isOpen);

  const handleLocationSearch = async (option: string) => {
    if (option === "All Locations") {
      await fetch(`${PORT}/events`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAllEvents(data);
          console.log("from search", option);
        })
        .catch((err) => console.log(err));
    } else {
      await fetch(`${PORT}/events?filter=${option}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAllEvents(data);
          console.log("from search", option);
        })
        .catch((err) => console.log(err));
    }
  };

  const onOptionClicked = (option: string) => () => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log(selectedOption);
    handleLocationSearch(option);
  };

  // If search bar is empty, display all events
  useEffect(() => {
    const loadEvents = async () => {
      await fetch(`${PORT}/events`)
        .then((res) => res.json())
        .then((data) => {
          setAllEvents(data);
          const allLocations = data.map((x: { location: any }) => x.location);
          let setLocations = new Set<string>();
          setLocations = new Set(allLocations);
          const tempSort = [...setLocations].sort();
          locations = ["All Locations", ...tempSort];
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

  // need to implement method to immediately render events based on Location selection

  return (
    <div>
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
      <StyledDivLeft>
        <DropDownContainer>
          <DropDownHeader onClick={toggling}>
            {selectedOption || "All Locations"}
          </DropDownHeader>
          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {locations.map((option) => (
                  <ListItem
                    onClick={onOptionClicked(option)}
                    key={Math.random()}
                  >
                    {option}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
      </StyledDivLeft>
    </div>
  );
}
