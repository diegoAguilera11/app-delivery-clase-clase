import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import { AdminCategoryNavigator } from './AdminCategoryNavigator';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';


export type RootAdmingBottomTabParamsList = {
    ProfileInfoScreen: undefined;
    AdminCategoryNavigator: undefined;
}


const Tab = createBottomTabNavigator<RootAdmingBottomTabParamsList>();

export const AdminBottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='AdminCategoryNavigator'
            screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: 'black', // Aquí defines el color negro
                tabBarInactiveBackgroundColor: 'black', // Puedes definir el color de fondo para cuando la pestaña no está seleccionad
            }}

        >
            <Tab.Screen
                name="AdminCategoryNavigator"
                component={AdminCategoryNavigator}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ size, color }) => <MaterialIcons name="category" size={size} color="white" />
                }}
            />

            <Tab.Screen
                name="ProfileInfoScreen"
                component={ProfileInfoScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={size} color="white" />
                }}
            />
        </Tab.Navigator>
    );
}