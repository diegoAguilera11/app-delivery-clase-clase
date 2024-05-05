import { useContext } from "react"
import { AuthContext } from "../../../context/auth/AuthContext";
import { RemoveUserUseCase } from "../../../../Domain/useCases/UserLocal/RemoveUserLocal";




const ProfileInfoViewModel = () => {

    const { user, logout } = useContext(AuthContext);


    const logoutUser = async () => {
        await RemoveUserUseCase();
        logout();
    }

    return {
        user,
        logoutUser
    }
}

export default ProfileInfoViewModel;