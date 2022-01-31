import React from 'react'
import { StyledImage } from './styles/Image.styled'
import { Flex, FlexContainer } from './styles/Flex.styled'
import { Button } from './styles/Button.styled'
import { Form } from './styles/Form.styled'
import logo from '../../imgs/logo.png'
import { Input } from '@mui/material'
// import { Link } from "react-router-dom";

export default function LoginPage () {
  // const [username, setUsername] = useState('')

  // const [password, setPassword] = useState('')

  //   const getUsername = () => {
  //       setUsername()
  //   }

  // onChange for ingredients update field (passed into the recipeInput component)
  //   const ingredientOnChange = (e: { target: { value: React.SetStateAction<string> } }) => {
  //     setNewIngredient(e.target.value)
  //   }

  //   // onChange for instructions update field (passed into the recipeInput component)
  //   const instructionOnChange = (e: { target: { value: React.SetStateAction<string> } }) => {
  //     setNewInstruction(e.target.value)
  //   }

  return (
    <Flex dir='column' ai='center'>
        <FlexContainer pad='50px'>
            <StyledImage src= {logo} alt='The Land Conservancy of SLO logo' maxW='173px' maxH='173px'/>
        </FlexContainer>
        <FlexContainer>
            <Form action="login.php" method="post">
                <Input type="email" defaultValue="Email/Phone Number" name="uname" required/>
                <Input type="password" defaultValue="Password" name="passwd" required/>
                <Flex>
                    <Button wid='176.67px' h='46.95px' l='33px' top='523px' c='#5F8F3E'> Create Account </Button>
                    <Button type="submit" wid='149.61px' h='47px' l='36px' top='371px' bc='#5F8F3E' c='#ffffff' > Submit </Button>
                </Flex>
            </Form>
        </FlexContainer>
        <FlexContainer>
            <Flex ai='flex-end'>
                <p> Forgot password? </p>
            </Flex>
        </FlexContainer>
    </Flex>
  )
}
