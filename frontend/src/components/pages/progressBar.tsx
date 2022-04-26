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

// const StepNoAcc = styled.div`
//   background: #ffffff;
//   border: 4px solid #c1c1c1;
//   box-sizing: border-box;
// `;

// const StepAcc = styled.div`
//   background: #5f8f3e;
//   border: 4px solid #c1c1c1;
//   box-sizing: border-box;
// `;

// copied styling from the website example
// TODO: change accordingly or remove and use your above components instead
const IndexedStep = styled.div.attrs((props: { acc: boolean }) => props)`
  color: white;
  width: 20px;
  height: 20px;
  font-size: 12px;
  background-color: ${({ acc }) =>
    acc ? 'rgba(0, 116, 217, 1)' : 'rgba(211, 211, 211, 0.8)'};
  
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

}
`;

type PBarPropTypes = {
  hours: number;
};

/* eslint-disable react/no-unused-prop-types */

// feel free to add more fields if needed
type StepProps = {
  accomplished: boolean;
  position: number;
};
// getting an unused prop-type error... if you can't fix it, no worries
// I have just disabled the rule (see above) for now

// interface StepPropTypes {
//   accomplished: boolean;
// }

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
        percent={20}
        height={19}
        // TODO: add the rest of the correct stepPositions
        stepPositions={[8, 25]}
      >
        {/* TODO: add the rest of the correct steps */}
        <Step>
          {({ accomplished, position }: StepProps) => (
            <IndexedStep acc={accomplished}>{position}</IndexedStep>
          )}
        </Step>
        <Step>
          {({ accomplished, position }: StepProps) => (
            <IndexedStep acc={accomplished}>{position}</IndexedStep>
          )}
        </Step>
        {/* <Step position={8}>
          {({ accomplished }: StepPropTypes) => {
            return accomplished ? <StepAcc /> : <StepNoAcc />;
          }}
        </Step> */}
      </PBar>
    </div>
  );
}
