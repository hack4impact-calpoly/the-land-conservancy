import styled from 'styled-components'
// import { FormControl } from '@mui/material'

export const Form = styled.form`
  input[type='button'],
  input[type='submit'],
  input[type='reset'] {
    width: 149.61px;
    height: 46.95px;

    background: #000;
    border-radius: 12px;
    cursor: pointer;
  }
  input[type='text'],
  input[type='password'],
  input[type='email'] {
    width: 347px;
    height: 47px;
    
    // margin-bottom: 10px;

    border: 1px solid #8f8f8f;
    box-sizing: border-box;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
  }
`
