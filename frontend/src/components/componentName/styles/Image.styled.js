import styled from 'styled-components'

export const StyledImage = styled.img`
  height: auto;
  width: auto;
  max-width: ${({ maxW }) => maxW};
  max-height: ${({ maxH }) => maxH};
`
