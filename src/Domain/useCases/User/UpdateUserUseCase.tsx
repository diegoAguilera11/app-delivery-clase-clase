import { UserUpdateRepositoryImpl } from "../../../Data/repositories/UserUpdateRepository";

const { update } = new UserUpdateRepositoryImpl();

export const UpdateUserUseCase = async (id: string, name: string, lastName: string, phone: string, session_token: string) => {
    return await update(id, name, lastName, phone, session_token);
}