import axios from "axios";
import { HOST_LOCAL } from "@env";


const host = HOST_LOCAL;
const ApiDelivery = axios.create({
    baseURL: host,
    headers: {
        'Content-type': 'application/json'
    }
});

export { ApiDelivery }