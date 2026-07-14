import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #1c1c1c;
`;

export const Titulo = styled.Text`
  font-style: italic;
  color: #ffffff;
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const Texte = styled.Text`
  font-size: 18px;
  align-items: flex-start;
  margin-top: 20px;
  color: #f2f2f2;
`;

export const Input = styled.TextInput`
  width: 80%;
  border-color: #2a2a2a;
  border-width: 1px;
  border-radius: 8px;
  margin-top: 5px;
  font-size: 17px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #1c1c1c;
  color: #f2f2f2;
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #2a2a2a;
  border-radius: 8px;
  margin-top: 30px;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #f2f2f2;
  font-size: 20px;
`;

export const SignUpButton = styled.TouchableOpacity`
  margin-top: 10px;
  color: #f2f2f2;
`;

export const SignUpText = styled.Text`
  font-size: 15px;
   color: #f2f2f2;
`;
