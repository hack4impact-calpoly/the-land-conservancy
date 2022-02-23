import React, { useState } from 'react';
import Sidebar from 'react-sidebar';
import {
  BarIcon,
  ClipboardIcon,
  ClockIcon,
  PersonIcon,
  LogoutIcon,
  Button,
  Path,
  Label,
  StyledLink,
} from './navComponents';

export default function NavBar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Sidebar
      sidebar={
        <div>
          <Button onClick={() => setNavOpen(false)}>
            <BarIcon />
          </Button>
          <Path>
            <ClipboardIcon />
            <StyledLink to="/events">
              <Label>Log hours</Label>
            </StyledLink>
          </Path>
          <Path>
            <ClockIcon />
            <StyledLink to="/past-shifts">
              <Label>Past shifts</Label>
            </StyledLink>
          </Path>
          <Path>
            <PersonIcon />
            <StyledLink to="/">
              <Label>Profile</Label>
            </StyledLink>
          </Path>
          <Path>
            <LogoutIcon />
            <StyledLink to="/">
              <Label>Sign out</Label>
            </StyledLink>
          </Path>
        </div>
      }
      open={navOpen}
      onSetOpen={setNavOpen}
      styles={{ sidebar: { background: '#D0CFCF', width: '277px' } }}
    >
      <Button onClick={() => setNavOpen(true)}>
        <BarIcon />
      </Button>
    </Sidebar>
  );
}
