import React from "react";
import styled from "styled-components";
import { DaysSelected } from "../../types";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
  daysSelected,
  setDaysSelected,
  setOpenCustomDate,
  setCustomDays,
  customEnd,
  customPeriod,
  customPeriodNum,
  endAfter,
  customDays,
  occurences,
  setEnd,
  setCustomEnd,
  setCustomPeriod,
  setCustomPeriodNum,
  setOccurences,
}: {
  daysSelected: DaysSelected;
  setDaysSelected: React.Dispatch<React.SetStateAction<DaysSelected>>;
  setOpenCustomDate: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomDays: React.Dispatch<React.SetStateAction<any>>;
  customDays: number[];
  customEnd: string;
  customPeriod: string;
  customPeriodNum: number;
  endAfter: string;
  occurences: number;
  setEnd: React.Dispatch<React.SetStateAction<string>>;
  setCustomEnd: React.Dispatch<React.SetStateAction<string>>;
  setCustomPeriod: React.Dispatch<React.SetStateAction<string>>;
  setCustomPeriodNum: React.Dispatch<React.SetStateAction<number>>;
  setOccurences: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <StyledDiv>
      <Title>Custom recurrence</Title>
      <HorizDiv>
        <Text>Repeat every</Text>
        <NumInput
          type="number"
          min="1"
          placeholder="1"
          value={customPeriodNum}
          onChange={(e) => setCustomPeriodNum(parseInt(e.target.value, 10))}
        />
        <DateType
          onChange={(e) => {
            setCustomPeriod(e.target.value);
          }}
          value={customPeriod}
        >
          <option value="weeks">weeks</option>
          <option value="days">days</option>
          <option value="months">months</option>
          <option value="years">years</option>
        </DateType>
      </HorizDiv>
      {customPeriod === "weeks" && (
        <>
          <SubText>Repeat on</SubText>
          <HorizDiv>
            {daysSelected.map((daySelected, index) => (
              <DayButton
                key={DAY_NAMES[index]}
                type="button"
                onClick={() => {
                  if (!daysSelected[index]) {
                    setCustomDays([...customDays, index]);
                  } else {
                    setCustomDays(customDays.filter((x) => x !== index));
                  }
                  const newDays: DaysSelected = [...daysSelected];
                  newDays[index] = !daysSelected[index];
                  setDaysSelected(newDays);
                  console.log(customDays);
                }}
                style={{
                  backgroundColor: daysSelected[index] ? "#a5b993" : "",
                }}
              >
                {DAY_NAMES[index][0]}
              </DayButton>
            ))}
          </HorizDiv>
        </>
      )}
      <form>
        <Text>Ends</Text>
        <OptionText>
          <Option
            name="repeat"
            type="radio"
            value="never"
            id="never"
            defaultChecked={customEnd === "on"}
            onClick={() => setCustomEnd("on")}
          />
          On
          <Cal
            disabled={customEnd !== "on"}
            type="date"
            onChange={(e) => setEnd(e.target.value)}
            value={endAfter}
          />
        </OptionText>
        <HorizDiv>
          <OptionText>
            <Option
              name="repeat"
              type="radio"
              value="after"
              id="after"
              defaultChecked={customEnd === "after"}
              onClick={() => setCustomEnd("after")}
            />
            After
          </OptionText>
          <NumInput
            type="number"
            min="1"
            disabled={customEnd !== "after"}
            value={occurences}
            onChange={(e) => setOccurences(parseInt(e.target.value, 10))}
          />
          <OptionText>Occurences</OptionText>
        </HorizDiv>
      </form>
      <DoneButton type="submit" onClick={() => setOpenCustomDate(false)}>
        Done
      </DoneButton>
    </StyledDiv>
  );
}
