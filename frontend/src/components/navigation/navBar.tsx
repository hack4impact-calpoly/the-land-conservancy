import React, { useState, useContext } from 'react';
import { useMatch } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import { Auth } from 'aws-amplify';
import {
  BarIcon,
  ClipboardIcon,
  ClockIcon,
  LogoutIcon,
  AddIcon,
  CalendarIcon,
  Button,
  Path,
  BottomPath,
  Label,
  StyledLink,
  LogoImage,
} from './navComponents';
import logo from '../../imgs/logo.png';
import userContext from '../../userContext';
import { User } from '../../types';

type Props = {
  setCurrentUser: (user: User) => void;
  children: React.ReactChild;
};

export default function NavBar({ children, setCurrentUser }: Props) {
  const [navOpen, setNavOpen] = useState(false);
  const isAdmin = useContext(userContext);

  const signUserOut = async () => {
    try {
      await Auth.signOut();
      console.log('attempting user sign out');
      setCurrentUser({});
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <Sidebar
      sidebar={
        <div>
          <LogoImage src={logo} />
          {isAdmin ? (
            <div>
              <StyledLink to="/create-event">
                <Path active={!!useMatch('/create-event')}>
                  <AddIcon />
                  <Label>Create event</Label>
                </Path>
              </StyledLink>
              <StyledLink to="/events">
                <Path active={!!useMatch('/events')}>
                  <CalendarIcon />
                  <Label>Events</Label>
                </Path>
              </StyledLink>
              <StyledLink to="/volunteer-log">
                <Path active={!!useMatch('/volunteer-log')}>
                  <ClipboardIcon />
                  <Label>Volunteer log</Label>
                </Path>
              </StyledLink>
              <StyledLink to="/progress-bar">
                <Path active={!!useMatch('/progress-bar')}>
                  <ClipboardIcon />
                  <Label>Progress bar</Label>
                </Path>
              </StyledLink>
            </div>
          ) : (
            <div>
              <StyledLink to="/events">
                <Path active={!!useMatch('/events')}>
                  <ClipboardIcon />
                  <Label>Events</Label>
                </Path>
              </StyledLink>
              <StyledLink to="/past-shifts">
                <Path active={!!useMatch('/past-shifts')}>
                  <ClockIcon />
                  <Label>Past shifts</Label>
                </Path>
              </StyledLink>
            </div>
          )}
          <StyledLink to="/login">
            <BottomPath onClick={() => signUserOut()}>
              <LogoutIcon />
              <Label>Sign out</Label>
            </BottomPath>
          </StyledLink>
        </div>
      }
      open={navOpen}
      onSetOpen={setNavOpen}
      styles={{
        sidebar: { background: '#8ea974', width: '250px' },
      }}
    >
      <Button onClick={() => setNavOpen(true)}>
        <BarIcon />
      </Button>
      {children}
    </Sidebar>
  );
}
