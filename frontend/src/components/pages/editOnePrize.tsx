import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../navigation/header";
import { Form, Input, Submit, Label } from "../styledComponents";
import { Prize } from "../../types";

const PORT = process.env.REACT_APP_API_URL;

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
};

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

export default function EditOnePrize({ setPrizes }: EditPrizeProps) {
  const [itemName, setItemName] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [file, setFile] = useState<File>();
  const { prizeId } = useParams();
  const navigate = useNavigate();

  const handleChange = (event: File) => {
    if (event) {
      setFile(event);
    }
  };

  const addToPrize = async (item: string, sponsor: string) => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    // create FormData object
    const formData = new FormData();
    formData.append("file", file);

    try {
      // upload image to s3 bucket
      const response1 = await fetch(`${PORT}/prizes/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response1.text();
      const imageURL = data; // get image key from S3 response
      // only pass in fields that have been filled out
      const prizeToAdd: { [k: string]: string | undefined } = {};
      if (item !== "") {
        prizeToAdd.itemName = item;
      }
      if (sponsor !== "") {
        prizeToAdd.sponsorName = sponsor;
      }
      if (imageURL !== "") {
        prizeToAdd.sponsorImage = imageURL;
      }

      // post to backend
      const response = await fetch(`${PORT}/prizes/${prizeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prizeToAdd),
      });
      const newPrize = await response.json();
      // set updated prizes on the frontend
      setPrizes((prev) =>
        prev.map((prize) => (prize._id === newPrize._id ? newPrize : prize))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Header headerText="Edit Prize" back="/edit-prizes">
      <StyledContainer maxWidth="sm">
        <StyledHours>{prizeId} hours</StyledHours>
        <div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addToPrize(itemName, sponsorName).then(() =>
                navigate("/edit-prizes")
              );
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
            <Label htmlFor="sponsorImg">Sponsor Image</Label>
            <FileUploader
              multiple={false}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
            <Submit type="submit" value="Save Changes" />
          </Form>
        </div>
        <div />
      </StyledContainer>
    </Header>
  );
}
