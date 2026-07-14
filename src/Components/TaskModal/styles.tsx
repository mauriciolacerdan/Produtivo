import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Content = styled.View`
  background-color: #2a2a2a;
  padding: 24px;
  /*padding-bottom: 32px;*/
  min-height: auto;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const Texto = styled.Text`
  color: #ffffff;
  font-size: 22px;
  font-weight: 600;
`;

export const Titulo = styled.Text`
  font-size: 17px;
  color: #ffffff;
  font-weight: 400;
  padding-top: 13px;
  padding-bottom: 8px;
`;
export const Input = styled.TextInput`
  border-radius: 8px;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #3a3a3a;
  color: #f2f2f2;
`;

export const ContainerDate = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 7px;
`;
interface ButtonDateProps {
  /* o componente ButtonDate recebe uma prop chamada $active e ela deve ser boolean */
  $active: boolean;
}
export const ButtonDate = styled.TouchableOpacity<ButtonDateProps>`
  /* esse componente recebe as props definidas em ButtonDateProps */
  flex: 1;
  align-items: center;
  padding: 13px;
  border-radius: 14px;
  background-color: ${({ $active }) =>
    $active
      ? '#ffffff'
      : '#3a3a3a'}; /* Pegue a prop $active e, se ela for true, use a cor branca; se for false, use a cor cinza. */
  border-width: 1px;
  border-color: ${({ $active }) => ($active ? '#ffffff' : '#3a3a3a')};
`;
export const TituloSec = styled.Text<ButtonDateProps>`
  color: ${({ $active }) => ($active ? '#000' : '#ffffff')};
  font-size: 14px;
  font-weight: bold;
`;
export const SubTitle = styled.Text`
  color: #888;
  font-size: 12px;
  margin-top: 2px;
`;

export const ContainerCategoria = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 7px;
  flex-wrap: wrap;
`;
export const ButtonCate = styled.TouchableOpacity<ButtonDateProps>`
  /* esse componente recebe as props definidas em ButtonDateProps */
  min-width: 48%;
  align-items: center;
  flex-direction: row;
  padding: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 14px;
  background-color: ${({ $active }) =>
    $active
      ? '#ffffff'
      : '#3a3a3a'}; /* Pegue a prop $active e, se ela for true, use a cor branca; se for false, use a cor cinza. */
  border-width: 1px;
  border-color: ${({ $active }) => ($active ? '#ffffff' : '#3a3a3a')};
`;
interface ColorProps {
  $color: string;
}
export const ColorCate = styled.View<ColorProps>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 6px;
  background-color: ${({ $color }) => $color};
`;

export const ContainerRecorrente = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const SubContRecorrente = styled.View`
  margin-right: 10px;
`;
export const SubTitleReco = styled.Text`
  color: #888;
  font-size: 12px;
`;
export const TituloRecor = styled.Text`
  font-size: 17px;
  color: #ffffff;
  font-weight: 400;
  padding-top: 20px;
`;
export const SwitchRecorrente = styled.Switch.attrs({
  style: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
})``;

export const ButtonCreate = styled.TouchableOpacity`
  align-items: center;
  background-color: #6e6e6e;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 16px;
  padding-bottom: 10px;
  padding-top: 10px;
`;
export const TextCreate = styled.Text`
  font-size: 15px;
  color: black;
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

export const TituloSecH = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
`;

export const ButtonHora = styled.TouchableOpacity<ButtonDateProps>`
  height: 45px;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1px;
  margin-top: 10px;
  border-radius: 14px;
  background-color: ${({ $active }) => ($active ? '#3a3a3a' : '#3a3a3a')};
  border-width: 1px;
  border-color: ${({ $active }) => ($active ? '#ffffff' : '#3a3a3a')};
`;