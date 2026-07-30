import React, { useState, useContext } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';

import {
  Container,
  Header,
  Logo,
  Subtitle,
  Card,
  Label,
  Input,
  Button,
  ButtonText,
  SecondaryButton,
  SecondaryText,
} from './styles';

export default function Login() {
  const { loading, signIn, signUp } = useContext(AuthContext);

  const [login, setLogin] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    await signIn(email, password);
  }

  async function handleSignUp() {
    if (!name || !email || !password) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    await signUp(name, email, password);
  }

  function changeMode() {
    setLogin(!login);

    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <Container>
      <Header>
        <Logo>Produtivo</Logo>

        <Subtitle>Organize seu tempo. Evolua todos os dias.</Subtitle>
      </Header>

      <Card>
        {!login && (
          <>
            <Label>Nome</Label>

            <Input
              placeholder="Seu nome"
              placeholderTextColor="#777"
              value={name}
              onChangeText={setName}
            />
          </>
        )}

        <Label>Email</Label>

        <Input
          placeholder="seu@email.com"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
        />

        <Label>Senha</Label>

        <Input
          placeholder="******"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button onPress={login ? handleSignIn : handleSignUp}>
          {loading ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <ButtonText>{login ? 'Entrar' : 'Criar conta'}</ButtonText>
          )}
        </Button>

        <SecondaryButton onPress={changeMode}>
          <SecondaryText>
            {login
              ? 'Ainda não possui conta? Criar agora'
              : 'Já possui uma conta? Entrar'}
          </SecondaryText>
        </SecondaryButton>
      </Card>
    </Container>
  );
}
