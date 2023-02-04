import React from "react";
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
  setCustomDays,
  customEnd,
  customPeriod,
  customPeriodNum,
  endAfter,
  customDays,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  setSunday,
  setMonday,
  setTuesday,
  setWednesday,
  setThursday,
  setFriday,
  setSaturday,
  setEnd,
  setCustomEnd,
  setCustomPeriod,
  setCustomPeriodNum,
}: {
  setOpenCustomDate: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomDays: React.Dispatch<React.SetStateAction<any>>;
  customDays: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  customEnd: string;
  customPeriod: string;
  customPeriodNum: number;
  endAfter: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  setSunday: React.Dispatch<React.SetStateAction<boolean>>;
  setMonday: React.Dispatch<React.SetStateAction<boolean>>;
  setTuesday: React.Dispatch<React.SetStateAction<boolean>>;
  setWednesday: React.Dispatch<React.SetStateAction<boolean>>;
  setThursday: React.Dispatch<React.SetStateAction<boolean>>;
  setFriday: React.Dispatch<React.SetStateAction<boolean>>;
  setSaturday: React.Dispatch<React.SetStateAction<boolean>>;
  setEnd: React.Dispatch<React.SetStateAction<string>>;
  setCustomEnd: React.Dispatch<React.SetStateAction<string>>;
  setCustomPeriod: React.Dispatch<React.SetStateAction<string>>;
  setCustomPeriodNum: React.Dispatch<React.SetStateAction<number>>;
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
            console.log(e.target.value);
          }}
        >
          <option value="weeks">weeks</option>
          <option value="days">days</option>
          <option value="months">months</option>
          <option value="years">years</option>
        </DateType>
      </HorizDiv>
      {customPeriod === "days" && (
        <>
          <SubText>Repeat on</SubText>
          <HorizDiv>
            <DayButton
              type="button"
              onClick={() => {
                if (!sunday) {
                  setCustomDays([...customDays, 0]);
                } else {
                  setCustomDays(customDays.filter((x) => x !== 0));
                }
                setSunday(!sunday);
              }}
              style={{
                backgroundColor: sunday ? "#a5b993" : "",
              }}
            >
              S
            </DayButton>
            <DayButton
              type="button"
              onClick={() => {
                if (!monday) {
                  setCustomDays([...customDays, 1]);
                } else {
                  setCustomDays(customDays.filter((x) => x !== 1));
                }
                setMonday(!monday);
              }}
              style={{
                backgroundColor: monday ? "#a5b993" : "",
              }}
            >
              M
            </DayButton>
            <DayButton
              type="button"
              onClick={() => {
                if (!tuesday) {
                  setCustomDays([...customDays, 2]);
                } else {
                  setCustomDays(customDays.filter((x) => x !== 2));
                }
                setTuesday(!tuesday);
              }}
              style={{
                backgroundColor: tuesday ? "#a5b993" : "",
              }}
            >
              T
            </DayButton>
            <DayButton
              type="button"
              onClick={() => {
                if (!wednesday) {
                  setCustomDays([...customDays, 3]);
                } else {
                  setCustomDays(customDays.filter((x) => x !== 3));
                }
                setWednesday(!wednesday);
              }}
              style={{
                backgroundColor: wednesday ? "#a5b993" : "",
              }}
            >
              W
            </DayButton>
            <DayButton
              type="button"
              onClick={() => {
                if (!thursday) {
                  setCustomDays([...customDays, 4]);
                } else {
                  setCustomDays(customDays.filter((x) => x !== 4));
                }
                setThursday(!thursday);
              }}
              style={{
                backgroundColor: thursday ? "#a5b993" : "",
              }}
            >
              T
            </DayButton>
            <DayButton
              type="button"
              onClick={() => {
                if (!friday) {
                  setCustomDays([...customDays, 5]);
                } else {
                  setCustomDays(customDays.filter((x) => x !== 5));
                }
                setFriday(!friday);
              }}
              style={{
                backgroundColor: friday ? "#a5b993" : "",
              }}
            >
              F
            </DayButton>
            <DayButton
              type="button"
              onClick={() => {
                if (!saturday) {
                  setCustomDays([...customDays, 6]);
                } else {
                  setCustomDays(customDays.filter((x) => x !== 6));
                }
                setSaturday(!saturday);
              }}
              style={{
                backgroundColor: saturday ? "#a5b993" : "",
              }}
            >
              S
            </DayButton>
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
