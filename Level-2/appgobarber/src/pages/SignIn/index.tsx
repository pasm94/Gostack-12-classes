import React, { useCallback, useRef } from 'react'
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors'
import logoImg from '../../assets/logo.png' // @2x e @3x eh a questao de densidade de pixel (o dispositivo escolhe o certo)
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'
import { useAuth } from '../../hooks/auth'

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null) // usamos ref p fazer manipulacao direta, e nao por algum evento
  const passwordInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()

  const { signIn } = useAuth()

  const handleSignIn = useCallback(async (data: SignInFormData) => {
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

      await signIn({
        email: data.email,
        password: data.password,
      })

      // history.push('/dashboard')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais'
      )

    }
  }, [signIn]) // colocar as variaveis externas nas dependencias

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
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="email" icon="mail" placeholder="E-mail"
                autoCorrect={false} autoCapitalize="none" keyboardType="email-address"
                returnKeyType="next" onSubmitEditing={() => { passwordInputRef.current?.focus() }}
              />
              <Input
                ref={passwordInputRef} name="password" icon="lock" placeholder="Senha"
                secureTextEntry returnKeyType="send" onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                onPress={() => formRef.current?.submitForm()}
              >
                Entrar
              </Button>
            </Form>

            <ForgotPassword onPress={() => { }}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>

          </Container>
        </ScrollView>

      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>

  )
}

export default SignIn
