import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';


import useViewModel from './ViewModel'
import styles from './Styles';
import { CategoryItem } from './CategoryItem';


export const CategoryListScreen = () => {

  const { categories, deleteCategory } = useViewModel();

  const showAlert = (id: string) =>
    Alert.alert(
      '¿Estás seguro de eliminar esta categoría?',
      'Este cambio no sera reversible',
      [
        {
          text: 'Confimar',
          onPress: () => deleteCategory(id),
          style: 'default',
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      {
        cancelable: false
      },
    )

  return (
    <View>
      {
        (categories && categories.length === 0) ?
          (
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 50 }}>No hay categorías en el sistema</Text>
          )
          : 
          (
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id!}
              renderItem={({ item }) => (
                <CategoryItem category={item} remove={showAlert} />
              )}
            />
          )
      }
    </View>
  )
}