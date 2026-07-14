import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #1c1c1c;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ContainerAlto = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const IrData = styled.TouchableOpacity`
  align-items: center;
  background-color: #2e2e2e;
  padding: 9px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 15px;
  flex-direction: row;
`;
export const IrDataText = styled.Text`
  color: #a1a1a1;
  font-size: 12px;
  margin-left: 5px;
`;
export const Titulo = styled.Text`
  color: #ffffff;
  font-size: 26px;
  font-weight: 500;
`;

export const ContainerData = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 20px;
  width: 100%;
  height: 60px;
  background-color: #2e2e2e;
  border-radius: 15px;
`;
export const SetaData = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #383838;
`;
export const SetaText = styled.Text`
  color: #a1a1a1;
  font-size: 14px;
  line-height: 24px;
`;
export const ContainerDT = styled.View`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-inline: 60px;
`;
export const DataText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-weight: 400;
`;

export const ContainerButtonModal = styled.View`
  position: absolute;
  right: 24px;
  bottom: 16px;
`;

export const CalendarContainer = styled.View`
  position: absolute;
  top: 280px;
  align-self: center;
  width: 90%;
  border-radius: 16px;
  overflow: hidden;
  background-color: #2a2a2a;
  z-index: 999;
`;

export const ContainerTask = styled.View`
  flex-direction: row;
  gap: 6px;
  align-items: center;
  background-color: #343434;
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 15px;
  width: 100%;
  height: 55px;
  border-radius: 15px;
`;

interface TitleProps {
  completed: boolean;
}
export const Title = styled.Text<TitleProps>`
  color: ${({ completed }) => (completed ? '#a1a1a1' : '#ffffff')};
  font-size: 17px;
  font-weight: 400;
  text-decoration-line: ${({ completed }) =>
    completed ? 'line-through' : 'none'};
`;
export const Hour = styled.Text<TitleProps>`
  color: ${({ completed }) => (completed ? '#a1a1a1' : '#EBEBEB')};
  font-size: 14px;
  text-decoration-line: ${({ completed }) =>
    completed ? 'line-through' : 'underline'};
`;
interface CheckButtonProps {
  //quer dizer: Esse componente precisa receber uma propriedade chamada checked e ela obrigatoriamente é um boolean.
  checked: boolean;
}
export const CheckButton = styled.TouchableOpacity<CheckButtonProps>`
  /* recebe as propriedades de CheckButtonProps, entao ele sabe que o checked existe */
  width: 24px;
  height: 24px;
  margin-inline: 7px;
  border-radius: 6px;
  border-width: 2px;
  justify-content: center;
  align-items: center;
  border-color: ${({ checked }) => (checked ? '#FFF' : '#8C8C8C')};
  background-color: ${({ checked }) => (checked ? '#FFF' : 'transparent')};
  /* Recebe a prop "checked" e altera as cores do botão dinamicamente.  E o $ significa: Execute um código JavaScript aqui.   ({ checked }) = pega apenas a prop "checked" recebida pelo componente. */
`;
export const ContainerActions = styled.View`
  margin-left: auto;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;
export const DeleteButton = styled.TouchableOpacity`
  margin-top: -20px;
  width: 22px;
  height: 22px;
  justify-content: center;
  align-items: center;
`;
interface ColorProps {
  $color: string;
}
export const CategoryColor = styled.View<ColorProps>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 6px;
  background-color: ${({ $color }) => $color};
`;

interface CategoriaProps {
  $selected: boolean;
}
export const Categoria = styled.TouchableOpacity<CategoriaProps>`
  align-items: center;
  justify-content: center;
  height: 35px;
  padding: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: ${({ $selected }) => ($selected ? '#FFFFFF' : '#3A3A3A')};
`;
export const TextCateg = styled.Text<CategoriaProps>`
  font-size: 15px;
  color: ${({ $selected }) => ($selected ? '#000000' : '#C7C7C7')};
`;
