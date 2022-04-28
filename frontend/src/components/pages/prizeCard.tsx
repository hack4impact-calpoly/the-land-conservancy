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

const PrizeName = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: black;
`;

const SponsorName = styled.p`
  font-size: 15px;
  color: black;
`;

const StyledArrow = styled(RiArrowRightSLine)`
  color: #6c6b6b;
  font-size: 60px;
`;

const TextDiv = styled.div`
  text-align: left;
  color: black;
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

// const HoursFlag = styled.p`
//     transform: rotate(270deg);
//     background-color: #5F8F3E;
// `

type PrizeCardProps = {
  itemName: string;
  sponsorName: string;
  sponsorImage: string;
  hoursNeeded: number;
};

export default function PrizeCard({
  itemName,
  sponsorName,
  sponsorImage,
  hoursNeeded,
}: PrizeCardProps) {
  return (
    <StyledDiv>
      <StyledContainer>
        <LayoutDiv>
          <TextDiv>
            <PrizeName>{itemName}</PrizeName>
            <SponsorName>{sponsorName}</SponsorName>
            <p>{hoursNeeded}</p>
            <p>{sponsorImage}</p>
          </TextDiv>
          <ArrowDiv>
            <StyledArrow />
          </ArrowDiv>
        </LayoutDiv>
      </StyledContainer>
    </StyledDiv>
  );
}
