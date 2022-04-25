import React from 'react';
import { ProgressBar as PBar } from 'react-step-progress-bar';
// import { Step } from 'react-step-progress-bar';
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

type PBarPropTypes = {
  hours: number;
};

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
        percent={percent}
        height={19}
        // stepPositions={[8]}
      >
        {/* <Step position={8}>
          {({ accomplished }: StepPropTypes) => {
            return accomplished ? <StepAcc /> : <StepNoAcc />;
          }}
        </Step> */}
      </PBar>
    </div>
  );
}
