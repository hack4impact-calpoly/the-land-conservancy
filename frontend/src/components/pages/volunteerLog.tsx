import React from 'react';
import styled from 'styled-components';
import { ExportToCsv } from 'export-to-csv-fix-source-map';

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
import { Submit } from '../styledComponents';
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

const Form = styled.form`
  float: right;
`;

const Export = styled(Submit)`
  box-sizing: border-box;
  min-width: 0;
  padding: 0 10px 0 10px;
`;

function createData(
  _id: string,
  eventTitle: string,
  eventLocation: string,
  date: string,
  hours: number,
  name: string
) {
  return { _id, eventTitle, eventLocation, date, hours, name };
}

const rows = [
  createData(
    '001',
    'Trash pickup at Pismo Preserve',
    '100 Pie Street',
    '1/07/2022',
    6,
    'John Appleseed'
  ),
  createData(
    '002',
    'Event 1',
    '100 Pie Street',
    '1/07/2022',
    6,
    'John Appleseed'
  ),
  createData(
    '003',
    'Event 1',
    '100 Pie Street',
    '1/07/2022',
    35,
    'John Appleseed'
  ),
  createData(
    '004',
    'Event 1',
    '100 Pie Street',
    '1/07/2022',
    10,
    'John Appleseed'
  ),
  createData(
    '005',
    'Very long event title that is long 1',
    '100 Pie Street',
    '1/07/2022',
    6,
    'John Appleseed'
  ),
];

const options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: true,
  title: 'Volunteer Log Test Data', // we can remove this from csv
  filename: 'volunteer_totals', // title of downloaded csv
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: false,
  headers: ['id', 'Event Title', 'Location', 'Date', 'Hours', 'Name'],
};

const csvExporter = new ExportToCsv(options);

export default function VolunteerLog() {
  return (
    <Header headerText="Volunteer Log" navbar>
      <ThemeProvider theme={theme}>
        <StyledContainer>
          <Form
            id="form"
            onSubmit={(e) => {
              e.preventDefault();
              csvExporter.generateCsv(rows);
            }}
          >
            <Export type="submit" value="Export" />
          </Form>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead sx={{ fontSize: '100px' }}>
                <TableRow sx={{ background: '#5F8F3E73' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Event Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Event Location</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Hours</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.eventTitle}
                    </TableCell>
                    <TableCell>{row.eventLocation}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.hours}</TableCell>
                    <TableCell>{row.name}</TableCell>
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
