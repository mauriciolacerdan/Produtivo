import {
  Container,
  Content,
  Titulo,
  SubTitulo,
  Input,
  Button,
  ButtonText,
  ButtonsContainer,
  CancelButton,
  CancelButtonText,
  FundoModal,
} from '../EditNameModal/styles';
import { Modal, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SenhaModal({ visible, onClose }: Props) {
  const { AlterarSenha } = useContext(AuthContext);
  const [SenhaDigitado, setSenhadigitado] = useState('');
  const [SenhaAtual, setSenhaAtual] = useState('');
  const [loadingTask, setLoadingTask] = useState(false);

  const handleAlterarSenha = async () => {
    try {
      setLoadingTask(true);
      if (SenhaDigitado.trim() === '') {
        Alert.alert('Digite uma nova senha');
        return;
      }
      if (SenhaDigitado.length < 6) {
        Alert.alert('A senha deve ter pelo menos 6 caracteres');
        return;
      }
      await AlterarSenha(SenhaDigitado, SenhaAtual);
      setSenhadigitado('');
      onClose();
    } catch (error) {
      Alert.alert('Erro ao alterar senha');
      console.log(error);
    } finally {
      setLoadingTask(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <FundoModal onPress={onClose}>
        <Container>
          <Pressable onPress={e => e.stopPropagation()}>
            <Content>
              <Titulo>Alterar Senha</Titulo>
              <SubTitulo>Senha Atual</SubTitulo>
              <Input
                placeholder="Digite a senha atual"
                placeholderTextColor="#ffffff88"
                value={SenhaAtual}
                onChangeText={setSenhaAtual}
                secureTextEntry
              />
              <SubTitulo>Nova Senha</SubTitulo>
              <Input
                placeholder="Digite sua nova senha"
                placeholderTextColor="#ffffff88"
                value={SenhaDigitado}
                onChangeText={setSenhadigitado}
                secureTextEntry
              />

              <ButtonsContainer>
                <CancelButton onPress={onClose}>
                  <CancelButtonText>Cancelar</CancelButtonText>
                </CancelButton>
                <Button onPress={handleAlterarSenha}>
                  {loadingTask ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <ButtonText>Salvar</ButtonText>
                  )}
                </Button>
              </ButtonsContainer>
            </Content>
          </Pressable>
        </Container>
      </FundoModal>
    </Modal>
  );
}
