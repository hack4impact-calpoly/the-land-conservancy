import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const StyledContainer = styled(Container)`
  border radius: 7px;
  margin: 5px;
  padding: 10px;
  font-family: Poppins;

`;

const StyledHeader = styled.h1`
  text-align: center;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
  color: #000000;
`;

function createData(
  name: string,
  eventTitle: string,
  date: string,
  hours: number
) {
  return { name, eventTitle, date, hours };
}

const rows = [
  createData('John Appleseed', 'Event 1', '1/07/2022', 6),
  createData('John Appleseed', 'Event 1', '1/07/2022', 6),
  createData('John Appleseed', 'Event 1', '1/07/2022', 6),
  createData('John Appleseed', 'Event 1', '1/07/2022', 6),
  createData('John Appleseed', 'Event 1', '1/07/2022', 6),
];

export default function VolunteerLog() {
  return (
    <div>
      <StyledContainer>
        <StyledHeader> Volunteer Log </StyledHeader>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ fontSize: '81' }}>
              <TableRow sx={{ background: '#5F8F3E73' }}>
                <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  Name
                </TableCell>
                <TableCell
                  sx={{ fontFamily: 'Poppins', fontWeight: 500 }}
                  align="right"
                >
                  Event Title
                </TableCell>
                <TableCell
                  sx={{ fontFamily: 'Poppins', fontWeight: 500 }}
                  align="right"
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{ fontFamily: 'Poppins', fontWeight: 500 }}
                  align="right"
                >
                  Hours
                </TableCell>
                <TableCell
                  sx={{ fontFamily: 'Poppins', fontWeight: 500 }}
                  align="right"
                >
                  Options
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    sx={{ fontFamily: 'Poppins' }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins' }} align="right">
                    {row.eventTitle}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins' }} align="right">
                    {row.date}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins' }} align="right">
                    {row.hours}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins' }} align="right">
                    <BiEdit /> <RiDeleteBin6Line />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledContainer>
    </div>
  );
}
