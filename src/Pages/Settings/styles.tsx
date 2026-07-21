import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #1c1c1c;
  padding: 24px 16px;
`;

export const Button = styled.TouchableOpacity`
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
