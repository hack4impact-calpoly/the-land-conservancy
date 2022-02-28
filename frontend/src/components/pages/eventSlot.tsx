import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Modal, ButtonBase } from '@mui/material';
import { IoTrashOutline } from 'react-icons/io5';

const StyledEventContainer = styled(Container)`
  background: rgba(160, 166, 167, 0.31);
  border-radius: 6px;
  padding: 14px;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
`;

const StyledModal = styled(Modal)`
  padding-left: 14px;
  padding-right: 14px;
`;

const StyledModalBox = styled.div`
  background: #ffffff;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px 50px 20px 78px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  @media only screen and (min-width: 768px) {
    width: 660px;
    height: 226px;
  }
`;

const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 14px
  line-height: 21px;
`;

const StyledModalTitle = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
`;

const StyledModalText = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  display: block;
`;

const LayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TrashIcon = styled(IoTrashOutline)`
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

type EventSlotProps = {
  title: string;
  date: string;
  hours: number;
};

export default function EventSlot({ title, date, hours }: EventSlotProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <StyledEventContainer>
      <LayoutDiv>
        <div>
          <StyledTitle>{title}</StyledTitle>
          <p>{date}</p>
          <p>{hours} Hours</p>
        </div>
        <Button onClick={() => setDeleteOpen(true)}>
          <TrashIcon />
        </Button>
        <StyledModal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <StyledModalBox>
            <StyledModalTitle>
              Are you sure you want to delete this shift?
            </StyledModalTitle>
            <Button onClick={() => setDeleteOpen(false)}>
              <StyledModalText>Delete shift</StyledModalText>
            </Button>
            <br />
            <Button onClick={() => setDeleteOpen(false)}>
              <StyledModalText>Cancel</StyledModalText>
            </Button>
          </StyledModalBox>
        </StyledModal>
      </LayoutDiv>
    </StyledEventContainer>
  );
}
