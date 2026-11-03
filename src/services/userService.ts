import firestore from '@react-native-firebase/firestore';

import type { User } from '../types/models';

function createSessionUser(
  uid: string,
  nome: string,
  email: string | null,
): User {
  return { uid, nome, email };
}

export async function createUser(
  uid: string,
  nome: string,
  email: string | null,
): Promise<User> {
  await firestore().collection('users').doc(uid).set({
    nome,
    createdAt: new Date(),
  });
  return createSessionUser(uid, nome, email);
}

export async function getUser(
  uid: string,
  email: string | null,
): Promise<User> {
  const userProfile = await firestore().collection('users').doc(uid).get();
  const nome = userProfile.data()?.nome;
  if (typeof nome !== 'string') {
    throw new Error(`Perfil do usuário ${uid} não encontrado ou inválido.`);
  }
  return createSessionUser(uid, nome, email);
}

export async function updateUserName(uid: string, nome: string): Promise<void> {
  await firestore().collection('users').doc(uid).update({ nome });
}
