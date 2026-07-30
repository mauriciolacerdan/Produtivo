import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  justify-content: center;
  align-items: center;
  padding: 25px;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

export const Logo = styled.Text`
  font-size: 48px;
  font-weight: bold;
  font-style: italic;
  color: #fff;
  letter-spacing: 1px;
`;

export const Subtitle = styled.Text`
  margin-top: 10px;
  font-size: 15px;
  color: #999;
  text-align: center;
`;

export const Card = styled.View`
  width: 100%;
  background-color: #1c1c1c;
  border-radius: 20px;
  padding: 25px;
`;

export const Label = styled.Text`
  color: #ddd;
  font-size: 15px;
  margin-bottom: 8px;
  margin-top: 15px;
`;

export const Input = styled.TextInput`
  height: 50px;
  width: 100%;
  border-radius: 12px;
  background-color: #242424;
  border-width: 1px;
  border-color: #333;
  padding-left: 15px;
  font-size: 16px;
  color: #fff;
`;

export const Button = styled.TouchableOpacity`
  height: 52px;
  width: 100%;
  background-color: #242424;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export const SecondaryButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 20px;
`;

export const SecondaryText = styled.Text`
  color: #999;
  font-size: 15px;
`;
