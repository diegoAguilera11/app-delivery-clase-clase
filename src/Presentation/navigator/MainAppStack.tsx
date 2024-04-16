import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/LoginScreen';
import { RegisterScreen } from '../screens/register/RegisterScreen';

export type RootStackParamsList = {
    Login: undefined,
    Register: undefined
}


const Stack = createStackNavigator<RootStackParamsList>();

export const MainAppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{ 
                headerShown: false
             }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}