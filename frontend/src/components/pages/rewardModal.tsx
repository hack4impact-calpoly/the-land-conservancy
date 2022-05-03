import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, ButtonBase } from '@mui/material';
import { IoCloseOutline } from 'react-icons/io5';
import { Submit } from '../styledComponents';
import { HoursCount } from './progressBar';
import PrizeCard from './prizeCard';
import { Prize } from '../../types';

const StyledModal = styled(Modal)`
  padding-left: 14px;
  padding-right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  overflow: hidden;
`;

const Form = styled.form`
  float: right;
`;

const Details = styled(Submit)`
  box-sizing: border-box;
  min-width: 0;
  padding: 0 10px 0 10px;
  margin-top: 0;
  border-radius: 15px;
`;

const StyledModalBox = styled.div`
  background: #ffffff;
  border: none;
  padding: 20px 10px 20px 10px;
  box-sizing: border-box;
  border-radius: 30px;
  max-height: 90vh;
  @media only screen and (min-width: 768px) {
    max-width: 800px;
    padding: 20px 30px 20px 30px;
  }
  overflow: auto;
`;

const StyledModalTitle = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22.5px;
`;

const StyledModalText = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22.5px;
  display: block;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CloseIcon = styled(IoCloseOutline)`
  text-align: right;
  color: black;
  font-size: 25px;
  display: block;
  cursor: pointer;
`;

const Button = styled(ButtonBase)`
  border: none;
  background: none;
`;

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
  @media only screen and (min-width: 400px) {
    flex-direction: row;
    width: 60px;
  }
`;

// future: may consider passing obj-to-delete infor or a delete function prop
export default function RewardModal({
  hours,
  prizes,
}: {
  hours: number;
  prizes: Prize[];
}) {
  const [rewardOpen, setRewardOpen] = useState(false);

  return (
    <>
      <ButtonsDiv>
        <Form onClick={() => setRewardOpen(true)}>
          <Details type="button" value="Reward Details" />
        </Form>
      </ButtonsDiv>
      <StyledModal open={rewardOpen} onClose={() => setRewardOpen(false)}>
        <StyledModalBox>
          <Button onClick={() => setRewardOpen(false)}>
            <CloseIcon />
          </Button>
          <StyledModalTitle>Your current progress:</StyledModalTitle>
          <RowDiv>
            <HoursCount hours={hours} />
            <StyledModalText>
              After reaching a milestone, please send our Volunteer Coordinator{' '}
              <br /> an email at nikiu@lcslo.org to collect your reward.
            </StyledModalText>
          </RowDiv>
          {prizes ? (
            prizes.map((prize: Prize) => {
              return (
                <PrizeCard
                  key={prize._id}
                  itemName={prize.itemName}
                  sponsorName={prize.sponsorName}
                  sponsorImage={prize.sponsorImage}
                  hoursNeeded={prize._id}
                />
              );
            })
          ) : (
            <p key="load"> Loading ...</p>
          )}
        </StyledModalBox>
      </StyledModal>
    </>
  );
}
