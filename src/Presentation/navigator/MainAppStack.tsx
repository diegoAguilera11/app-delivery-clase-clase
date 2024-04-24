import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/LoginScreen';
import { RegisterScreen } from '../screens/register/RegisterScreen';
import { AdminBottomTabs } from './tabs/admin/AdminBottomTabs';

export type RootStackParamsList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    AdminBottomTabs: undefined
}


const Stack = createStackNavigator<RootStackParamsList>();

export const MainAppStack = () => {

    return (
        <Stack.Navigator
            initialRouteName='LoginScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="AdminBottomTabs" component={AdminBottomTabs} />
        </Stack.Navigator>
    );
}