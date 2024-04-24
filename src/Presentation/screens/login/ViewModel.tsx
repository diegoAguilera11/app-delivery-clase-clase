import { useState } from "react"
import { LoginAuthUseCase } from "../../../Domain/useCases/Auth/LoginAuth"
import * as yup from 'yup';
import { showMessage } from "react-native-flash-message";
import { Error, ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseAPIDelivery";

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
        console.log(isValid);
        if (isValid) {
            try {
                const response = await LoginAuthUseCase(values.email, values.password);
                if (response.success) {
                    console.log(response.success);
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
                    console.log(errorsArrayFilter);
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
