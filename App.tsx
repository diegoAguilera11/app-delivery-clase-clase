import 'react-native-gesture-handler';
import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainAppStack } from './src/Presentation/navigator/MainAppStack';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './src/Presentation/context/auth/AuthContext';

interface AppStateProps {
  children: ReactElement | ReactElement[] | null;
}

const AppState: React.FC<AppStateProps> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <View style={{ flex: 1 }}>
          <MainAppStack />
          <FlashMessage position="bottom" />
        </View>
      </AppState>
    </NavigationContainer>
  );

}

export default App;