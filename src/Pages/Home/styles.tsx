import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  //justify-content: center;
  background-color: #1c1c1c;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;
export const Titulo = styled.Text`
  color: #ffffff;
  font-size: 22px;
  font-weight: 600;
  align-self: flex-start;
  margin-left: 5px;
  margin-bottom: 16px;
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
export const IrDataText = styled.Text`
  color: #a1a1a1;
  font-size: 12px;
  margin-left: 5px;
`;
