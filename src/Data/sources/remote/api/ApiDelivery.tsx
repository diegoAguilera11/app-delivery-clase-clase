import axios from "axios";
import { HOST_LOCAL } from "@env";

const ApiDelivery = axios.create({
    baseURL: HOST_LOCAL,
    headers: {
        'Content-type': 'application/json'
    }
});

export { ApiDelivery }