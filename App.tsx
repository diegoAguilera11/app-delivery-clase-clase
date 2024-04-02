import 'react-native-gesture-handler';
import React from 'react';
import LoginScreen from './src/screens/login/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { MainAppStack } from './src/Presentation/navigator/MainAppStack';

export default function App() {
  return (
    <NavigationContainer>
      <MainAppStack />
    </NavigationContainer>
  );

}