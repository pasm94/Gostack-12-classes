import React, { useCallback, useRef } from 'react'
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'
import logoImg from '../../assets/logo.png' // @2x e @3x eh a questao de densidade de pixel (o dispositivo escolhe o certo)
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, BackToSignIn, BackToSignInText } from './styles'

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)


  const handleSignUp = useCallback(async (data: SignUpFormData) => {
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

      await api.post('/users', data)

      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer login na aplicação.'
      )

      navigation.goBack()

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente!',
      )
    }
  }, [navigation]) // colocar as variaveis externas nas dependencias

  return (
    <>
      {/* ocupar apenas espaço disponivel para o keyboar (pois no ios os itens se sobrepoem) */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="name" icon="user" placeholder="Nome"
                autoCorrect={true} autoCapitalize="words" returnKeyType="next"
                onSubmitEditing={() => { emailInputRef.current?.focus() }}
              />
              <Input
                ref={emailInputRef}
                name="email" icon="mail" placeholder="E-mail"
                keyboardType="email-address" autoCorrect={false} autoCapitalize="none"
                returnKeyType="next" onSubmitEditing={() => { passwordInputRef.current?.focus() }}
              />
              <Input
                ref={passwordInputRef}
                name="password" icon="lock" placeholder="Senha"
                secureTextEntry textContentType="newPassword" /* pro ios nao tentar gerar automaticamente */
                returnKeyType="send" onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => { formRef.current?.submitForm() }}>Entrar</Button>
            </Form>
          </Container>
        </ScrollView>

      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>

  )
}

export default SignUp
