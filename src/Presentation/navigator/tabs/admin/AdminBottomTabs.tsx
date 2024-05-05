import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';

export type RootAdmingBottomTabParamsList = {
    ProfileInfoScreen: undefined
}


const Tab = createBottomTabNavigator<RootAdmingBottomTabParamsList>();

export const AdminBottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='ProfileInfoScreen'
            screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: 'black', // Aquí defines el color negro
                tabBarInactiveBackgroundColor: 'white', // Puedes definir el color de fondo para cuando la pestaña no está seleccionad
            }}

        >
            <Tab.Screen
                name="ProfileInfoScreen"
                component={ProfileInfoScreen}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={size} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}