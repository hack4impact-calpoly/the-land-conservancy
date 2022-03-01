import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, ButtonBase } from '@mui/material';
import { IoTrashOutline } from 'react-icons/io5';
import { HiOutlinePencilAlt } from 'react-icons/hi';

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

const TrashIcon = styled(IoTrashOutline)`
  text-align: right;
  color: black;
  font-size: 25px;
  display: block;
  cursor: pointer;
`;

const PencilIcon = styled(HiOutlinePencilAlt)`
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
    height: 100%;
    width: 60px;
  }
`;

// future: may consider passing obj-to-delete infor or a delete function prop
export default function DeleteModal() {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <ButtonsDiv>
        <Button>
          <PencilIcon />
        </Button>
        <Button onClick={() => setDeleteOpen(true)}>
          <TrashIcon />
        </Button>
      </ButtonsDiv>
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
    </>
  );
}
