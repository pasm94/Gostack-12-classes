import React from 'react'
import { Image } from 'react-native'

import { Container, Title } from './styles'
import logoImg from '../../assets/logo.png' // @2x e @3x eh a questao de densidade de pixel (o dispositivo escolhe o certo)

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>
    </Container>
  )
}

export default SignIn
