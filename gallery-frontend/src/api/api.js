import axios from 'axios';
import { DRF_TOKEN } from '../constants';

const mode = import.meta.env.MODE; // 'development', 'production', 'test'
const api = axios.create({
    // env variables need to be prefixed with VITE_
    //baseURL: 'http://127.0.0.1:8000',
    baseURL: mode === 'development' ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_PROD,
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