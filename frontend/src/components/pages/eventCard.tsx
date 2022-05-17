import React, { ReactChild, useContext } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { RiArrowRightSLine } from 'react-icons/ri';
import UserContext from '../../userContext';

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
  font-size: 60px;
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
  &:hover ${StyledContainer} {
    background: #5f8f3e6b;
  }
`;

type EventCardProps = {
  title: string;
  date: string;
  children: ReactChild;
};

export default function EventCard({ title, date, children }: EventCardProps) {
  const { currentUser } = useContext(UserContext);

  return (
    <StyledDiv>
      <StyledContainer>
        <LayoutDiv>
          <TextDiv>
            <EventTitle>{title}</EventTitle>
            <EventDate>{date}</EventDate>
          </TextDiv>
          <ArrowDiv>
            {currentUser.isAdmin ? children : <StyledArrow />}
          </ArrowDiv>
        </LayoutDiv>
      </StyledContainer>
    </StyledDiv>
  );
}
