import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { GiBackwardTime } from 'react-icons/gi';
import { MdLogout } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BarIcon = styled(FaBars)`
  margin-top: 15px;
  color: black;
  text-align: left;
  display: block;
  font-size: 25px;
  cursor: pointer;
`;

const ClipboardIcon = styled(HiOutlineClipboardList)`
  color: white;
  text-align: left;
  display: block;
  font-size: 50px;
  display: inline-block;
`;

const ClockIcon = styled(GiBackwardTime)`
  color: white;
  text-align: left;
  display: block;
  font-size: 50px;
`;

const AddIcon = styled(IoMdAddCircleOutline)`
  color: white;
  text-align: left;
  display: block;
  font-size: 50px;
  display: inline-block;
`;

const CalendarIcon = styled(FiCalendar)`
  color: white;
  text-align: left;
  display: block;
  font-size: 50px;
  display: inline-block;
`;

const LogoutIcon = styled(MdLogout)`
  color: white;
  text-align: left;
  display: block;
  font-size: 50px;
`;

const Button = styled.button`
  border: none;
  background: none;
  text-align: left;
  display: flex;
  position: absolute;
  left: 30px;
  top: 15px;
`;

interface Props {
  active: boolean | null;
}

const Path = styled.div<Props>`
  border: none;
  sizing-border-box;
  background-color: ${(props: Props) =>
    props.active ? '#aec29b' : 'transparent'}; 
  display: flex;
  padding-left: 29px;
  align-items: center;
  height: 70px;
`;

const BottomPath = styled.div`
  border: none;
  sizing-border-box;
  background: none;
  display: flex;
  padding-left: 29px;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 70px;
  padding-bottom: 20px;
`;

const Label = styled.h3`
  font-family: Poppins;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
  color: white;
  padding-left: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LogoImage = styled.img`
  padding-top: 50px;
  padding-bottom: 50px;
  width: 113px;
  height: 113px;
`;

export {
  BarIcon,
  ClipboardIcon,
  ClockIcon,
  AddIcon,
  CalendarIcon,
  LogoutIcon,
  Button,
  Path,
  BottomPath,
  Label,
  StyledLink,
  LogoImage,
};
