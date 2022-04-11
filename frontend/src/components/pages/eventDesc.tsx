import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';

const StyledEventContainer = styled(Container)`
  background: #f1f1f1;
  border-radius: 6px;
  padding: 14px;
  text-align: left;
  margin-bottom: 10px;
`;

const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  line-height: 21px;
`;

type EventDescProps = {
  title: string;
  start: string;
  end: string;
  location: string;
  notes: string;
};

export default function EventDesc({
  title,
  start,
  end,
  location,
  notes,
}: EventDescProps) {
  return (
    <div>
      <StyledEventContainer>
        <StyledTitle>{title}</StyledTitle>
        <p>
          {start} to {end}
        </p>
        <p>{location}</p>
        <StyledTitle>Notes</StyledTitle>
        <p>{notes}</p>
      </StyledEventContainer>
    </div>
  );
}
