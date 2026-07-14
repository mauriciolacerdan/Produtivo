import { useState } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { categories } from '../Categories';

import {
  Container,
  Content,
  Texto,
  Titulo,
  Input,
  ContainerDate,
  ButtonDate,
  TituloSec,
  SubTitle,
  ContainerCategoria,
  ButtonCate,
  ColorCate,
  /*SwitchRecorrente,
  ContainerRecorrente,
  SubContRecorrente,
  SubTitleReco,
  TituloRecor,*/
  ButtonCreate,
  TextCreate,
  CalendarContainer,
  TituloSecH,
  ButtonHora,
} from './styles';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function TaskModal({ visible, onClose }: Props) {
  const [title, setTitle] = useState(''); //Nome da tarefa
  const [selected, setSelected] = useState('hoje'); //Data
  const [selectedctg, setSelectedctg] = useState('trabalho'); //Categoria
  const [recorrente, setRecorrente] = useState(false); //Recorrente?
  const [loadingTask, setLoadingTask] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const getTaskDate = () => {
    const today = new Date();
    if (selected === 'hoje') {
      return today.toISOString().split('T')[0];
    }
    if (selected === 'amanhã') {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }
    return selectedDate;
  };
  const [taskHour, setTaskHour] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const handleCreateTask = async () => {
    try {
      setLoadingTask(true);
      //tente executar isso
      const user = auth().currentUser; //pega no firebaseAuth o usuario atual e coloca na "user"
      if (!user) {
        //se nao existir usuario interrompe.
        return;
      }
      if (title.trim() === '') {
        Alert.alert('Adicione um Titulo');
        return;
      }
      if (selected === 'custom' && !selectedDate) {
        Alert.alert('Selecione uma data');
        return;
      }
      const taskDate = getTaskDate();
      await firestore() //acessando firestore (await=espere o firebase terminar)
        .collection('users') //entra na coleção users
        .doc(user.uid) //seleciona o documento do usuario pelo uid
        .collection('tasks') //Cria/acessa subcoleção tasks
        .add({
          //cria um novo documento
          title: title,
          date: taskDate,
          hour: taskHour,
          category: selectedctg,
          recurring: recorrente,
          completed: false,
          userId: user.uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      console.log('Tarefa criada');
      setTitle('');
      setSelected('hoje');
      setSelectedctg('trabalho');
      setRecorrente(false);
      setTaskHour('');
      setSelectedDate('');
      onClose();
    } catch (error) {
      //se der errado o try
      Alert.alert('Erro ao criar tarefa');
      console.log(error);
    } finally {
      setLoadingTask(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <Container>
          <Content>
            <Texto>Nova Tarefa</Texto>

            <Titulo>Título</Titulo>
            <Input
              placeholder="Digite o nome da tarefa"
              placeholderTextColor="#ffffff88"
              value={title}
              onChangeText={setTitle}
            />

            <Titulo>Data</Titulo>
            <ContainerDate>
              <ButtonDate
                $active={selected === 'hoje'} //se selected for igual a hoje vai ser true e ativar o active [$ serve para falar que é styed component]
                onPress={() => setSelected('hoje')} //transforma o selected em 'hoje'
              >
                <TituloSec $active={selected === 'hoje'}>Hoje</TituloSec>
                <SubTitle>{formatDate(today)}</SubTitle>
              </ButtonDate>

              <ButtonDate
                $active={selected === 'amanhã'}
                onPress={() => setSelected('amanhã')}
              >
                <TituloSec $active={selected === 'amanhã'}>Amanhã</TituloSec>
                <SubTitle>{formatDate(tomorrow)}</SubTitle>
              </ButtonDate>

              <ButtonDate
                $active={selected === 'custom'}
                onPress={() => {
                  setSelected('custom');
                  setShowCalendar(true);
                }}
              >
                <TituloSec $active={selected === 'custom'}>
                  Outra data
                </TituloSec>
                <SubTitle>
                  {selectedDate
                    ? selectedDate.split('-').reverse().join('/')
                    : 'Selecionar'}
                </SubTitle>
              </ButtonDate>
            </ContainerDate>
            <ButtonHora
              $active={!!taskHour}
              onPress={() => setShowTimePicker(true)}
            >
              <TituloSecH>Horário</TituloSecH>
              <SubTitle>{taskHour ? taskHour : 'Selecionar'}</SubTitle>
            </ButtonHora>

            <Titulo>Categoria</Titulo>
            <ContainerCategoria>
              {categories.map(category => (
                <ButtonCate
                  key={category.id}
                  $active={selectedctg === category.id}
                  onPress={() => setSelectedctg(category.id)}
                >
                  <ColorCate $color={category.color} />
                  <TituloSec $active={selectedctg === category.id}>
                    {category.label}
                  </TituloSec>
                </ButtonCate>
              ))}
            </ContainerCategoria>

            {/*<ContainerRecorrente>
              <SubContRecorrente>
                <TituloRecor>Recorrente</TituloRecor>
                <SubTitleReco>Repete diariamente</SubTitleReco>
              </SubContRecorrente>
              <SwitchRecorrente
                value={recorrente}
                onValueChange={value => setRecorrente(value)}
                thumbColor={'#1c1c1c'}
                trackColor={{
                  false: '#3a3a3a',
                  true: '#ffffff',
                }}
              />
            </ContainerRecorrente>*/}

            <ButtonCreate onPress={handleCreateTask} disabled={loadingTask}>
              {loadingTask ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <TextCreate>Criar Tarefa</TextCreate>
              )}
            </ButtonCreate>
          </Content>
          {showCalendar && (
            <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
              <CalendarContainer>
                <Calendar
                  hideExtraDays={true}
                  minDate={new Date().toISOString().split('T')[0]}
                  onDayPress={day => {
                    setSelectedDate(day.dateString);
                    setShowCalendar(false);
                  }}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      selectedColor: '#ffffff',
                    },
                  }}
                  theme={{
                    backgroundColor: '#2a2a2a',
                    calendarBackground: '#2a2a2a',
                    dayTextColor: '#ffffff',
                    monthTextColor: '#ffffff',
                    textDisabledColor: '#666',
                    selectedDayTextColor: '#000',
                    todayTextColor: '#ffffff',
                    arrowColor: '#ffffff',
                  }}
                />
              </CalendarContainer>
            </TouchableWithoutFeedback>
          )}
          {showTimePicker && (
            <DateTimePicker
              mode="time"
              value={new Date()}
              is24Hour={true}
              display="spinner"
              onChange={(event, date) => {
                setShowTimePicker(false);

                if (date) {
                  const hours = String(date.getHours()).padStart(2, '0');
                  const minutes = String(date.getMinutes()).padStart(2, '0');

                  setTaskHour(`${hours}:${minutes}`);
                }
              }}
            />
          )}
        </Container>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
