import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Feather from 'react-native-vector-icons/Feather';

import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import Metas from '../Pages/Metas';
import Tarefas from '../Pages/Tarefas';
import Settings from '../Pages/Settings';

const HomeIcon = ({ color, size }) => (
  <Feather name="home" color={color} size={size} />
);

const RotinaIcon = ({ color, size }) => (
  <Feather name="check-square" color={color} size={size} />
);

const MetasIcon = ({ color, size }) => (
  <Feather name="flag" color={color} size={size} />
);

const ProfileIcon = ({ color, size }) => (
  <Feather name="user" color={color} size={size} />
);

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={Profile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configurações',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#1c1c1c',
          },
          headerShadowVisible: false,
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            color: '#ffffff',
            fontSize: 20,
            fontWeight: '600',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#ffffff',
        tabBarStyle: { backgroundColor: '#2a2a2a', borderTopWidth: 0 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackRoutes}
        options={{
          headerShown: false,
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Tarefas"
        component={Tarefas}
        options={{
          headerShown: false,
          tabBarIcon: RotinaIcon,
        }}
      />
      <Tab.Screen
        name="Metas"
        component={Metas}
        options={{
          headerShown: false,
          tabBarIcon: MetasIcon,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}
