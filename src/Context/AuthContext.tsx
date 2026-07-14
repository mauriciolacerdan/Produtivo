import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@devapp'); //busca no async storage se tem usuario logado e responde o usuario ou null
      if (storageUser) {
        setUser(JSON.parse(storageUser)); //converte em objetoJS e armazena dentro do user para liberar o app
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  async function storageUser(data) {
    await AsyncStorage.setItem('@devapp', JSON.stringify(data));
  }

  async function signUp(name, email, password) {
    setLoading(true);

    await auth()
      .createUserWithEmailAndPassword(email, password) //cria conta e recebe credenciais
      .then(async value => {
        let uid = value.user.uid; //armazena credenciais(que guarda os dados) no uid

        await firestore()
          .collection('users') //no firestore seleciona a coleção users
          .doc(uid) //cria/seleciona documento com o mesmo UID do Firebase Auth
          .set({
            //salva os dados no documento:
            nome: name,
            createdAt: new Date(),
          })
          .then(() => {
            //montando objeto do usuario para ser usado no app(pode pedir mais coisas futuramente)
            let data = {
              uid: uid,
              nome: name,
              email: value.user.email,
            };
            setUser(data); //colocando o objeto dentro do user
            storageUser(data);
            setLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        Alert.alert('Erro ao criar conta', error.message);
      });
  }

  async function signIn(email, password) {
    setLoading(true);

    await auth()
      .signInWithEmailAndPassword(email, password) //envia para o firebase, se estiver correto cai no .then
      .then(async value => {
        let uid = value.user.uid; //extrai o uid do funcionario que liga o auth ao firebase

        const userProfile = await firestore()
          .collection('users') //acessa users
          .doc(uid) //procura o uid extraido acima
          .get(); //Retorna um DocumentSnapshot com os dados do usuario
        //console.log(userProfile.data().nome)//retorna o nome do usuario

        let data = {
          // pega uid e email do auth, pega nome do firestore e armazena tudo no data
          uid: uid,
          nome: userProfile.data().nome,
          email: value.user.email,
        };

        setUser(data); //armazena os dados no user
        await storageUser(data); //salva no asnyc storage
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.removeItem('@devapp');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
