import React, { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import { Container, Content, AvatarInput } from './styles'
import getValidationErrors from '../../utils/getValidationErrors'
import Button from '../../components/Button/index'
import Input from '../../components/Input/index'
import { useToast } from '../../hooks/toast'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const { user } = useAuth()

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({}) // precisa setar pq quando for sucesso ele n vai entrar no catch


      const schema = Yup.object().shape({ // os dados que quero validar serao um objeto, e terao esse formato (shape)
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'), // nao precisa do required, pq se tem que ter 6 digitos
        // no minimo, eh obvio que eh obrigatorio
      })

      await schema.validate(data, {
        abortEarly: false, // retorna todos erros, inves de retornar apenas o primeiro
      })

      await api.post('users', data)

      history.push('/')

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon no GoBarber!'
      })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente!',
      })
    }
  }, [addToast, history]) // colocar as variaveis externas nas dependencias

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}>

          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

          <Input name="old_password" icon={FiLock} type="password" placeholder="Senha atual" containerStyle={{ marginTop: 24 }} />
          <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />
          <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmar senha" />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>

      </Content>
    </Container>
  )
}

export default Profile