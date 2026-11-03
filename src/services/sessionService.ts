import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types/models';
const SESSION_KEY = '@devapp';

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return (
    'uid' in value &&
    typeof value.uid === 'string' &&
    'nome' in value &&
    typeof value.nome === 'string' &&
    'email' in value &&
    (typeof value.email === 'string' || value.email === null)
  );
}

export async function getSession(): Promise<User | null> {
  const storedUser = await AsyncStorage.getItem(SESSION_KEY);
  if (storedUser === null) {
    return null;
  }
  const parsedUser: unknown = JSON.parse(storedUser);
  if (!isUser(parsedUser)) {
    throw new Error('A sessão armazenada possui um formato inválido.');
  }
  return parsedUser;
}

export function saveSession(user: User): Promise<void> {
  return AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): Promise<void> {
  return AsyncStorage.removeItem(SESSION_KEY);
}
