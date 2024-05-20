import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository"



const { getAllCategories } = new CategoryRepositoryImpl();

export const GetAllCategoriesUseCase = async (token: string) => {
    return await getAllCategories(token);
}