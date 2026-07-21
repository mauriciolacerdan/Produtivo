import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const FundoModal = styled.Pressable`
  flex: 1;
`;

export const Content = styled.View`
  background-color: #2a2a2a;
  padding: 24px;
  padding-bottom: 32px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const Titulo = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
`;

export const SubTitulo = styled.Text`
  font-size: 15px;
  color: #d4d4d4;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  background-color: #3a3a3a;
  color: #ffffff;
  height: 50px;
  border-radius: 12px;
  padding: 0 16px;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 24px;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #404040;
  margin-right: 10px;
`;

export const CancelButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #6e6e6e;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

//talvez possa ter apenas um styles para os modais
