import React, { useState, useContext } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import {
  Container,
  Titulo,
  Texte,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText,
} from './styles';

export default function Login() {
  const { loading, signIn, signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    if (email === '' || password === '') {
      Alert.alert('PREENCHA TODOS OS CAMPOS');
      return;
    }

    await signIn(email, password);
  }

  async function handleSignUp() {
    if (email === '' || password === '' || name === '') {
      Alert.alert('PREENCHA TODOS OS CAMPOS PARA CADASTRAR');
      return;
    }

    await signUp(name, email, password);
  }

  const [login, setLogin] = useState(true);
  function handleLogin() {
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  } //Faz o login virar true e se virar true vai retornar os itens abaixo
  if (login) {
    return (
      <Container>
        <Titulo>Produtivo</Titulo>

        <Texte>Email</Texte>
        <Input
          placeholder="seu@email.com"
          placeholderTextColor="#ffffff3b" 
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Texte>Senha</Texte>
        <Input
          placeholder="******"
          placeholderTextColor="#ffffff3b" 
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Button onPress={handleSignIn}>
          {loading ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>

        <SignUpButton onPress={handleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    );
  }

  return (
    <Container>
      <Titulo>Produtivo</Titulo>

      <Texte>Nome</Texte>
      <Input
        placeholder="Seunome"
        placeholderTextColor="#ffffff3b" 
        value={name}
        onChangeText={text => setName(text)}
      />

      <Texte>Email</Texte>
      <Input
        placeholder="seu@email.com"
        placeholderTextColor="#ffffff3b" 
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <Texte>Senha</Texte>
      <Input
        placeholder="********"
        placeholderTextColor="#ffffff3b" 
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button onPress={handleSignUp}>
        {loading ? (
          <ActivityIndicator size={20} color="#fff" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>

      <SignUpButton onPress={handleLogin}>
        <SignUpText>Já possuo uma conta</SignUpText>
      </SignUpButton>
    </Container>
  );
}
