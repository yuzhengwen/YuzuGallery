import axios from 'axios';
import { DRF_TOKEN } from '../constants';

const api = axios.create({
    // env variables need to be prefixed with VITE_
    //baseURL: import.meta.env.VITE_API_URL,
    baseURL: 'http://127.0.0.1:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add interceptors to the axios instance
// Intercept requests and add the token to the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(DRF_TOKEN);
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;