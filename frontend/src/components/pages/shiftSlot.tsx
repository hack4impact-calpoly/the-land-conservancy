import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';

const StyledEventContainer = styled(Container)`
  background: rgba(160, 166, 167, 0.31);
  border-radius: 6px;
  padding: 14px;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
`;

const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 14px
  line-height: 21px;
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
};

export default function ShiftSlot({ title, date, hours }: ShiftSlotProps) {
  return (
    <StyledEventContainer>
      <LayoutDiv>
        <div>
          <StyledTitle>{title}</StyledTitle>
          <p>{date}</p>
          <p>{hours} Hours</p>
        </div>
      </LayoutDiv>
    </StyledEventContainer>
  );
}
