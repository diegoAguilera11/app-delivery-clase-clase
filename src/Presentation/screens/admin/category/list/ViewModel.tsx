


import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Category } from '../../../../../Domain/entities/Category';
import { CategoryContext } from '../../../../context/category/CategoryContext';

const AdminCategoryListViewModel = () => {

    // const [categories, setCategories] = useState<Category[]>([]);
    const { categories, getAllCategories, removeCategory } = useContext(CategoryContext);


    const deleteCategory = async (id: string) => {
        try {
            await removeCategory(id);
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }

    return {
        categories,
        deleteCategory
    }
}

export default AdminCategoryListViewModel