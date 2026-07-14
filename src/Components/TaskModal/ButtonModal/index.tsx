import { useState } from 'react';
import { Container, AbrirModal, Mais } from './styles';
import TaskModal from '../index';

export default function ButtonModal() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Container>
      <AbrirModal onPress={() => setModalVisible(true)}>
        <Mais>+</Mais>
      </AbrirModal>

      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Container>
  );
}
