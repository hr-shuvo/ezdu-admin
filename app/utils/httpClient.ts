import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/',
    withCredentials: true,
});

export default httpClient;