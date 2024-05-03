import { useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import { UpdateFileUseCase } from '../../../Domain/useCases/File/UpdateFileUseCase';
import { ResponseAPIDelivery } from '../../../Data/sources/remote/api/models/ResponseApiDelivery';
import { showMessage } from 'react-native-flash-message';
import { RegisterAuthUseCase } from '../../../Domain/useCases/Auth/RegisterAuth';
import { SaveUserUseCase } from '../../../Domain/useCases/UserLocal/SaveUserLocal';
import { AuthContext } from '../../context/auth/AuthContext';

interface Values {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    image: string;
}

interface ResponseErrorData {
    path: string;
    value: string;
}

const validationRegisterSchema = yup.object().shape({
    image: yup.string().required('La imagen es requerida'),
    name: yup.string().required('El nombre es requerido'),
    lastName: yup.string().required('El apellido es requerido'),
    email: yup.string().email('Ingrese un correo electrónico válido').required('El correo electrónico es requerido'),
    phone: yup.string().required('El teléfono es requerido'),
    password: yup.string().required('La contraseña es requerida'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es requerida')
});

const RegisterViewModel = () => {

    const { auth } = useContext(AuthContext);

    const [file, setFile] = useState<ImagePicker.ImageInfo>();

    const [values, setValues] = useState<Values>({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        image: '',
        password: '',
        confirmPassword: ''
    });

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);

    const [loading, setLoading] = useState(false);



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

    const register = async () => {
        const validForm = await isValidForm();
        if (validForm) {
            setLoading(true);
            try {
                // Destructure values to user
                const { image, confirmPassword, ...data } = values;

                // Call use case to register user
                const response = await RegisterAuthUseCase(data);

                if (response.success) {
                    const responseImage = await UpdateFileUseCase(file!, 'users', response.data.id);

                    const dataUser = response.data;
                    // Append image user to object
                    dataUser.image = responseImage.data;

                    // Save user in local storage
                    await SaveUserUseCase(dataUser);

                    // Authenticate to user
                    auth(dataUser);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                const rejectErrors: ResponseAPIDelivery = error;

                if (rejectErrors.error) {
                    setErrorResponses([]);
                    showMessage({
                        message: rejectErrors.message,
                        type: 'danger',
                        icon: 'danger',
                    });
                } else {
                    // Convert JSON to Array
                    const errorsArray = Object.values(rejectErrors.errors);

                    // Filter array with msg and path
                    const errorsArrayFilter = errorsArray.map(({ msg, path }) => ({ value: msg, path }))
                    setErrorResponses(errorsArrayFilter);

                }
                setLoading(false);
            }
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
        takePhoto,
        register,
        onChange,
        errorMessages,
        errorsResponse,
        loading
    }
}

export default RegisterViewModel