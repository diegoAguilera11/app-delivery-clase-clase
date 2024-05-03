import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';

import ProfileScreen from '../../../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export const ClientBottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={size} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}