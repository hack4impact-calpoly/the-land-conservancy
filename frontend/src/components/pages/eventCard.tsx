import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { RiArrowRightSLine } from 'react-icons/ri';

const StyledContainer = styled(Container)`
  background-color: #f1f1f1;
  border-radius: 6px;
  padding: 14px;
  padding-left: 25px;

  margin-bottom: 10px;
`;

const EventTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: black;
`;

const EventDate = styled.p`
  font-size: 15px;
  color: black;
`;

const StyledArrow = styled(RiArrowRightSLine)`
  color: #6c6b6b;
`;

const TextDiv = styled.div`
  text-align: left;
`;

const ArrowDiv = styled.div`
  text-align: right;
`;

const LayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
`;

const StyledDiv = styled.div`
  text-decoration: none;
  z-index: 99999999;
  &:hover ${StyledContainer} {
    background: #5f8f3e6b;
  }
`;

type EventCardProps = {
  title: string;
  date: string;
};

export default function EventCard({ title, date }: EventCardProps) {
  return (
    <StyledDiv>
      <StyledContainer>
        <LayoutDiv>
          <TextDiv>
            <EventTitle>{title}</EventTitle>
            <EventDate>{date}</EventDate>
          </TextDiv>
          <ArrowDiv>
            <StyledArrow size="60" />
          </ArrowDiv>
        </LayoutDiv>
      </StyledContainer>
    </StyledDiv>
  );
}
