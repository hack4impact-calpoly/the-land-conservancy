import styled from 'styled-components'

export const Flex = styled.div`
  display: flex;
  align-items: ${({ ai }) => ai};
  justify-content: space-between;
  flex-direction: ${({ dir }) => dir};
`

export const FlexContainer = styled.div`
  flex: ${({ flex }) => flex || '100%'};
  margin-bottom: auto;
  padding: ${({ pad }) => pad};
  text-align: ${({ ta }) => ta};
`
