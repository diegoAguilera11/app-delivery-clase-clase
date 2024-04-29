import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';

interface Values {
    image: string;
}

const validationRegisterSchema = yup.object().shape({
    image: yup.string().required('La imagen es requerida'),
});

const RegisterViewModel = () => {

    const [file, setFile] = useState<ImagePicker.ImageInfo>();

    const [values, setValues] = useState<Values>({
        image: ''
    });

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            console.log('se agrego una imagen: ', result.assets[0].uri);
            onChange('image', result.assets[0].uri);
            setFile(result.assets[0]);

        }

        console.log({ result });
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

    const onChange = (property: string, value: string) => {
        setValues({ ...values, [property]: value });
    }

    const isValidForm = async (): Promise<boolean> => {
        try {
            await validationRegisterSchema.validate(values, { abortEarly: false });
            return true;
        } catch (error) {
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                errors[err.path] = err.message;
            });
            setErrorMessages(errors);
            console.log(errorMessages);
            return false;
        }
    }


    return {
        ...values,
        pickImage,
        takePhoto
    }
}

export default RegisterViewModel