import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { GiBackwardTime } from 'react-icons/gi';
import { BsPerson } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';

const BarIcon = styled(FaBars)`
  margin-top: 15px;
  color: black;
  text-align: left;
  display: block;
  font-size: 25px;
`;

const ClipboardIcon = styled(HiOutlineClipboardList)`
  margin-top: 17px;
  color: black;
  text-align: left;
  display: block;
  font-size: 25px;
`;

const ClockIcon = styled(GiBackwardTime)`
  margin-top: 17px;
  color: black;
  text-align: left;
  display: block;
  font-size: 25px;
`;

const PersonIcon = styled(BsPerson)`
  margin-top: 17px;
  color: black;
  text-align: left;
  display: block;
  font-size: 25px;
`;

const LogoutIcon = styled(MdLogout)`
  margin-top: 17px;
  color: black;
  text-align: left;
  display: block;
  font-size: 25px;
`;

const Button = styled.button`
  border: none;
  background: none;
  text-align: left;
  display: flex;
  margin-left: 29px;
  margin-top: 15px;
`;

const Path = styled.div`
  border: none;
  sizing-border-box;
  background: none;
  text-align: left;
  display: flex;
  margin-left: 29px;
  margin-top: 15px;
`;

const Label = styled.h3`
  font-family: Poppins;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  text-align: center;

  color: #000000;
`;

const StyledLink = styled(Link)`
  padding: 0 40px 0 40px;
  text-decoration: none;
`;

export {
  BarIcon,
  ClipboardIcon,
  ClockIcon,
  PersonIcon,
  LogoutIcon,
  Button,
  Path,
  Label,
  StyledLink,
};
