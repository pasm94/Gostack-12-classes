import React, { useCallback, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Feather";

import api from "../../services/api";
import getValidationErrors from "../../utils/getValidationErrors";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from "./styles";
import { useAuth } from "../../hooks/auth";

interface SignUpForData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpForData) => {
      try {
        formRef.current?.setErrors({}); // precisa setar pq quando for sucesso ele n vai entrar no catch

        const schema = Yup.object().shape({
          // os dados que quero validar serao um objeto, e terao esse formato (shape)
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().min(6, "No mínimo 6 dígitos"), // nao precisa do required, pq se tem que ter 6 digitos
          // no minimo, eh obvio que eh obrigatorio
        });

        await schema.validate(data, {
          abortEarly: false, // retorna todos erros, inves de retornar apenas o primeiro
        });

        await api.post("/users", data);

        Alert.alert(
          "Cadastro realizado com sucesso!",
          "Você já pode fazer login na aplicação."
        );

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          "Erro no cadastro",
          "Ocorreu um erro ao fazer cadastro, tente novamente!"
        );
      }
    },
    [navigation]
  ); // colocar as variaveis externas nas dependencias

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      {/* ocupar apenas espaço disponivel para o keyboar (pois no ios os itens se sobrepoem) */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={() => {}}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCorrect={true}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha Atual"
                secureTextEntry
                textContentType="newPassword" /* pro ios nao tentar gerar automaticamente */
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                textContentType="newPassword" /* pro ios nao tentar gerar automaticamente */
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />
              <Input
                ref={confirmPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                textContentType="newPassword" /* pro ios nao tentar gerar automaticamente */
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
