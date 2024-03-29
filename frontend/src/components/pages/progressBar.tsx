import React from "react";
import { ProgressBar as PBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import styled from "styled-components";

const PBarContainer = styled.div`
  margin-bottom: 40px;
  margin-right: 10px;
  @media only screen and (min-width: 768px) {
    margin-right: 20px;
  }
`;

const StyledCount = styled.h1`
  color: #8f8f8f;
  text-align: left;
  font-size: 30px;
  font-weight: 600;
  margin: 0 15px 10px 0;
  @media screen and (min-width: 768px) {
    font-size: 40px;
    margin: 0 15px 20px 0;
  }
`;

const StyledTotal = styled.span`
  color: #5f8f3e;
`;

const StyledHours = styled.span`
  color: #5f8f3e;
  font-size: 20px;
  padding-left: 10px;
`;

const IndexedStep = styled.div.attrs((props: { acc: boolean }) => props)`
  width: 13px;
  height: 13px;
  background-color: ${({ acc }) => (acc ? "#80ba59" : "#ffffff")};
  
  border: 2px solid #C1C1C1;
  border-color: ${({ acc }) => (acc ? "#DDE4DD" : "#DDDDDD")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    width: 30px;
    height: 30px;
    border-width: 3px;
  }
}
`;

const IndexedStepPosition = styled.p`
  font-size: 15px;
  color: black;
  font-weight: 600;
  font-family: "Poppins";
  margin-top: 50px;
  @media screen and (min-width: 768px) {
    font-size: 20px;
    margin-top: 80px;
  }
`;

export function HoursCount({ hours }: { hours: number }) {
  return (
    <StyledCount>
      {hours} / <StyledTotal>150</StyledTotal>
      <StyledHours>hours</StyledHours>
    </StyledCount>
  );
}

type PBarPropTypes = {
  hours: number;
};

/* eslint-disable react/no-unused-prop-types */

type StepProps = {
  accomplished: boolean;
  position: number;
};

export default function ProgressBar({ hours }: PBarPropTypes) {
  const percent = ((hours % 150) / 150) * 100;

  return (
    <PBarContainer>
      <HoursCount hours={hours % 150} />
      <PBar
        filledBackground="linear-gradient(to right, #c0cfb1, #5f8f3e)"
        percent={percent}
        height={19}
        stepPositions={[5.33, 10, 16.66, 33.33, 50, 66.66, 83.33, 100]}
      >
        <Step>
          {({ accomplished, position }: StepProps) => (
            <IndexedStep acc={accomplished}>
              <IndexedStepPosition>
                {Math.round((position / 100) * 150)}
              </IndexedStepPosition>
            </IndexedStep>
          )}
        </Step>
        <Step>
          {({ accomplished, position }: StepProps) => (
            <IndexedStep acc={accomplished}>
              <IndexedStepPosition>
                {Math.round((position / 100) * 150)}
              </IndexedStepPosition>
            </IndexedStep>
          )}
        </Step>
        <Step>
          {({ accomplished, position }: StepProps) => (
            <IndexedStep acc={accomplished}>
              <IndexedStepPosition>
                {Math.round((position / 100) * 150)}
              </IndexedStepPosition>
            </IndexedStep>
          )}
        </Step>
        <Step>
          {({ accomplished, position }: StepProps) => (
            <IndexedStep acc={accomplished}>
              <IndexedStepPosition>
                {Math.round((position / 100) * 150)}
              </IndexedStepPosition>
            </IndexedStep>
          )}
        </Step>
        <Step>
          {({ accomplished, position }: StepProps) => (
            <IndexedStep acc={accomplished}>
              <IndexedStepPosition>
                {Math.round((position / 100) * 150)}
              </IndexedStepPosition>
            </IndexedStep>
          )}
        </Step>
        <Step>
          {({ accomplished, position }: StepProps) => (
            <IndexedStep acc={accomplished}>
              <IndexedStepPosition>
                {Math.round((position / 100) * 150)}
              </IndexedStepPosition>
            </IndexedStep>
          )}
        </Step>
        <Step>
          {({ accomplished, position }: StepProps) => (
            <IndexedStep acc={accomplished}>
              <IndexedStepPosition>
                {Math.round((position / 100) * 150)}
              </IndexedStepPosition>
            </IndexedStep>
          )}
        </Step>
        <Step>
          {({ accomplished, position }: StepProps) => (
            <IndexedStep acc={accomplished}>
              <IndexedStepPosition>
                {Math.round((position / 100) * 150)}
              </IndexedStepPosition>
            </IndexedStep>
          )}
        </Step>
      </PBar>
    </PBarContainer>
  );
}
