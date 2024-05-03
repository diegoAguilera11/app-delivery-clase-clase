
import mime from "mime";
import { FileRepository } from "../../Domain/repositories/FileRepository";

import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseAPIDelivery";

import * as ImagePicker from 'expo-image-picker';
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { AxiosError } from "axios";


export class FileRepositoryImpl implements FileRepository {
    async updateFile(file: ImagePicker.ImageInfo, collection: string, id: string): Promise<ResponseAPIDelivery> {
        try {
            let imageRegister = new FormData();

            imageRegister.append('archive', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)
            });

            const path = `upload/${collection}/${id}`;
            const { data } = await ApiDelivery.put(path, imageRegister, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            return Promise.resolve(data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async updateFiles(files: ImagePicker.ImageInfo[], collection: string, id: string): Promise<ResponseAPIDelivery> {

    }
}