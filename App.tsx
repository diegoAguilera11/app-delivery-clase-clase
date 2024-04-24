import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainAppStack } from './src/Presentation/navigator/MainAppStack';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <MainAppStack />
        <FlashMessage position="bottom" />
      </View>
    </NavigationContainer>
  );

}