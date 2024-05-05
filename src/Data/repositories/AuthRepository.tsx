import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from '../sources/remote/api/models/ResponseApiDelivery';

export class AuthRepositoryImpl implements AuthRepository {
    async register(user: User): Promise<ResponseAPIDelivery> {
        try {
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>('auth/register', user);
            return Promise.resolve(data)

        } catch (error) {
            let e = (error as AxiosError);
            // console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async login(email: string, password: string): Promise<ResponseAPIDelivery> {
        try {
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>('auth/login', { email, password });
            return Promise.resolve(data);
        } catch (error) {
            let e = (error as AxiosError & ResponseAPIDelivery);
            // console.log('ERROR: ', JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }
}