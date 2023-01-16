import React from "react";
import styled from "styled-components";
import { Container } from "@mui/material";

const StyledContainer = styled(Container)`
  background-color: #f1f1f1;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const PrizeName = styled.div`
  font-weight: bold;
  font-size: 18px;
  @media screen and (min-width: 768px) {
    padding: 0 0 15px 0;
    font-size: 22px;
  }
`;

const SponsorName = styled.div`
  font-size: 15px;
`;

const LayoutDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
  color: black;
  border-radius: 6px;
`;

const TextDiv = styled.div`
  text-align: left;
  padding: 10px 5px 5px 10px;
  @media screen and (min-width: 768px) {
    padding: 10px 5px 5px 30px;
  }
`;

const StyledDiv = styled.div`
  text-decoration: none;
  &:hover ${StyledContainer} {
    background: #5f8f3e6b;
  }
`;

const HoursFlag = styled.p`
  writing-mode: vertical-rl;
  transform: rotate(-180deg);
  background-color: #5f8f3e;
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-left: 0px;
  border-radius: 0px 6px 6px 0px;
  padding: 1px 10px 1px 10px;
  text-align: center;
`;

const CardImage = styled.img`
  max-width: 120px;
  max-height: 100px;
  text-align: right;
  padding: 15px 15px 15px 10px;
  @media screen and (min-width: 768px) {
    padding: 20px 150px 20px 10px;
    max-width: 140px;
    max-height: 130px;
  }
`;

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
      <StyledContainer disableGutters>
        <LayoutDiv>
          <LayoutDiv>
            <HoursFlag>{hoursNeeded} Hours</HoursFlag>
            <TextDiv>
              <PrizeName>{itemName}</PrizeName>
              <SponsorName>Sponsor: {sponsorName}</SponsorName>
            </TextDiv>
          </LayoutDiv>
          <CardImage src={sponsorImage} alt="sponsor" />
        </LayoutDiv>
      </StyledContainer>
    </StyledDiv>
  );
}
