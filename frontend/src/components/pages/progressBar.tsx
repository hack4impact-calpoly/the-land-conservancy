import React from 'react';
import { ProgressBar as PBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import styled from 'styled-components';

const StyledCount = styled.h1`
  color: #8f8f8f;
  text-align: left;
  font-size: 40px;
  font-weight: 600;
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
  width: 40px;
  height: 38px;
  background-color: ${({ acc }) => (acc ? '#5f8f3e' : '#ffffff')};
  
  border: 4px solid #C1C1C1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

const IndexedStepPosition = styled.p`
  font-size: 20px;
  color: black;
  font-weight: 600;
  font-family: 'Poppins';
  padding-top: 100px;
`;

type PBarPropTypes = {
  hours: number;
};

/* eslint-disable react/no-unused-prop-types */

type StepProps = {
  accomplished: boolean;
  position: number;
};

export default function ProgressBar({ hours }: PBarPropTypes) {
  let percent = (hours / 150) * 100;
  if (percent > 150) {
    percent = 0;
  }
  return (
    <div>
      <StyledCount>
        {hours} / <StyledTotal>150</StyledTotal>
        <StyledHours>hours</StyledHours>
      </StyledCount>
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
    </div>
  );
}
