import type { ReactNode } from 'react';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// Domain models
export type CategoryId =
  | 'trabalho'
  | 'estudos'
  | 'saude'
  | 'lazer'
  | 'descanso';

export type Category = {
  id: CategoryId;
  label: string;
  color: string;
};

export type TaskDate = string;
export type TaskHour = string;

export type User = {
  uid: string;
  nome: string;
  email: string | null;
};

export type UserProfile = {
  nome: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

export type Task = {
  id: string;
  title: string;
  date: TaskDate;
  hour: TaskHour;
  category: CategoryId;
  recurring: boolean;
  completed: boolean;
  userId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp | null;
};

// Input data
export type SignUpInput = {
  nome: string;
  email: string;
  password: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type ChangePasswordInput = {
  novaSenha: string;
  senhaAtual: string;
};

export type CreateTaskInput = {
  title: string;
  date: TaskDate;
  hour: TaskHour;
  category: CategoryId;
  recurring: boolean;
};

export type UpdateTaskInput = Pick<Task, 'completed'>;

// Context and component props
export type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signed: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (nome: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  AlterarNome: (nomeDigitado: string) => Promise<boolean>;
  AlterarSenha: (senhaDigitada: string, senhaAtual: string) => Promise<boolean>;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export type TaskModalProps = {
  visible: boolean;
  onClose: () => void;
};

export type EditNameModalProps = {
  visible: boolean;
  onClose: () => void;
};

export type ChangePasswordModalProps = {
  visible: boolean;
  onClose: () => void;
};

export type TabIconProps = {
  color: string;
  size: number;
};

// Navigation
export type AuthStackParamList = {
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Home: undefined;
  Tarefas: undefined;
  Metas: undefined;
  IA: undefined;
  Perfil: undefined;
};

// Styled-component props
export type TaskDateButtonStyleProps = {
  $active: boolean;
};

export type TaskColorStyleProps = {
  $color: string;
};

export type TaskTextStyleProps = {
  completed: boolean;
};

export type TaskCheckButtonStyleProps = {
  checked: boolean;
};

export type TaskCategoryStyleProps = {
  $selected: boolean;
};

// Service returns
export type TaskSubscription = () => void;
export type TaskSnapshotCallback = (tasks: Task[]) => void;
export type TaskSnapshotErrorCallback = (error: Error) => void;
export type AuthCredentialResult = FirebaseAuthTypes.UserCredential;
