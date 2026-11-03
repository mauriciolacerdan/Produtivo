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
import { Feather } from '@react-native-vector-icons/feather/static';
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { categories } from '../../Components/Categories';
import { useAuth } from '../../Context/AuthContext';
import {
  deleteTask as removeTask,
  subscribeToTasks,
  updateTask,
} from '../../services/taskService';
import type { CategoryId, Task } from '../../types/models';
import { formatLocalDate, parseLocalDate } from '../../utils/date';

export default function Tarefas() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    if (!user) {
      return;
    }
    return subscribeToTasks(setTasks, error => {
      console.error(error);
      Alert.alert('Erro ao carregar tarefas');
    });
  }, [user]);

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
  const selectedDateString = formatLocalDate(selectedDate);

  const checkTask = async (item: Task) => {
    try {
      await updateTask(item.id, { completed: !item.completed });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao atualizar tarefa');
    }
  };

  const deleteTask = async (item: Task) => {
    try {
      await removeTask(item.id);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao deletar tarefa');
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<CategoryId | ''>('');

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
                setSelectedDate(parseLocalDate(day.dateString));
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
