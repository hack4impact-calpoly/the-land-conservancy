import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  text-decoration: none;
  background-color: #f1f1f1;
  padding: 5px 20px;
  border-radius: 5px;
  position: absolute;
  right: 34%;
  top: 25%;
  text-align: left;
  width: 30%;
  opacity: 95%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HorizDiv = styled.div`
  display: flex;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 15px;
  color: black;
`;

const Text = styled.p`
  font-size: 15px;
  color: black;
  margin: 0 10px 0 0;
`;

const SubText = styled.p`
  font-size: 13px;
  color: black;
  margin-bottom: 5px;
`;

const Option = styled.input`
  font-size: 13px;
`;

const OptionText = styled.p`
  font-size: 13px;
`;

const ButtonText = styled.p`
  font-size: 14px;
  cursor: pointer;
  color: white;
  background-color: #6d9d4e;
  padding: 5px 10px;
  width: fit-content;
  border-radius: 5px;
  margin-top: 0;
`;

const Cal = styled.input`
  margin-left: 10px;
`;

const WeekInput = styled.input`
  font-size: 14px;
  width: 40px;
  margin-right: 10px;
`;

const DateType = styled.select`
  font-size: 14px;
`;

const DayButton = styled.button`
  margin: 3px;
  border: none;
  background-color: #fff;
  flex: 1;
  padding: 4px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #a5b993;
  }
`;

export default function CustomRepeatingDate() {
  return (
    <StyledDiv>
      <Title>Custom recurrence</Title>
      <HorizDiv>
        <Text>Repeat every</Text>
        <WeekInput type="number" min="1" />
        <DateType>
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="months">months</option>
          <option value="years">years</option>
        </DateType>
      </HorizDiv>
      <SubText>Repeat on</SubText>
      <HorizDiv>
        <DayButton type="button">S</DayButton>
        <DayButton type="button">M</DayButton>
        <DayButton type="button">T</DayButton>
        <DayButton type="button">W</DayButton>
        <DayButton type="button">T</DayButton>
        <DayButton type="button">F</DayButton>
        <DayButton type="button">S</DayButton>
      </HorizDiv>
      <form>
        <Text>Ends</Text>
        <OptionText>
          <Option name="repeat" type="radio" value="never" id="never" />
          Never
        </OptionText>
        <OptionText>
          <Option name="repeat" type="radio" value="never" id="never" />
          On
          <Cal type="date" />
        </OptionText>
        <OptionText>
          <Option name="repeat" type="radio" value="never" id="never" />
          After
        </OptionText>
      </form>
      <ButtonText>Done</ButtonText>
    </StyledDiv>
  );
}
