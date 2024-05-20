import * as ImagePicker from 'expo-image-picker';
import { ResponseAPIDelivery } from '../../Data/sources/remote/api/models/ResponseApiDelivery';


export interface FileRepository {
    updateFile(file: ImagePicker.ImageInfo, collection: string, id: string): Promise<ResponseAPIDelivery>;
    updateFiles(files: ImagePicker.ImageInfo[], collection: string, id: string): Promise<ResponseAPIDelivery>;
}