import { useContext, useState } from "react";

import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import { CategoryContext } from "../../../../context/category/CategoryContext";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Category } from "../../../../../Domain/entities/Category";

interface Values {
    name: string,
    description: string,
    image: string;
}


const validationCreateCategorySchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    description: yup.string().required('La descripción es requerida'),
    image: yup.string().required('La imagen es requerida')
});



const AdminCategoryUpdateViewModel = (category: Category) => {

    const { updateCategory } = useContext(CategoryContext);


    const [values, setValues] = useState(category);

    // State to file image
    const [file, setFile] = useState<ImagePicker.ImageInfo>();

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    // Check if submit form is loading
    const [loading, setLoading] = useState(false);


    const update = async () => {
        const validForm = await isValidForm();
        if (validForm) {
            try {
                setLoading(true);

                // Clean field to category
                const { image, ...data } = values;

                // Call the category contexupdate the category
                const response = await updateCategory(data, file! ,category.id);
                if (response.success) {
                    setLoading(false);
                    showMessage({
                        message: 'Categoría Actualizada',
                        description: 'La categoría ha sido actualizada correctamente',
                        type: 'success',
                    });
                    resetForm();
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        setLoading(false);
    }


    const onChange = async (property: keyof Values, value: string) => {
        setValues({ ...values, [property]: value });

        // Clear the error for the current field when the value changes
        setErrorMessages((prevErrors) => ({ ...prevErrors, [property]: '' }));
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            onChange('image', result.assets[0].uri);
            setFile(result.assets[0]);

        }
    }

    const takePhoto = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            });

            if (!result.canceled) {
                onChange('image', result.assets[0].uri);
                setFile(result.assets[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const resetForm = () => {
        setValues({
            name: '',
            description: '',
            image: ''
        });
    }

    const isValidForm = async (): Promise<boolean> => {
        try {
            await validationCreateCategorySchema.validate(values, { abortEarly: false });
            return true;
        } catch (error) {
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                errors[err.path] = err.message;
            });
            setErrorMessages(errors);
            return false;
        }
    }

    return {
        ...values,
        onChange,
        takePhoto,
        pickImage,
        errorMessages,
        setErrorMessages,
        update,
        loading
    }
}



export default AdminCategoryUpdateViewModel;