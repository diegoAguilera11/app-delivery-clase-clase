import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/LoginScreen';
import { RegisterScreen } from '../screens/register/RegisterScreen';
import { AdminBottomTabs } from './tabs/admin/AdminBottomTabs';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';
import { ClientBottomTabs } from './tabs/client/ClientBottomTabs';
import ProfileUpdateScreen from '../screens/profile/update/ProfileUpdateScreen';

export type RootStackParamsList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    AdminBottomTabs: undefined,
    ClientBottomTabs: undefined
    ProfileUpdateScreen: undefined,
}


const Stack = createStackNavigator<RootStackParamsList>();

export const MainAppStack = () => {
    const { user, status } = useContext(AuthContext);


    if (status === 'checking') return <LoadingScreen />

    const renderRoleScreen = () => {
        if (user.role_id === 3) {
            // This Client
            return <>
                <Stack.Screen name="ClientBottomTabs" component={ClientBottomTabs} />
                <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
            </>
        } else if (user.role_id === 2) {
            // This Delivery
        } else {
            // This Admin
            return <>
                <Stack.Screen name="AdminBottomTabs" component={AdminBottomTabs} />
                <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
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