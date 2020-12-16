import React, { useRef, useCallback, useContext } from 'react'
import { Container, Content, Background } from './styles'

import * as Yup from 'yup'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import Button from '../../components/Button/index'
import Input from '../../components/Input/index'
import getValidationErrors from '../../utils/getValidationErrors'

import { AuthContext } from '../../context/AuthContext'


interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { user, signIn } = useContext(AuthContext)

  console.log(user)

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({}) // precisa setar pq quando for sucesso ele n vai entrar no catch

      const schema = Yup.object().shape({ // os dados que quero validar serao um objeto, e terao esse formato (shape)
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'), // nao precisa do required, pq se tem que ter 6 digitos
        // no minimo, eh obvio que eh obrigatorio
      })

      await schema.validate(data, {
        abortEarly: false, // retorna todos erros, inves de retornar apenas o primeiro
      })

      signIn({
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      const errors = getValidationErrors(error)

      formRef.current?.setErrors(errors)
    }
  }, [signIn]) // colocar as variaveis externas nas dependencias


  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit} >
          <h1>Faça seu Logon</h1>
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login">
          <FiLogIn />
        Criar conta
      </a>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn