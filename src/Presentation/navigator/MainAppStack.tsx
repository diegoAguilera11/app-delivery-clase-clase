import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/LoginScreen';
import { RegisterScreen } from '../screens/register/RegisterScreen';
import { AdminBottomTabs } from './tabs/admin/AdminBottomTabs';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';

export type RootStackParamsList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    AdminBottomTabs: undefined
}


const Stack = createStackNavigator<RootStackParamsList>();

export const MainAppStack = () => {
    const { user, status } = useContext(AuthContext);


    if (status === 'checking') return <LoadingScreen />

    const renderRoleScreen = () => {
        if (user.role_id === 3) {
            // This Client
        } else if (user.role_id === 2) {
            // This Delivery
        } else {
            // This Admin

            return <>
                <Stack.Screen name="AdminBottomTabs" component={AdminBottomTabs} />
            </>
        }
    }

    return (
        <Stack.Navigator
            initialRouteName='LoginScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            {
                (status !== 'authenticated')
                    ? (
                        <>
                            <Stack.Screen name="LoginScreen" component={LoginScreen} />
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        </>
                    )
                    :
                    renderRoleScreen()
            }

        </Stack.Navigator>
    );
}