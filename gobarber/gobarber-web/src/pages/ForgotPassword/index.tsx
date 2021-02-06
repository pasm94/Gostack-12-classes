import React, { useRef, useCallback, useState } from 'react'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Container, Content, Background, AnimationContainer } from './styles'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button/index'
import Input from '../../components/Input/index'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/toast'
import api from '../../services/api'


interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true)

      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      // recuperacao de senha
      await api.post('/password/forgot', {
        email: data.email
      })

      addToast({
        type: 'success',
        title: 'E-mail de recuperação enviado',
        description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
      })
      // history.push('/dashboard')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao tentar recuperar senha',
      })
    } finally {
      setLoading(false)
    }
  }, [addToast]) // colocar as variaveis externas nas dependencias

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit} >
            <h1>Recuperar senha</h1>
            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
            <Button loading={loading} type="submit">Recuperar</Button>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ForgotPassword