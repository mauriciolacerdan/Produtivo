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
} from './styles';
import { Modal, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function NameModal({ visible, onClose }: Props) {
  const { AlterarNome } = useContext(AuthContext);
  const [NomeDigitado, setNomedigitado] = useState('');
  const [loadingTask, setLoadingTask] = useState(false);

  const handleAlterarNome = async () => {
    try {
      setLoadingTask(true);
      if (NomeDigitado.trim() === '') {
        Alert.alert('Adicione um Nome');
        return;
      }
      await AlterarNome(NomeDigitado);
      setNomedigitado('');
      onClose();
    } catch (error) {
      Alert.alert('Erro ao alterar nome');
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
              <Titulo>Alterar Nome</Titulo>
              <SubTitulo>Novo nome</SubTitulo>
              <Input
                placeholder="Digite seu novo nome"
                placeholderTextColor="#ffffff88"
                value={NomeDigitado}
                onChangeText={setNomedigitado}
              />
              <ButtonsContainer>
                <CancelButton onPress={onClose}>
                  <CancelButtonText>Cancelar</CancelButtonText>
                </CancelButton>
                <Button onPress={handleAlterarNome}>
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
