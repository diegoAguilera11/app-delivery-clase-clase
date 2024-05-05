import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseApiDelivery";

export interface UserUpdateRepository {
    update(id: string, name: string, lastName: string, phone: string, session_token: string): Promise<ResponseAPIDelivery>;
}