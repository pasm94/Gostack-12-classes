import React from 'react'
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo.png' // @2x e @3x eh a questao de densidade de pixel (o dispositivo escolhe o certo)
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'

const SignIn: React.FC = () => {
  const navigation = useNavigation()

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

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => { }}>Entrar</Button>

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
