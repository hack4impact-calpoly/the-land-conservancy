import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
`;

// TODO: once navbar get fixed, import header component from header.tsx
const StyledHeader = styled.h1`
  text-align: center;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
  color: #000000;
`;

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    fontSize: 16,
  },
});

const StyledEdit = styled(BiEdit)`
  font-size: 20px;
  cursor: pointer;
`;
const StyledDelete = styled(RiDeleteBin6Line)`
  font-size: 20px;
  cursor: pointer;
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
  createData(
    'John Appleseed',
    'Trash pickup at Pismo Preserve',
    '1/07/2022',
    6
  ),
  createData('John Appleseed', 'Event 1', '1/07/2022', 6),
  createData('Another Person', 'Event 1', '1/07/2022', 25),
  createData('John Appleseed', 'Event 1', '1/07/2022', 16),
  createData(
    'John Appleseed',
    'Very long event title that is long 1',
    '1/07/2022',
    6
  ),
];

export default function VolunteerLog() {
  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <StyledHeader> Volunteer Log </StyledHeader>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead sx={{ fontSize: '100px' }}>
              <TableRow sx={{ background: '#5F8F3E73' }}>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Event Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Hours</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.eventTitle}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.hours}</TableCell>
                  <TableCell>
                    <StyledEdit /> <StyledDelete />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledContainer>
    </ThemeProvider>
  );
}
