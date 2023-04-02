import React from "react";
import styled from "styled-components";
import { Container } from "@mui/material";

const StyledEventContainer = styled(Container)`
  background-color: #f1f1f1;
  border-radius: 6px;
  padding: 14px;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  font-size: 14px
  line-height: 21px;
  margin-bottom: 10px;
`;

const LayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type ShiftSlotProps = {
  title: string;
  date: string;
  hours: number;
  notes: string;
  image: string;
};

export default function ShiftSlot({
  title,
  date,
  hours,
  notes,
  image,
}: ShiftSlotProps) {
  return (
    <StyledEventContainer>
      <LayoutDiv>
        <div>
          <StyledTitle>{title}</StyledTitle>
          <div>{date}</div>
          <div>{hours} Hours</div>
          <div>{notes}</div>
          <div>{image}</div>
        </div>
      </LayoutDiv>
    </StyledEventContainer>
  );
}
