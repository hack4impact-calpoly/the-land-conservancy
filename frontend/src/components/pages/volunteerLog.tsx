import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { Submit } from '../styledComponents';
import Header from '../navigation/header';
import { Shift } from '../../types';
import DeleteModal from './deleteModal';

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

const Select = styled.select`
  display: block;
  box-sizing: border-box;

  width: 165px;
  height: 40px;
  left: 0px;
  top: 0px;
  padding: 5px;

  border: 1px solid #c1c1c1;
`;

const Flex = styled.div.attrs((props: { dir: string }) => props)`
  display: flex;
  align-items: left;
  justify-content: space-between;
  flex-direction: ${({ dir }) => dir};
`;

const BlackLink = styled(Link)`
  color: #000000;
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
  showTitle: false,
  title: 'Volunteer Log Test Data', // we can remove this from csv
  filename: 'volunteer_totals', // title of downloaded csv
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: false,
  headers: ['Event Title', 'Location', 'Date', 'Hours', 'Name'],
};

const csvExporter = new ExportToCsv(options);

// creates a row of data for the volunteer log table
// this does not affect the csv export file
function createData(
  _id: string,
  eventId: string,
  eventTitle: string,
  eventLocation: string,
  eventDate: string,
  hours: number,
  user: string,
  name: string
) {
  const date = new Date(eventDate).toLocaleDateString('en-US', {
    timeZone: 'UTC',
  });
  return { _id, eventId, eventTitle, eventLocation, date, hours, user, name };
}

// creates a row of data for the csv file
// DO NOT TOUCH unless you want to edit the csv export format
function createCsvRow(
  eventTitle: string,
  eventLocation: string,
  eventDate: string,
  hours: number,
  name: string
) {
  const date = new Date(eventDate).toLocaleDateString('en-US', {
    timeZone: 'UTC',
  });
  return { eventTitle, eventLocation, date, hours, name };
}
const monthOptions = [
  { label: 'Sort by month', value: '', key: 0 },
  { label: 'January', value: '1', key: 1 },
  { label: 'February', value: '2', key: 2 },
  { label: 'March', value: '3', key: 3 },
  { label: 'April', value: '4', key: 4 },
  { label: 'May', value: '5', key: 5 },
  { label: 'June', value: '6', key: 6 },
  { label: 'July', value: '7', key: 7 },
  { label: 'August', value: '8', key: 8 },
  { label: 'September', value: '9', key: 9 },
  { label: 'October', value: '10', key: 10 },
  { label: 'November', value: '11', key: 11 },
  { label: 'December', value: '12', key: 12 },
];

const yearOptions: { label: string; value: string; key: number }[] = [
  { label: 'Sort by year', value: '', key: 0 },
];
for (let i = 2000; i < 2050; i += 1) {
  yearOptions.push({ label: i.toString(), value: i.toString(), key: i });
}

type ShiftProps = {
  allShiftData: Shift[];
  setAllShifts: (val: (prev: Shift[]) => Shift[]) => void;
};

export default function VolunteerLog({
  allShiftData,
  setAllShifts,
}: ShiftProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [shiftId, setShift] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  allShiftData.sort((a: Shift, b: Shift) => {
    if (a.event.start > b.event.start) {
      return -1;
    }
    if (a.event.start < b.event.start) {
      return 1;
    }
    return 0;
  });

  const setDeleteStates = (id: string) => {
    setDeleteOpen(true);
    setShift(id);
  };

  // convert allShiftData to an array of rows that hold all atributes
  // on same level, this also formats the rows for exporting to csv correctly
  const rows = allShiftData.map((shift) => {
    return createData(
      shift._id,
      shift.event._id,
      shift.event.title,
      shift.event.location,
      // convert shift date from string to Date type so we can print it nicely
      shift.event.start,
      shift.hours,
      shift.user,
      shift.userName
    );
  });

  const csvRows = allShiftData.map((shift) => {
    return createCsvRow(
      shift.event.title,
      shift.event.location,
      // convert shift date from string to Date type so we can print it nicely
      shift.event.start,
      shift.hours,
      shift.userName
    );
  });

  useEffect(() => {
    console.log('year = ', year);
  }, [year]);

  useEffect(() => {
    console.log('month = ', month);
  }, [month]);

  return (
    <Header headerText="Volunteer Log" navbar>
      <ThemeProvider theme={theme}>
        <StyledContainer>
          <StyledContainer>
            <Flex>
              <Flex>
                <Select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {monthOptions.map((option) => (
                    <option value={option.value} key={option.key}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <Select value={year} onChange={(e) => setYear(e.target.value)}>
                  {yearOptions.map((option) => (
                    <option value={option.value} key={option.key}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Form
                id="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  csvExporter.generateCsv(csvRows);
                }}
              >
                <Export type="submit" value="Export" />
              </Form>
            </Flex>
          </StyledContainer>

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
                  rows
                    .filter((row) =>
                      year !== ''
                        ? row.date.substring(row.date.length - 4) === year
                        : row
                    )
                    .filter((row) =>
                      month !== ''
                        ? row.date.substring(0, row.date.indexOf('/')) === month
                        : row
                    )
                    .map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>{row.eventTitle}</TableCell>
                        <TableCell>{row.eventLocation}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.hours}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>
                          <BlackLink
                            to={`/log-hours/${row.eventId}?editing=true`}
                            state={{
                              user: { _id: row.user },
                              oldHours: row.hours,
                              shiftId: row._id,
                            }}
                          >
                            <StyledEdit />
                          </BlackLink>
                          <StyledDelete
                            onClick={() => setDeleteStates(row._id)}
                          />
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
        <DeleteModal
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          itemId={shiftId}
          setAllShifts={setAllShifts}
          isShifts
        />
      </ThemeProvider>
    </Header>
  );
}
