import React from 'react';
import styled from 'styled-components';
import { Modal, ButtonBase } from '@mui/material';
import { Shift } from '../../types';

const StyledModal = styled(Modal)`
  padding-left: 14px;
  padding-right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalBox = styled.div`
  background: #ffffff;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px 50px 20px 78px;
  @media only screen and (min-width: 768px) {
    width: 660px;
    height: 226px;
  }
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

const Button = styled(ButtonBase)`
  border: none;
  background: none;
`;

type DeleteModalProps = {
  deleteOpen: boolean;
  setDeleteOpen: (val: boolean) => void;
  shiftId: string;
  allShiftData: Shift[];
  setAllShifts: (val: Shift[]) => void;
};

// future: may consider passing obj-to-delete infor or a delete function prop
export default function DeleteModal({
  deleteOpen,
  setDeleteOpen,
  shiftId,
  allShiftData,
  setAllShifts,
}: DeleteModalProps) {
  const deleteShift = async () => {
    await fetch(`http://localhost:3001/shifts/${shiftId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setAllShifts(allShiftData.filter((shift) => shift._id !== shiftId));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setDeleteOpen(false);
  };

  return (
    <StyledModal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <StyledModalBox>
        <StyledModalTitle>
          Are you sure you want to delete this shift?
        </StyledModalTitle>
        <Button onClick={() => deleteShift()}>
          <StyledModalText>Delete shift</StyledModalText>
        </Button>
        <br />
        <Button onClick={() => setDeleteOpen(false)}>
          <StyledModalText>Cancel</StyledModalText>
        </Button>
      </StyledModalBox>
    </StyledModal>
  );
}
