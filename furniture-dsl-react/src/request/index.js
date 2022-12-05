import axios from "axios";
import { hostHttp } from "../core/constants";



const requestInstance = axios.create({
    baseURL: hostHttp,
    headers: {
        "Content-Type": "application/json",
        timeout: 1000,
    },
});

export default requestInstance;
