import React from 'react'

import { Container, Content, Background } from './styles'
import { Form } from '@unform/web'

import logoImg from '../../assets/logo.svg'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'

import Button from '../../components/button/index'
import Input from '../../components/input/index'

const SignUp: React.FC = () => {
  function handleSubmit(data: object) {
    console.log(data);

  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="login">
          <FiArrowLeft />
        Voltar para logon
      </a>
      </Content>
    </Container>
  )
}

export default SignUp