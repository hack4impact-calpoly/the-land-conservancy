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
import { Shift } from '../../types';

const StyledContainer = styled(Container)`
  border-radius: 7px;
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

// creates a row of data for a shift
function createData(
  _id: string,
  eventTitle: string,
  eventLocation: string,
  eventDate: string,
  hours: number,
  name: string
) {
  const date = new Date(eventDate).toLocaleDateString('en-US', {
    timeZone: 'UTC',
  });
  return { _id, eventTitle, eventLocation, date, hours, name };
}

type ShiftProps = {
  allShiftData: Shift[];
};

export default function VolunteerLog({ allShiftData }: ShiftProps) {
  allShiftData.sort((a: Shift, b: Shift) => {
    if (a.event.start > b.event.start) {
      return -1;
    }
    if (a.event.start < b.event.start) {
      return 1;
    }
    return 0;
  });

  // convert allShiftData to an array of rows that hold all atributes
  // on same level, this also formats the rows for exporting to csv correctly
  const rows = allShiftData.map((shift) => {
    return createData(
      shift._id,
      shift.event.title,
      shift.event.location,
      // convert shift date from string to Date type so we can print it nicely
      shift.event.start,
      shift.hours,
      shift.userName
    );
  });

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
                {allShiftData ? (
                  rows.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.eventTitle}</TableCell>
                      <TableCell>{row.eventLocation}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.hours}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <StyledEdit /> <StyledDelete />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p key="load"> Loading ...</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledContainer>
      </ThemeProvider>
    </Header>
  );
}
