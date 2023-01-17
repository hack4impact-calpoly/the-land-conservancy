import React from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "@mui/material";

import ShiftSlot from "./shiftSlot";
import Header from "../navigation/header";
import checkmark from "../../imgs/green_checkmark.svg";

const Check = styled.img`
  padding-top: 10px;
  padding-bottom: 20px;
  width: 60px;
  height: 60px;
  @media only screen and (min-width: 768px) {
    padding: 40px;
    width: 100px;
    height: 100px;
  }
`;

const Text = styled.p`
  color: #6a6969;
  font-weight: 600;
  font-size: 16px;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const Button = styled.button`
  height: 47px;
  border: 2px solid #5f8f3e;
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0 5px 0 5px;

  cursor: pointer;
  background: none;
  color: #5f8f3e;

  font-family: Poppins;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-align: center;

  width: 100%;
  max-width: 200px;
  &:hover,
  &:active,
  &:focus {
    background-color: #5f8f3e;
    color: white;
  }
`;

const StyledContainer = styled(Container)`
  border radius: 7px;
  margin: 5px;
  padding: 10px;
`;

const Row = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

const convertDate = (date: string) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const reformat = new Date(date);

  return `${days[reformat.getUTCDay()]} ${reformat.toLocaleDateString("en-US", {
    timeZone: "UTC",
  })}`;
};

interface LocationState {
  _id: string;
  title: string;
  date: string;
  hours: number;
}

export default function ThankYou() {
  const location = useLocation();
  const data = location.state as LocationState;

  return (
    <Header headerText=" " navbar>
      <StyledContainer maxWidth="md">
        <Check src={checkmark} alt="check mark" />
        <Text>
          Thank you for volunteering with The Land Conservancy! The work of
          incredible volunteers like you makes conserving wildlife habitat and
          agriculture possible.{" "}
        </Text>

        <Text>
          Please check the volunteer hour progress bar to see if you have
          reached a milestone and earned a reward. If so, please send our
          Volunteer Coordinator an email at nikiu@lcslo.org to collect your
          reward.
        </Text>
        {data ? (
          <ShiftSlot
            title={data.title}
            date={convertDate(data.date)}
            hours={data.hours}
          />
        ) : (
          <p key="load"> Loading ...</p>
        )}
        <Row>
          <Link to="/events">
            <Button>Log more hours</Button>
          </Link>
          <Link to="/past-shifts">
            <Button>View past shifts</Button>
          </Link>
        </Row>
      </StyledContainer>
    </Header>
  );
}
