import { createContext, useContext, useEffect, useState } from "react";

import { Category } from "../../../Domain/entities/Category";

import { ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseApiDelivery";
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from "../auth/AuthContext";
import { GetAllCategoriesUseCase } from "../../../Domain/useCases/Category/GetAllCategoriesUseCase";
import { DeleteCategoryUseCase } from "../../../Domain/useCases/Category/DeleteCategoryUseCase";
import { CreateCategoryUseCase } from "../../../Domain/useCases/Category/CreateCategoryUseCase";
import { UpdateFileUseCase } from "../../../Domain/useCases/File/UpdateFileUseCase";
import { UpdateCategoryUseCase } from "../../../Domain/useCases/Category/UpdateCategoryUseCase";




interface CategoryContextProps {
    categories: Category[];
    getAllCategories(): Promise<void>;
    createCategory(category: Category, file: ImagePicker.ImageInfo): Promise<ResponseAPIDelivery>;
    updateCategory(category: Category, file: ImagePicker.ImageInfo, id: string): Promise<ResponseAPIDelivery>;
    removeCategory(id: string): Promise<ResponseAPIDelivery>;
    updateFile(file: ImagePicker.ImageInfo, collection: string, id: string): Promise<void>;
}

export const CategoryContext = createContext({} as CategoryContextProps);


export const CategoryProvider = ({ children }: any) => {

    useEffect(() => {
        getAllCategories();
    }, []);

    const [categories, setCategories] = useState<Category[]>([]);
    const { user } = useContext(AuthContext);

    const getAllCategories = async (): Promise<void> => {
        try {
            const response = await GetAllCategoriesUseCase(user.session_token);
            if (response.data) {
                setCategories(response.data);
            }
        } catch (error) {
            setCategories([]);
        }
    }

    const createCategory = async (category: Category, file: ImagePicker.ImageInfo) => {
        const response = await CreateCategoryUseCase(category, user.session_token);
        if (response.success) {
            // Call to update file image
            await updateFile(file!, 'categories', response.data.id);
        }
        // Refresh list category
        getAllCategories();
        return response;
    }


    const updateCategory = async (category: Category, file: ImagePicker.ImageInfo, id: string) => {
        const response = await UpdateCategoryUseCase(category, id, user.session_token);
        if (response.success) {
            if (file !== undefined) {
                await updateFile(file!, 'categories', id);
            }
            getAllCategories();
        }

        return response;
    }

    const removeCategory = async (id: string): Promise<ResponseAPIDelivery> => {
        const response = await DeleteCategoryUseCase(id, user.session_token);
        getAllCategories();
        return response;
    }

    const updateFile = async (file: ImagePicker.ImageInfo, collection: string, id: string,) => {
        await UpdateFileUseCase(file, collection, id);
    }

    return (
        <CategoryContext.Provider
            value={{
                categories,
                getAllCategories,
                createCategory,
                updateCategory,
                removeCategory,
                updateFile,
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}