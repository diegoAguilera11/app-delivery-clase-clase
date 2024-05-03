import { useContext, useState } from "react"
import { LoginAuthUseCase } from "../../../Domain/useCases/Auth/LoginAuth"
import * as yup from 'yup';
import { showMessage } from "react-native-flash-message";
import { Error, ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseAPIDelivery";
import { AuthContext } from "../../context/auth/AuthContext";
import { SaveUserUseCase } from "../../../Domain/useCases/UserLocal/SaveUserLocal";

interface Values {
    email: string;
    password: string;
}

interface ResponseErrorData {
    path: string;
    value: string;
}

const validationLoginSchema = yup.object().shape({
    email: yup.string().email('Ingrese un correo electrónico válido').required('El correo electrónico es requerido'),
    password: yup.string().required('La contraseña es requerida'),
});

const LoginViewModel = () => {

    const { auth } = useContext(AuthContext);

    const [values, setValues] = useState<Values>({
        email: '',
        password: ''
    });

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);

    const onChange = (property: string, value: string) => {
        setValues({ ...values, [property]: value });
    }

    const login = async () => {
        const isValid = await isValidForm();
        if (isValid) {
            // Clear to previous error messages
            setErrorMessages({});
            try {
                const response = await LoginAuthUseCase(values.email, values.password);
                if (response.success) {
                    await SaveUserUseCase(response.data);
                    auth(response.data);
                }
            } catch (error) {
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
            }
        }
    }

    const isValidForm = async (): Promise<boolean> => {
        try {
            await validationLoginSchema.validate(values, { abortEarly: false });
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
        onChange,
        login,
        errorMessages,
        errorsResponse
    }
}

export default LoginViewModel
