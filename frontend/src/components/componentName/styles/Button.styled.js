import styled from 'styled-components'

export const Button = styled.button`
  width: ${({ wid }) => wid};
  height: ${({ h }) => h};
  left: ${({ l }) => l};
  top: ${({ top }) => top};

  border: 2px solid #5f8f3e;
  box-sizing: border-box;
  border-radius: 12px;

  cursor: pointer;
  background: ${({ bc }) => bc};

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  text-align: center;

  color: ${({ c }) => c};
`

// width: 176.67px;
// height: 46.95px;
// left: 33px;
// top: 523px;
