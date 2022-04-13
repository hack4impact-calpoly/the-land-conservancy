import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import {
  BarIcon,
  ClipboardIcon,
  ClockIcon,
  LogoutIcon,
  Button,
  Path,
  BottomPath,
  Label,
  StyledLink,
  LogoImage,
} from './navComponents';
import logo from '../../imgs/logo.png';

type Props = {
  children: React.ReactChild;
};

export default function NavBar({ children }: Props) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Sidebar
      sidebar={
        <div>
          <LogoImage src={logo} />
          <StyledLink to="/events">
            <Path active={!!useMatch('/events')}>
              <ClipboardIcon />
              <Label>Log hours</Label>
            </Path>
          </StyledLink>
          <StyledLink to="/past-shifts">
            <Path active={!!useMatch('/past-shifts')}>
              <ClockIcon />
              <Label>Past shifts</Label>
            </Path>
          </StyledLink>
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
