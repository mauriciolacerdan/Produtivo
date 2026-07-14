import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Name,
  Email,
  Button,
  SairText,
  Perfil,
  Avatar,
  ConfigText,
} from './styles';

export default function Profile() {
  const { signOut, user } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  return (
    <Container>
      <Perfil>
        <Avatar source={require('../../Assets/avatar.png')}></Avatar>

        <Name>{user.nome}</Name>
        <Email>{user.email}</Email>
      </Perfil>

      <Button onPress={() => navigation.navigate('Settings')}>
        <ConfigText>Configurações</ConfigText>
      </Button>

      <Button onPress={signOut} activeOpacity={0.7}>
        <SairText>Sair da Conta</SairText>
      </Button>
    </Container>
  );
}
