import auth, { EmailAuthProvider } from '@react-native-firebase/auth';

import type { AuthCredentialResult } from '../types/models';

export function getCurrentUser() {
  return auth().currentUser;
}

export function signUp(
  email: string,
  password: string,
): Promise<AuthCredentialResult> {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signIn(
  email: string,
  password: string,
): Promise<AuthCredentialResult> {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signOut(): Promise<void> {
  return auth().signOut();
}

export async function changePassword(
  novaSenha: string,
  senhaAtual: string,
): Promise<boolean> {
  const currentUser = auth().currentUser;
  if (!currentUser?.email) {
    return false;
  }

  const credential = EmailAuthProvider.credential(
    currentUser.email,
    senhaAtual,
  );
  await currentUser.reauthenticateWithCredential(credential);
  await currentUser.updatePassword(novaSenha);
  return true;
}
