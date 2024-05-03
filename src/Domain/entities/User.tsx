import { Address } from "./Address";

export interface User {
    id?:             string;
    name:            string;
    lastName:        string;
    phone:           string;
    email:           string;
    image?:          string;
    password:        string;
    confirmPassword?: string;
    session_token?:  string;
    role_id?:        number;
    address?:         Address;
}