import React, { useCallback, useRef } from 'react'
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import logoImg from '../../assets/logo.png' // @2x e @3x eh a questao de densidade de pixel (o dispositivo escolhe o certo)
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null) // usamos ref p fazer manipulacao direta, e nao por algum evento
  const navigation = useNavigation()

  const handleSignIn = useCallback((data: object) => {
    console.log(data);

  }, [])

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
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

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
