import { Category } from "../../entities/Category";
import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";


const { createCategory } = new CategoryRepositoryImpl();

export const CreateCategoryUseCase = async (category: Category, token: string) => {
    return await createCategory(category, token);
}