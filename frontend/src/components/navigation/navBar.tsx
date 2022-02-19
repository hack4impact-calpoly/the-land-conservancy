import React, { useState } from 'react';
import Sidebar from 'react-sidebar';
import {
  BarIcon,
  ClipboardIcon,
  ClockIcon,
  PersonIcon,
  LogoutIcon,
  Button,
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
          <StyledLink to="/events">
            <Button>
              <ClipboardIcon />
              <Label>Log hours</Label>
            </Button>
          </StyledLink>
          <StyledLink to="/past-shifts">
            <Button>
              <ClockIcon />
              <Label>Past shifts</Label>
            </Button>
          </StyledLink>
          <StyledLink to="/">
            <Button>
              <PersonIcon />
              <Label>Profile</Label>
            </Button>
          </StyledLink>
          <StyledLink to="/">
            <Button>
              <LogoutIcon />
              <Label>Sign out</Label>
            </Button>
          </StyledLink>
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
