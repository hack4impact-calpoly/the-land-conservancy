import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Container, Autocomplete, TextField, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import EventDesc from './eventDesc';
import Header from '../navigation/header';
import { Input, Label, Submit } from '../styledComponents';
import { Event, Shift, User } from '../../types';
import UserContext from '../../userContext';

const PORT = process.env.REACT_APP_API_URL;

const theme = createTheme({
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          '& fieldset': {
            borderRadius: '10px',
            boxSizing: 'border-box',
            border: '1px solid #c4c4c4',
            paddingLeft: '10px',
          },
          margin: '5px 0 20px 0',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Poppins',
    fontSize: 16,
  },
});

const StyledContainer = styled(Container)`
  margin: 5px;
  padding: 10px;
`;

const StyledInput = styled(Input)`
  height: 40px;
  max-width: 100px;
`;

const StyledLabel = styled(Label)`
  display: block;
  text-align: left;
`;

const Feedback = styled.div`
  display: block;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: red;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Email = styled.div`
  font-size: 0.85rem;
`;

type LogHoursProps = {
  eventData: Event[];
  setPastShifts: (val: (prev: Shift[]) => Shift[]) => void;
  setAllShifts: (val: (prev: Shift[]) => Shift[]) => void;
  allUsers: User[];
};

type AutoCompleteProps = {
  setVolunteer: (val: User) => void;
  allUsers: User[];
};

const convertDate = (date: string) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const reformat = new Date(date);

  return `${days[reformat.getUTCDay()]} ${reformat.toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'short',
    timeStyle: 'short',
  })}`;
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

interface LocationState {
  user: User;
  oldHours: string;
  shiftId: string;
}

function UserSelect({ setVolunteer, allUsers }: AutoCompleteProps) {
  const editing = useQuery().get('editing');
  const location = useLocation();
  let user = null;
  if (location.state) {
    user = allUsers.find((u) => {
      return u._id === (location.state as LocationState).user._id;
    });
  }
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        id="country-select-demo"
        sx={{ maxWidth: 400 }}
        options={allUsers}
        defaultValue={user || null}
        disabled={editing === 'true'}
        onChange={(_e, value) => setVolunteer(value || ({} as User))}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option._id}>
            <NameBox>
              {option.name}
              <Email>({option.email})</Email>
            </NameBox>
          </Box>
        )}
        renderInput={(params) => (
          <StyledLabel htmlFor="volunteerName">
            Volunteer name
            <TextField
              {...params}
              size="small"
              variant="outlined"
              required
              inputProps={{
                ...params.inputProps,
                autoComplete: 'off', // disable autocomplete and autofill
              }}
            />
          </StyledLabel>
        )}
      />
    </ThemeProvider>
  );
}

export default function LogHours({
  eventData,
  setPastShifts,
  setAllShifts,
  allUsers,
}: LogHoursProps) {
  const { currentUser } = useContext(UserContext);
  const [valid, setValid] = React.useState(' ');
  const [submit, setSubmit] = React.useState(' ');
  const [volunteer, setVolunteer] = React.useState({} as User);

  const [link, setLink] = React.useState(' ');
  const { eventId } = useParams();
  const editing = useQuery().get('editing');
  const location = useLocation();
  const navigate = useNavigate();

  // if admin, submit for entered user, else submit for this user
  let submittingUser = currentUser.isAdmin ? volunteer : currentUser;
  let oldHours = null;
  let shiftId: string | null = null;
  if (location.state) {
    const user = allUsers.find((u) => {
      return u._id === (location.state as LocationState).user._id;
    });
    if (user) {
      submittingUser = user;
    }
    oldHours = (location.state as LocationState).oldHours;
    shiftId = (location.state as LocationState).shiftId;
  }
  const [hours, setHours] = React.useState(oldHours || '');

  const thisEvent = eventData.find((event) => {
    return event._id === eventId;
  });

  // data to pass to thank-you page
  const shiftData = {
    title: thisEvent?.title,
    date: thisEvent?.start,
    hours,
  };

  const addToUser = async (id: string) => {
    await fetch(`${PORT}/users/${submittingUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shiftId: id,
        numHours: hours,
      }),
    });
  };

  const addToEvent = async (id: string) => {
    await fetch(`${PORT}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shiftId: id }),
    });
  };

  const addShift = async () => {
    const shift = {
      event: eventId,
      hours,
      user: submittingUser._id,
      userName: submittingUser.name,
    };

    console.log(shift);

    await fetch(`${PORT}/shifts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shift),
    })
      .then((res) => res.json())
      .then((data) => {
        const id = data._id;
        addToUser(id);
        addToEvent(id);
        if (currentUser._id === submittingUser._id) {
          // update pastShifts for /past-shifts page
          setPastShifts((prev: Shift[]) => [...prev, data]);
        }
        // (if admin) update allShifts for the volunteer log
        setAllShifts((prev: Shift[]) => [...prev, data]);
      })
      .then(() => {
        navigate('/thank-you', { state: shiftData });
      })
      .catch((err) => console.log(err));
  };

  const editShift = async () => {
    const newShiftHours = {
      hours,
    };

    await fetch(`${PORT}/shifts/${shiftId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newShiftHours),
    })
      .then((res) => res.json())
      .then((updatedShift) => {
        if (currentUser._id === submittingUser._id) {
          // update pastShifts for /past-shifts page
          setPastShifts((prev) => {
            return prev.map((shift) =>
              shift._id === updatedShift._id ? updatedShift : shift
            );
          });
        }
        // (if admin) update allShifts for the volunteer log
        setAllShifts((prev) => {
          return prev.map((shift) =>
            shift._id === updatedShift._id ? updatedShift : shift
          );
        });
      })
      .catch((err) => console.log(err));
  };

  const validateHours = () => {
    // check: filled, isNumber, is > 0
    if (hours && (Number.isNaN(hours) || !(+hours > 0))) {
      console.log('invalid input');
      setValid('Please enter a positive number of hours');
    } else {
      setValid(' ');
    }
  };

  const submitHours = () => {
    if (valid === ' ') {
      setSubmit('Hours have been submitted.');
      setLink('View your updated history here.');
      setHours('');
      return true;
    } // else
    setSubmit(' ');
    setLink(' ');
    return false;
  };

  useEffect(() => {
    validateHours();
  }, [hours]);

  return (
    <Header headerText="Log Hours">
      <StyledContainer maxWidth="sm">
        {thisEvent ? (
          <EventDesc
            key={thisEvent._id}
            title={thisEvent.title}
            start={convertDate(thisEvent.start)}
            end={convertDate(thisEvent.end)}
            location={thisEvent.location}
            notes={thisEvent.notes}
          />
        ) : (
          'Loading...'
        )}

        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (submitHours()) {
              if (editing) {
                editShift();
              } else {
                addShift();
              }
            }
          }}
        >
          {currentUser.isAdmin ? (
            <UserSelect allUsers={allUsers} setVolunteer={setVolunteer} />
          ) : (
            <div />
          )}

          <StyledLabel htmlFor="hours">Total hours volunteered</StyledLabel>
          {thisEvent ? (
            <StyledInput
              id="hours"
              type="number"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              disabled={new Date(thisEvent.start) > new Date()}
              required
            />
          ) : (
            <div />
          )}

          <Feedback>{valid}</Feedback>
          {thisEvent ? (
            <Submit
              type="submit"
              value={editing ? 'Update hours' : 'Submit'}
              disabled={new Date(thisEvent.start) > new Date()}
            />
          ) : (
            <div />
          )}
          <p>{submit}</p>
          <Link to={currentUser.isAdmin ? '/volunteer-log' : '/past-shifts'}>
            {link}
          </Link>
        </form>
      </StyledContainer>
    </Header>
  );
}
