import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository"
import { Category } from "../../entities/Category";

const { updateCategory } = new CategoryRepositoryImpl();

export const UpdateCategoryUseCase = async (category: Category, id: string, token: string) => {
    return await updateCategory(category, id, token);
}