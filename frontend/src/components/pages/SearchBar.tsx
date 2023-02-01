import React from "react";
import styled from "styled-components";

const Search = styled.input`
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 13px;
  width: 80%;

  &::placeholder {
    text-align: center;
  }
`;

export default function SearchBar() {
  return (
    <div>
      <Search type="text" placeholder="Type Here" />
    </div>
  );
}
