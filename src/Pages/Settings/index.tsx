import {
  Container,
  ButtonText,
  ButtonContent,
  LeftContent,
  Button,
  DangerText,
} from './styles';
import { useState } from 'react';
import NameModal from '../../Components/EditNameModal';
import SenhaModal from '../../Components/ChangePasswordModal';
import Icon from 'react-native-vector-icons/Feather';

export default function Settings() {
  const [modalNomeVisible, setModalNomeVisible] = useState(false);
  const [modalSenhaVisible, setModalSenhaVisible] = useState(false);
  return (
    <Container>
      <Button onPress={() => setModalNomeVisible(true)}>
        <ButtonContent>
          <LeftContent>
            <Icon name="user" size={22} color="#FFF" />
            <ButtonText>Alterar nome</ButtonText>
          </LeftContent>

          <Icon name="chevron-right" size={22} color="#888" />
        </ButtonContent>
      </Button>

      <Button onPress={() => setModalSenhaVisible(true)}>
        <ButtonContent>
          <LeftContent>
            <Icon name="lock" size={22} color="#FFF" />
            <ButtonText>Alterar senha</ButtonText>
          </LeftContent>

          <Icon name="chevron-right" size={22} color="#888" />
        </ButtonContent>
      </Button>

      <Button>
        <ButtonContent>
          <LeftContent>
            <Icon name="trash-2" size={22} color="#ff4d4d" />
            <DangerText>Excluir conta</DangerText>
          </LeftContent>

          <Icon name="chevron-right" size={22} color="#888" />
        </ButtonContent>
      </Button>

      <NameModal
        visible={modalNomeVisible}
        onClose={() => setModalNomeVisible(false)}
      />
      <SenhaModal
        visible={modalSenhaVisible}
        onClose={() => setModalSenhaVisible(false)}
      />
    </Container>
  );
}
