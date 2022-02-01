import styled from 'styled-components'

export const Flex = styled.div`
  display: flex;
  align-items: ${({ ai }) => ai};
  justify-content: space-between;
  flex-direction: ${({ dir }) => dir};
`

export const FlexContainer = styled.div`
  flex: ${({ flex }) => flex || '100%'};
  width: 347px;
  margin-bottom: ${({ mb }) => mb || '10px'};
  padding: ${({ pad }) => pad || '0px'};
  text-align: ${({ ta }) => ta};
`
