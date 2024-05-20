import { createStackNavigator } from '@react-navigation/stack';

import { AntDesign } from '@expo/vector-icons';



interface ContextStateProps {
    children: ReactElement | ReactElement[] | null;
}

export type AdminCategoryNavigatorParamsList = {
    CategoryListScreen: undefined;
    CategoryCreateScreen: undefined;
    CategoryUpdateScreen: { category: Category };
}

const Stack = createStackNavigator<AdminCategoryNavigatorParamsList>();

import { CategoryCreateScreen, CategoryListScreen, CategoryUpdateScreen } from '../../../screens/admin/category';
import { Text, TouchableOpacity } from 'react-native';
import React, { ReactElement } from 'react';
import { CategoryProvider } from '../../../context/category/CategoryContext';
import { Category } from '../../../../Domain/entities/Category';

export const AdminCategoryNavigator = () => {
    return (
        <CategoryState>
            <Stack.Navigator
                initialRouteName="CategoryListScreen"
            >
                <Stack.Screen
                    name="CategoryCreateScreen"
                    component={CategoryCreateScreen}
                    options={{
                        headerTitle: "Crear Categoría"
                    }}
                />

                <Stack.Screen
                    name="CategoryListScreen"
                    component={CategoryListScreen}
                    options={({ navigation, route }) => (
                        {
                            headerTitle: "Listado de Categorías",
                            headerRight: () => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('CategoryCreateScreen')}
                                >
                                    <AntDesign style={{ marginHorizontal: 20 }} name="pluscircle" size={36} color="black" />
                                </TouchableOpacity>
                            )
                        }
                    )}
                />
                <Stack.Screen
                    name="CategoryUpdateScreen"
                    component={CategoryUpdateScreen}
                    options={{
                        headerTitle: "Editar Categoría"
                    }}
                />
            </Stack.Navigator>
        </CategoryState>
    );
}

const CategoryState: React.FC<ContextStateProps> = ({ children }) => {
    return (
        <CategoryProvider>
            {children}
        </CategoryProvider>
    )
}