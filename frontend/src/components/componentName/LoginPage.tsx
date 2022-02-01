import React, { useState } from 'react'
import { StyledImage } from './styles/Image.styled'
import { Flex, FlexContainer } from './styles/Flex.styled'
import { Button } from './styles/Button.styled'
import { Form } from './styles/Form.styled'
import logo from '../../imgs/logo.png'
import { StyledFake } from './styles/Link.styled'

export default function LoginPage () {
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState('')

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState('')

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

  const validateUsername = () => {
    if (username.length > 0) {
      console.log('Is valid')
      setValidUsername('')
    } else {
      console.log('Is not valid')
      setValidUsername('Please enter a username.')
    }
  }

  const validatePassword = () => {
    if (password.length > 0) {
      console.log('Password is valid')
      setValidPassword('')
    } else {
      console.log('Password is not valid')
      setValidPassword('Please enter a password.')
    }
  }

  const retrieveUser = () => {
    if (validUsername === '' && validPassword === '') {
      console.log(username)
      console.log(password)
    }
  }

  return (
    <Flex dir='column' ai='center'>
        <FlexContainer pad='40px'>
            <StyledImage src= {logo} alt='The Land Conservancy of SLO logo' maxW='173px' maxH='173px'/>
        </FlexContainer>
        <FlexContainer mb='-20px'>
            <Form>
                <Flex dir='column' ai='center'>
                    <FlexContainer>
                        <input type="email" placeholder="Email/Phone Number" name="uname" onChange={(e) => setUsername(e.target.value)} onBlur={validateUsername} required/>
                    </FlexContainer>
                    <FlexContainer>
                        <input type="password" placeholder="Password" name="passwd" onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} required/>
                    </FlexContainer>
                    <FlexContainer>
                        <Flex dir='row'>
                          <Button wid='176.67px' h='46.95px' l='33px' top='523px' c='#5F8F3E'> Create Account </Button>
                          <Button type="submit" wid='149.61px' h='47px' l='36px' top='371px' bc='#5F8F3E' c='#ffffff' onClick={retrieveUser}> Submit </Button>
                        </Flex>
                    </FlexContainer>
                </Flex>
            </Form>
        </FlexContainer>
        <FlexContainer>
          <StyledFake> Forgot password? </StyledFake>
        </FlexContainer>
    </Flex>
  )
}
