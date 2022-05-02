import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, ButtonBase } from '@mui/material';
import { IoCloseOutline } from 'react-icons/io5';
import { Submit } from '../styledComponents';

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

const Export = styled(Submit)`
  box-sizing: border-box;
  min-width: 0;
  padding: 0 10px 0 10px;
`;

const StyledModalBox = styled.div`
  background: #ffffff;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px 50px 20px 78px;
  border-radius: 50px;
  @media only screen and (min-width: 768px) {
    width: 970px;
    height: 720px;
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

const StyledHoursGreen = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 22.5px;
  display: block;
  color: #5f8f3e;
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

const StyledDiv = styled.div`
  width: 809px;
  height: 145px;

  background: #f1f1f1;
  border-radius: 10px;
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
    height: 100%;
    width: 60px;
  }
`;

// future: may consider passing obj-to-delete infor or a delete function prop
export default function RewardModal() {
  const [rewardOpen, setRewardOpen] = useState(false);
  const [totalHours, setHours] = useState('');

  useEffect(() => {
    const loadTotalHours = async () => {
      await fetch(`http://localhost:3001/users/${currentUser}`)
        .then((res) => res.json())
        .then((data) => {
          setHours(data.totalHours);
        })
        .catch((err) => console.log(err));
    };

    loadTotalHours();
  });

  return (
    <>
      <ButtonsDiv>
        <Form onClick={() => setRewardOpen(true)}>
          <Export type="button" value="Reward Details" />
        </Form>
      </ButtonsDiv>
      <StyledModal open={rewardOpen} onClose={() => setRewardOpen(false)}>
        <StyledModalBox>
          <Button onClick={() => setRewardOpen(false)}>
            <CloseIcon />
          </Button>
          <StyledModalTitle>Your current progress:</StyledModalTitle>
          <RowDiv>
            <StyledHoursGreen>{totalHours}/150 hours</StyledHoursGreen>
            <StyledModalText>
              After reaching a milestone, please send our Volunteer Coordinator{' '}
              <br /> an email at nikiu@lcslo.org to collect your reward.
            </StyledModalText>
          </RowDiv>
          <StyledDiv>
            {' '}
            <p>test</p>{' '}
          </StyledDiv>
          <StyledDiv>
            {' '}
            <p>test</p>{' '}
          </StyledDiv>
          <StyledDiv>
            {' '}
            <p>test</p>{' '}
          </StyledDiv>
          <StyledDiv>
            {' '}
            <p>test</p>{' '}
          </StyledDiv>
          <StyledDiv>
            {' '}
            <p>test</p>{' '}
          </StyledDiv>
          <StyledDiv>
            {' '}
            <p>test</p>{' '}
          </StyledDiv>
          <StyledDiv>
            {' '}
            <p>test</p>{' '}
          </StyledDiv>
        </StyledModalBox>
      </StyledModal>
    </>
  );
}
