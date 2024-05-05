import { createContext, useEffect, useReducer } from "react";
import { User } from "../../../Domain/entities/User";
import { AuthState, authReducer } from "./authReducer";
import { GetUserUseCase } from "../../../Domain/useCases/UserLocal/GetUserLocal";
import { VerifyTokenUseCase } from "../../../Domain/useCases/UserLocal/VerifyTokenUserLocal";
import { RemoveUserUseCase } from "../../../Domain/useCases/UserLocal/RemoveUserLocal";
import { SaveUserUseCase } from "../../../Domain/useCases/UserLocal/SaveUserLocal";


type AuthContextProps = {
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    auth(user: User): void;
    logout: () => void;
    updateUser: (user: User) => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    user: null
}

export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: any) => {

    useEffect(() => {
        checkToken();
    }, []);

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const checkToken = async () => {
        const user = await GetUserUseCase();

        if (!user) return dispatch({ type: 'not-authenticated' });


        try {
            const response = await VerifyTokenUseCase(user.session_token);

            if (!response.success) return dispatch({ type: 'not-authenticated' });

            if (response.expired) await RemoveUserUseCase();

            return dispatch({ type: 'auth', payload: { user } })
        } catch (error) {
            dispatch({ type: 'not-authenticated' })
        }
    }

    const auth = async (user: User) => {
        dispatch({
            type: 'auth',
            payload: { user }
        })
    }

    const logout = () => {
        dispatch({
            type: 'logout'
        })
    }

    const updateUser = async (user: User) => {
        await SaveUserUseCase(user);
        dispatch({ type: 'update-user', payload: { user } })
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                auth,
                logout,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}