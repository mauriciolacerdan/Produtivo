import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import * as authService from '../services/authService';
import * as sessionService from '../services/sessionService';
import * as userService from '../services/userService';
import type {
  AuthContextValue,
  AuthProviderProps,
  User,
} from '../types/models';

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

function getErrorCode(error: unknown): string | undefined {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    return error.code;
  }
  return undefined;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    async function restoreSession() {
      try {
        const storedUser = await sessionService.getSession();
        if (isMounted) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Erro ao restaurar sessão');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    restoreSession();
    return () => {
      isMounted = false;
    };
  }, []);

  async function signUp(nome: string, email: string, password: string) {
    setLoading(true);
    try {
      const credential = await authService.signUp(email, password);
      const newUser = await userService.createUser(
        credential.user.uid,
        nome,
        credential.user.email,
      );
      await sessionService.saveSession(newUser);
      setUser(newUser);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao criar conta', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      const credential = await authService.signIn(email, password);
      const signedInUser = await userService.getUser(
        credential.user.uid,
        credential.user.email,
      );
      await sessionService.saveSession(signedInUser);
      setUser(signedInUser);
    } catch (error) {
      console.error(error);
      if (getErrorCode(error) === 'auth/invalid-credential') {
        Alert.alert('E-mail ou senha incorretos');
      } else {
        Alert.alert('Erro ao fazer login');
      }
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await authService.signOut();
      await sessionService.clearSession();
      setUser(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao sair da conta');
    }
  }

  async function AlterarSenha(
    senhaDigitada: string,
    senhaAtual: string,
  ): Promise<boolean> {
    try {
      const passwordChanged = await authService.changePassword(
        senhaDigitada,
        senhaAtual,
      );
      if (!passwordChanged) {
        Alert.alert('Erro ao alterar a senha', 'Faça login novamente.');
        return false;
      }
      Alert.alert('Senha alterada com sucesso!');
      return true;
    } catch (error) {
      console.error(error);
      if (getErrorCode(error) === 'auth/invalid-credential') {
        Alert.alert('A senha atual está incorreta');
      } else {
        Alert.alert('Erro ao alterar a senha');
      }
      return false;
    }
  }

  async function AlterarNome(nomeDigitado: string): Promise<boolean> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !user) {
      Alert.alert('Erro ao alterar nome', 'Faça login novamente.');
      return false;
    }
    try {
      await userService.updateUserName(currentUser.uid, nomeDigitado);
      const updatedUser = { ...user, nome: nomeDigitado };
      setUser(updatedUser);
      await sessionService.saveSession(updatedUser);
      Alert.alert('Nome alterado com sucesso!');
      return true;
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao alterar nome');
      return false;
    }
  }

  const value: AuthContextValue = {
    signed: !!user,
    user,
    loading,
    signUp,
    signIn,
    signOut,
    AlterarNome,
    AlterarSenha,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }
  return context;
}
