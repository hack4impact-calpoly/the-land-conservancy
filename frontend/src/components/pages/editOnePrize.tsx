import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from '../navigation/header';
import { Form, Input, Submit, Label } from '../styledComponents';
import { Prize } from '../../types';

const StyledContainer = styled(Container)`
  margin: 5px;
  padding: 20px;
  text-align: left;
`;

const StyledHours = styled.p`
  font-size: 30px;
  color: #5f8f3e;
  font-weight: bold;
  margin-bottom: 40px;
`;

type EditPrizeProps = {
  setPrizes: (val: (prev: Prize[]) => Prize[]) => void;
  PORT: string;
};

export default function EditOnePrize({ setPrizes, PORT }: EditPrizeProps) {
  const [itemName, setItemName] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorImg, setSponsorImg] = useState('');
  const { prizeId } = useParams();
  const navigate = useNavigate();

  const submitEdits = () => {
    console.log(itemName);
    console.log(sponsorName);
    console.log(sponsorImg);
  };

  const addToPrize = async (iName: string, sName: string, sUrl: string) => {
    await fetch(`http://localhost:3001/prizes/${prizeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemName: iName,
        sponsorName: sName,
        sponsorImage: sUrl,
      }),
    });
  };

  const loadPrizes = async () => {
    await fetch(`${PORT}/prizes`)
      .then((res) => res.json())
      .then((data) => {
        setPrizes(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Header headerText="Edit Prize" back="/edit-prizes">
      <StyledContainer maxWidth="sm">
        <StyledHours>{prizeId} hours</StyledHours>
        <div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitEdits();
              addToPrize(itemName, sponsorName, sponsorImg)
                .then(loadPrizes)
                .then(() => navigate('/edit-prizes'));
            }}
          >
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              type="text"
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item Name"
              value={itemName}
            />
            <Label htmlFor="sponsorName">Sponsor Name</Label>
            <Input
              id="sponsorName"
              type="text"
              onChange={(e) => setSponsorName(e.target.value)}
              placeholder="Sponsor Name"
              value={sponsorName}
            />
            <Label htmlFor="sponsorImg">Sponsor Image URL</Label>
            <Input
              id="SponsorImg"
              type="text"
              onChange={(e) => setSponsorImg(e.target.value)}
              placeholder="url"
              value={sponsorImg}
            />
            <Submit type="submit" value="Save Changes" />
          </Form>
        </div>
        <div />
      </StyledContainer>
    </Header>
  );
}
