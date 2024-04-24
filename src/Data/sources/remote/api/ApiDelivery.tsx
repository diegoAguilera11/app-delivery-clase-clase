import axios from "axios";

import { HOST_LOCAL, HOST_EMULATOR } from '@env';

const ApiDelivery = axios.create({
    baseURL: HOST_EMULATOR,
    headers: {
        'Content-type': 'application/json'
    }
});

export { ApiDelivery }