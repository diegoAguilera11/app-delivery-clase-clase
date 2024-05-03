import { FileRepositoryImpl } from "../../../Data/repositories/FileRepository";
import * as ImagePicker from 'expo-image-picker';
const { updateFile } = new FileRepositoryImpl();

export const UpdateFileUseCase = async (file: ImagePicker.ImageInfo, collection: string, id: string) => {
    return await updateFile(file, collection, id);
}