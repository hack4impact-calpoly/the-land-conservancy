import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Header from '../navigation/header';

const StyledContainer = styled(Container)`
  border radius: 7px;
  margin: 5px;
  padding: 10px;
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
  _id: string,
  name: string,
  eventTitle: string,
  date: string,
  hours: number
) {
  return { _id, name, eventTitle, date, hours };
}

const rows = [
  createData(
    '001',
    'John Appleseed',
    'Trash pickup at Pismo Preserve',
    '1/07/2022',
    6
  ),
  createData('002', 'John Appleseed', 'Event 1', '1/07/2022', 6),
  createData('003', 'Another Person', 'Event 1', '1/07/2022', 25),
  createData('004', 'John Appleseed', 'Event 1', '1/07/2022', 16),
  createData(
    '005',
    'John Appleseed',
    'Very long event title that is long 1',
    '1/07/2022',
    6
  ),
];

export default function VolunteerLog() {
  return (
    <Header headerText="Volunteer Log" navbar>
      <ThemeProvider theme={theme}>
        <StyledContainer>
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
                    key={row._id}
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
    </Header>
  );
}
