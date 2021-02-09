import React, { ChangeEvent, useCallback, useRef } from 'react'
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
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const { user, updateUser } = useAuth()

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({}) // precisa setar pq quando for sucesso ele n vai entrar no catch


      const schema = Yup.object().shape({ // os dados que quero validar serao um objeto, e terao esse formato (shape)
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string()
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string()
        }).oneOf(
          [Yup.ref('password')],
          'Confirmação incorreta',
        ),
      })

      await schema.validate(data, {
        abortEarly: false, // retorna todos erros, inves de retornar apenas o primeiro
      })

      const formData = Object.assign({
        name: data.name,
        email: data.email,
      }, data.old_password ? {
        old_password: data.old_password,
        password: data.password,
        password_confirmation: data.password_confirmation
      } : {})

      const response = await api.put('profile', formData)

      updateUser(response.data)

      history.push('/dashboard')

      addToast({
        type: 'success',
        title: 'Perfil atualizado!',
        description: 'Suas informações foram atualizadas com sucesso!'
      })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao atualizar o perfil!',
      })
    }
  }, [addToast, history]) // colocar as variaveis externas nas dependencias

  const handleAvatarChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => { // e == event
    if (e.target.files) {
      const data = new FormData()

      data.append('avatar', e.target.files[0])

      const response = await api.patch('/users/avatar', data)

      updateUser(response.data)

      addToast({
        type: 'success',
        title: 'Avatar atualizado!'
      })
    }
  }, [addToast, updateUser])

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

            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>

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