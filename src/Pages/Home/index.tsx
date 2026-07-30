import { useState, useContext } from 'react';
import {
  Container,
  ContainerData,
  SetaData,
  SetaText,
  ContainerDT,
  DataText,
  IrDataText,
  Titulo
} from './styles';
import { AuthContext } from '../../Context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dataFormatada = selectedDate.toLocaleDateString('pt-BR');
  const getTextoData = () => {
    const hoje = new Date();
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    if (selectedDate.toDateString() === hoje.toDateString()) {
      return 'Hoje';
    }
    if (selectedDate.toDateString() === amanha.toDateString()) {
      return 'Amanhã';
    }
    return dataFormatada;
  };
  const textoData = getTextoData();
  return (
    <Container>
      <Titulo>Olá {user.nome}</Titulo>
      
      <ContainerData>
        <SetaData
          onPress={() => {
            setSelectedDate(prev => {
              const newDate = new Date(prev);
              newDate.setDate(newDate.getDate() - 1);
              return newDate;
            });
          }}
        >
          <SetaText>❮</SetaText>
        </SetaData>
        <ContainerDT>
          <DataText>{textoData}</DataText>
          {(textoData === 'Hoje' || textoData === 'Amanhã') && (
            <IrDataText>{dataFormatada}</IrDataText>
          )}
        </ContainerDT>
        <SetaData
          onPress={() => {
            setSelectedDate(prev => {
              const newDate = new Date(prev);
              newDate.setDate(newDate.getDate() + 1);
              return newDate;
            });
          }}
        >
          <SetaText>❯</SetaText>
        </SetaData>
      </ContainerData>
    </Container>
  );
}
