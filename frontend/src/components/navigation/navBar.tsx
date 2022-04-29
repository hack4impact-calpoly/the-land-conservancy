import React, { useState, useContext } from 'react';
import { useMatch } from 'react-router-dom';
import Sidebar from 'react-sidebar';
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
  EditPrizeIcon,
} from './navComponents';
import logo from '../../imgs/logo.png';
import userContext from '../../userContext';

type Props = {
  children: React.ReactChild;
};

export default function NavBar({ children }: Props) {
  const [navOpen, setNavOpen] = useState(false);
  const user = useContext(userContext);

  // TODO: possibly have the navBar say the name, or "Hello, {user.name}"

  return (
    <Sidebar
      sidebar={
        <div>
          <LogoImage src={logo} />
          {user.isAdmin ? (
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
              <StyledLink to="/edit-prizes">
                <Path active={!!useMatch('/edit-prizes')}>
                  <EditPrizeIcon />
                  <Label>Edit Prizes</Label>
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
          <StyledLink to="/">
            <BottomPath>
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
