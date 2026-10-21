import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@react-native-vector-icons/feather/static';

import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import Metas from '../Pages/Metas';
import Tarefas from '../Pages/Tarefas';
import IA from '../Pages/IA';
import Settings from '../Pages/Settings';

import type {
  TabIconProps,
  HomeStackParamList,
  ProfileStackParamList,
  TabParamList,
} from '../types/navigation';

function HomeIcon({ color, size }: TabIconProps) {
  return <Feather name="home" color={color} size={size} />;
}

function RotinaIcon({ color, size }: TabIconProps) {
  return <Feather name="check-square" color={color} size={size} />;
}

function MetasIcon({ color, size }: TabIconProps) {
  return <Feather name="flag" color={color} size={size} />;
}

function IAIcon({ color, size }: TabIconProps) {
  return <Feather name="message-circle" color={color} size={size} />;
}

function ProfileIcon({ color, size }: TabIconProps) {
  return <Feather name="user" color={color} size={size} />;
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
function StackRoutes() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const ProfileStackNavigator =
  createNativeStackNavigator<ProfileStackParamList>();
function ProfileStack() {
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen
        name="ProfileMain"
        component={Profile}
        options={{ headerShown: false }}
      />

      <ProfileStackNavigator.Screen
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
    </ProfileStackNavigator.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParamList>();
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
        name="IA"
        component={IA}
        options={{
          headerShown: false,
          tabBarIcon: IAIcon,
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
