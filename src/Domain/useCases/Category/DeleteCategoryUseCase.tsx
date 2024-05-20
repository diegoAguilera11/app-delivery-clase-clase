import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository"


const { deleteCategory } = new CategoryRepositoryImpl();



export const DeleteCategoryUseCase = async (id: string, token: string) => {
    return await deleteCategory(id, token);
}