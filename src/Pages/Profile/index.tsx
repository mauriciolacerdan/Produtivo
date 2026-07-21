import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Name,
  Email,
  Perfil,
  Avatar,
  Button,
  ButtonContent,
  LeftContent,
  ButtonText,
  DangerText,
} from './styles';

export default function Profile() {
  const { signOut, user } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  return (
    <Container>
      <Perfil>
        <Avatar source={require('../../Assets/avatar.png')} />

        <Name>{user.nome}</Name>
        <Email>{user.email}</Email>
      </Perfil>

      <Button onPress={() => navigation.navigate('Settings')}>
        <ButtonContent>
          <LeftContent>
            <Icon name="settings" size={22} color="#FFF" />
            <ButtonText>Configurações</ButtonText>
          </LeftContent>

          <Icon name="chevron-right" size={22} color="#888" />
        </ButtonContent>
      </Button>

      <Button onPress={signOut} activeOpacity={0.7}>
        <ButtonContent>
          <LeftContent>
            <Icon name="log-out" size={22} color="#ff4d4d" />
            <DangerText>Sair da conta</DangerText>
          </LeftContent>

          <Icon name="chevron-right" size={22} color="#888" />
        </ButtonContent>
      </Button>
    </Container>
  );
}
