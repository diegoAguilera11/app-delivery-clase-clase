import { AxiosError } from 'axios';
import { User } from '../../Domain/entities/User';
import { UserLocalRepository } from '../../Domain/repositories/UserLocalRepository';
import { LocalStorage } from '../sources/local/LocalStorage';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';
import { ResponseVerifyTokenAPIDelivery } from '../sources/remote/api/models/ResponseVerifyTokenApiDelivery';


export class UserLocalRepositoryImpl implements UserLocalRepository {
    async save(user: User): Promise<void> {
        const { save } = LocalStorage();
        await save('user', JSON.stringify(user));
    }

    async getUser(): Promise<User> {
        const { getItem } = LocalStorage();
        const data = await getItem('user');

        const user: User = JSON.parse(data as any);

        return user;
    }

    async removeItem(): Promise<void> {
        const { removeItem } = LocalStorage();
        await removeItem('user');
    }

    async verifyToken(token: string): Promise<ResponseVerifyTokenAPIDelivery> {
        try {
            const { data } = await ApiDelivery.get<ResponseVerifyTokenAPIDelivery>('auth/validate-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return Promise.resolve(data);
        } catch (error) {
            let e = (error as AxiosError);

            const apiError: ResponseVerifyTokenAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError);
        }


    }
}