import React from 'react'
import { Container, Content, Background } from './styles'

import logoImg from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'

const SigIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form >
        <h1>Faça seu Logon</h1>
        <input type="text" placeholder="E-mail" />

        <input type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>

        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="login">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
)

export default SigIn