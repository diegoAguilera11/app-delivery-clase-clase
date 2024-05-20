
import { CategoryRepository } from '../../Domain/repositories/CategoryRepository';

import { Category } from '../../Domain/entities/Category';
import { ResponseAPIDelivery } from '../sources/remote/api/models/ResponseApiDelivery';

import { AxiosError } from 'axios';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';




export class CategoryRepositoryImpl implements CategoryRepository {
    async getAllCategories(token: string): Promise<ResponseAPIDelivery> {
        try {

            const { data } = await ApiDelivery.get<ResponseAPIDelivery>('category/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            // console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async createCategory(category: Category, token: string): Promise<ResponseAPIDelivery> {
        try {
            const { data } = await ApiDelivery.post('category/', category, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            // console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async updateCategory(category: Category, id: string, token: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `category/${id}`;
            const { data } = await ApiDelivery.put(path, category, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            // console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async deleteCategory(id: string, token: string): Promise<ResponseAPIDelivery> {

        try {
            const path = `category/${id}`
            const { data } = await ApiDelivery.delete<ResponseAPIDelivery>(path, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            // console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

}
