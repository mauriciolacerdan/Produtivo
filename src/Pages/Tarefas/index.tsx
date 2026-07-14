import {
  Container,
  ContainerButtonModal,
  Titulo,
  ContainerAlto,
  IrData,
  IrDataText,
  ContainerData,
  SetaData,
  SetaText,
  DataText,
  ContainerDT,
  ContainerTask,
  Title,
  CalendarContainer,
  CheckButton,
  Hour,
  DeleteButton,
  CategoryColor,
  ContainerActions,
  TextCateg,
  Categoria,
} from './styles';
import { TouchableWithoutFeedback } from 'react-native';
import ButtonModal from '../../Components/TaskModal/ButtonModal/index';
import Feather from 'react-native-vector-icons/Feather';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import auth from '@react-native-firebase/auth'; //importando firebase
import firestore from '@react-native-firebase/firestore'; //importando firebase
import { Calendar } from 'react-native-calendars';
import { categories } from '../../Components/Categories';

type Task = {
  // Define o formato de uma tarefa, garantindo que o TypeScript saiba quais campos existem
  id: string;
  title: string;
  date: string;
  hour: string;
  category: string;
  recurring: boolean;
  completed: boolean;
  userId: string;
};

export default function Tarefas() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const user = auth().currentUser; // pega o usuário logado no Firebase Auth
    if (!user) return; // se não tiver usuário logado, encerra a execução
    const unsubscribe = firestore() // cria um "listener" no Firestore (tempo real)
      .collection('users') // coleção principal
      .doc(user.uid) // entra no usuário logado
      .collection('tasks') // pega as tasks desse usuário
      .onSnapshot(snapshot => {
        // executa sempre que algo mudar (criar, editar, deletar)
        const list = snapshot.docs.map(doc => ({
          id: doc.id, // pega o id do documento
          ...doc.data(), // pega os dados da task
        })) as Task[];
        setTasks(list); // atualiza o state com todas as tasks atuais
      });
    // limpeza do listener que evita vazamento de memória e múltiplas conexões
    return () => unsubscribe();
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const dataFormatada = selectedDate.toLocaleDateString('pt-BR');
  const getTextoData = () => {
    const hoje = new Date();
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    if (selectedDate.toDateString() === hoje.toDateString()) {
      return 'Hoje';
    }
    if (selectedDate.toDateString() === amanha.toDateString()) {
      return 'Amanhã';
    }
    return dataFormatada;
  };
  const textoData = getTextoData();
  const [showCalendar, setShowCalendar] = useState(false);
  const selectedDateString = selectedDate.toISOString().split('T')[0];

  const checkTask = async (item: Task) => {
    const user = auth().currentUser;
    if (!user) {
      return;
    }
    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('tasks')
      .doc(item.id) //entrando na tarefa do id
      .update({
        completed: !item.completed, //alternando
      });
  };

  const deleteTask = async (item: Task) => {
    const user = auth().currentUser;
    if (!user) return;
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('tasks')
        .doc(item.id)
        .delete();
    } catch (error) {
      console.log('Erro ao deletar tarefa:', error);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <Container>
      <ContainerAlto>
        <Titulo>Tarefas</Titulo>
        <IrData
          onPress={() => {
            setShowCalendar(true);
          }}
        >
          <Feather name="calendar" color="#a1a1a1" size={18} />
          <IrDataText>Ir para data</IrDataText>
        </IrData>
      </ContainerAlto>

      <ContainerData>
        <SetaData
          onPress={() => {
            setSelectedDate(prev => {
              const newDate = new Date(prev);
              newDate.setDate(newDate.getDate() - 1);
              return newDate;
            });
          }}
        >
          <SetaText>❮</SetaText>
        </SetaData>
        <ContainerDT>
          <DataText>{textoData}</DataText>
          {(textoData === 'Hoje' || textoData === 'Amanhã') && (
            <IrDataText>{dataFormatada}</IrDataText>
          )}
        </ContainerDT>
        <SetaData
          onPress={() => {
            setSelectedDate(prev => {
              const newDate = new Date(prev);
              newDate.setDate(newDate.getDate() + 1);
              return newDate;
            });
          }}
        >
          <SetaText>❯</SetaText>
        </SetaData>
      </ContainerData>

      {showCalendar && (
        <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
          <CalendarContainer>
            <Calendar
              hideExtraDays={true}
              onDayPress={day => {
                setSelectedDate(new Date(day.dateString));
                setShowCalendar(false);
              }}
              markedDates={{
                [selectedDateString]: {
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

      <FlatList
        ListHeaderComponent={
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Categoria
                $selected={selectedCategory === item.id}
                onPress={() =>
                  setSelectedCategory(prev => (prev === item.id ? '' : item.id))
                }
              >
                <TextCateg $selected={selectedCategory === item.id}>
                  {item.label}
                </TextCateg>
              </Categoria>
            )}
          />
        }
        data={tasks
          .filter(task => task.date === selectedDateString) //Mostra apenas as datas que forem igual a data selecionada.
          .filter(task => {
            if (selectedCategory === '') {
              return true;
            }
            return task.category === selectedCategory;
          })
          .sort((a, b) => {
            return a.hour.localeCompare(b.hour);
          })} //Compara os horarios para definir a ordem.
        renderItem={({ item }) => {
          const categoria = categories.find(
            category => category.id === item.category,
          );

          return (
            <ContainerTask>
              <CheckButton
                checked={item.completed}
                onPress={() => checkTask(item)}
              >
                {item.completed && (
                  <Feather name="check" size={16} color="#000" />
                )}
              </CheckButton>
              <Title completed={item.completed}>{item.title}</Title>
              <Hour completed={item.completed}>{item.hour}</Hour>
              <ContainerActions>
                <CategoryColor $color={categoria?.color ?? '#343434'} />
                <DeleteButton onPress={() => deleteTask(item)}>
                  <Feather name="trash-2" size={14} color="#ff4d4f" />
                </DeleteButton>
              </ContainerActions>
            </ContainerTask>
          );
        }}
      />

      <ContainerButtonModal>
        <ButtonModal />
      </ContainerButtonModal>
    </Container>
  );
}

/* Tarefas:Recorrente(aparece sempre)? */
