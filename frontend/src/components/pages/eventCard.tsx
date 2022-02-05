import React from 'react';
import styled from 'styled-components';
import { Card } from '@mui/material';

const StyledCard = styled(Card)`
    border-radius: 6px;
    padding: 14px;
    padding-left: 25px;

    margin-bottom: 10px;
    text-align: left;
`;

const EventTitle = styled.p`
    font-weight: bold;
    font-size: 14px;
    color: black;
`;


type EventCardProps = {
    title: string,
    location: string
}

/*  for sime reason background color fo card would not chnage without inline css    */

export default function EventCard({
    title,
    location
}: EventCardProps) {
   
    return (
        <div>
            
            <StyledCard style={{backgroundColor: "#F1F1F1"}}>
                <EventTitle>{title}</EventTitle>
                <p>{location}</p>
            </StyledCard>
        </div>
    );
}
