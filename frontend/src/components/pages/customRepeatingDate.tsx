import React, { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  text-decoration: none;
  background-color: #f1f1f1;
  padding: 5px 20px;
  border-radius: 5px;
  text-align: left;
  margin: auto;
  margin-top: 150px;
  width: 50%;
  min-width: fit-content;
  opacity: 95%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HorizDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 15px;
  color: black;
`;

const Text = styled.p`
  font-size: 15px;
  color: black;
  margin: 0;
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
  font-size: 14px;
`;

const DoneButton = styled.button`
  font-size: 14px;
  cursor: pointer;
  color: white;
  background-color: #6d9d4e;
  padding: 5px 10px;
  width: fit-content;
  border-radius: 5px;
  margin: auto;
  margin-top: 0;
  margin-bottom: 10px;
  border: none;
`;

const Cal = styled.input`
  margin-left: 10px;
`;

const NumInput = styled.input`
  font-size: 14px;
  width: 40px;
  margin: 0 10px;
  height: fit-content;
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
  max-width: 25px;
  cursor: pointer;
  border-radius: 25px;
`;

export default function CustomRepeatingDate({
  setOpenCustomDate,
}: {
  setOpenCustomDate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);

  return (
    <StyledDiv>
      <Title>Custom recurrence</Title>
      <HorizDiv>
        <Text>Repeat every</Text>
        <NumInput type="number" min="1" />
        <DateType>
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="months">months</option>
          <option value="years">years</option>
        </DateType>
      </HorizDiv>
      <SubText>Repeat on</SubText>
      <HorizDiv>
        <DayButton
          type="button"
          onClick={() => setSunday(!sunday)}
          style={{
            backgroundColor: sunday ? "#a5b993" : "",
          }}
        >
          S
        </DayButton>
        <DayButton
          type="button"
          onClick={() => setMonday(!monday)}
          style={{
            backgroundColor: monday ? "#a5b993" : "",
          }}
        >
          M
        </DayButton>
        <DayButton
          type="button"
          onClick={() => setTuesday(!tuesday)}
          style={{
            backgroundColor: tuesday ? "#a5b993" : "",
          }}
        >
          T
        </DayButton>
        <DayButton
          type="button"
          onClick={() => setWednesday(!wednesday)}
          style={{
            backgroundColor: wednesday ? "#a5b993" : "",
          }}
        >
          W
        </DayButton>
        <DayButton
          type="button"
          onClick={() => setThursday(!thursday)}
          style={{
            backgroundColor: thursday ? "#a5b993" : "",
          }}
        >
          T
        </DayButton>
        <DayButton
          type="button"
          onClick={() => setFriday(!friday)}
          style={{
            backgroundColor: friday ? "#a5b993" : "",
          }}
        >
          F
        </DayButton>
        <DayButton
          type="button"
          onClick={() => setSaturday(!saturday)}
          style={{
            backgroundColor: saturday ? "#a5b993" : "",
          }}
        >
          S
        </DayButton>
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
        <HorizDiv>
          <OptionText>
            <Option name="repeat" type="radio" value="never" id="never" />
            After
          </OptionText>
          <NumInput type="number" min="1" />
          <OptionText>Occurences</OptionText>
        </HorizDiv>
      </form>
      <DoneButton type="submit" onClick={() => setOpenCustomDate(false)}>
        Done
      </DoneButton>
    </StyledDiv>
  );
}
