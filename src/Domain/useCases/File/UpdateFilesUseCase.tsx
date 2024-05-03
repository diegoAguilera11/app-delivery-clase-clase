import { FileRepositoryImpl } from "../../../Data/repositories/FileRepository";
import * as ImagePicker from 'expo-image-picker';
const { updateFiles } = new FileRepositoryImpl();

export const UpdateFilesUseCase = async (files: ImagePicker.ImageInfo[], collection: string, id: string) => {
    return await updateFiles(files, collection, id);
}