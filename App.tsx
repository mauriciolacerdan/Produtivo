import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/Routes/Routes';
import { AuthProvider } from './src/Context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
