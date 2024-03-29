import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import PrizeCard from "./prizeCard";
import Header from "../navigation/header";
import { Prize } from "../../types";

const StyledContainer = styled(Container)`
  margin: 5px;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

type PrizeProps = {
  prizeData: Prize[];
};

export default function EditPrizes({ prizeData }: PrizeProps) {
  return (
    <Header headerText="Edit Prizes" navbar>
      <StyledContainer maxWidth="lg">
        {prizeData ? (
          prizeData.map((prize: Prize) => (
            <StyledLink to={`/edit-prizes/${prize._id}`} key={prize._id}>
              <PrizeCard
                itemName={prize.itemName}
                sponsorName={prize.sponsorName}
                sponsorImage={prize.sponsorImage}
                hoursNeeded={prize._id}
              />
            </StyledLink>
          ))
        ) : (
          <p key="load"> Loading ...</p>
        )}
      </StyledContainer>
    </Header>
  );
}
