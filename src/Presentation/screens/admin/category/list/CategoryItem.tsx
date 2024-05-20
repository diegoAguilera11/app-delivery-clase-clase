import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { Feather, Ionicons } from '@expo/vector-icons';

import { Category } from '../../../../../Domain/entities/Category'

import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdminCategoryNavigatorParamsList } from '../../../../navigator/tabs/admin/AdminCategoryNavigator';

interface Props {
    category: Category;
    remove: (id: string) => void;
}


export const CategoryItem = ({ category, remove }: Props) => {

    const navigation = useNavigation<StackNavigationProp<AdminCategoryNavigatorParamsList>>();
    return (
        <TouchableOpacity
            onPress={() => console.log('seleccionaste la categoría: ', category.id)}
        >
            <View style={styles.container}>
                <Image source={{ uri: category.image }} style={styles.image} />

                <View style={styles.info}>
                    <Text style={styles.title}>{category.name}</Text>
                    <Text style={styles.description}>{category.description}</Text>
                </View>

                <View style={styles.actionContainer}>

                    {/* Edit Button */}
                    <TouchableOpacity
                        style={{ ...styles.actionButton, backgroundColor: '#047ecc' }}
                        onPress={() => navigation.navigate('CategoryUpdateScreen', { category })}
                    >
                        <Feather name="edit-2" style={styles.action} size={25} color="white" />
                    </TouchableOpacity>

                    {/* Delete Button */}
                    <TouchableOpacity
                        style={{ ...styles.actionButton, backgroundColor: 'red' }}
                        onPress={() => remove(category.id)}
                    >
                        <Ionicons name="trash-outline" style={styles.action} size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.divisor}></View>
        </TouchableOpacity>
    )
}