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
  align-items: center;
  justify-content: center;
  background-color: #2a2a2a;
  border-radius: 14px;
  border-width: 0px;
  padding: 13px 80px;
  margin-bottom: 10px;
  width: 85%;
`;

export const SairText = styled.Text`
  color: #f52c2c;
  font-size: 18px;
  font-weight: 500;
  margin-left: 8px;
`;

export const ConfigText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  margin-left: 8px;
`;
