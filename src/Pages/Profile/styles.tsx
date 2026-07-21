import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #1c1c1c;
`;

export const Perfil = styled.View`
  padding: 10px;
  margin: 30px;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const Name = styled.Text`
  font-size: 21px;
  font-weight: 400;
  color: #ffffff;
  margin-top: 23px;
  margin-bottom: 7px;
`;

export const Email = styled.Text`
  font-size: 16px;
  color: #a1a1a1;
  margin-top: 3px;
`;

export const Button = styled.TouchableOpacity`
  width: 90%;
  background-color: #2a2a2a;
  border-radius: 14px;
  margin-bottom: 14px;
`;

export const ButtonContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 16px;
`;

export const LeftContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: 500;
  margin-left: 14px;
`;

export const DangerText = styled(ButtonText)`
  color: #ff4d4d;
`;
