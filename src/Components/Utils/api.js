import axios from 'axios';
import { getToken, removeToken } from '../Utils/auth';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            removeToken();
            // Redirect the user to the login page
            window.location.replace('/user/login');
        }
        return Promise.reject(error);
    }
);

export function getAllUsers() {
    return api
        .get('/user/get')
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

export function getAllProducts() {
    return api
        .get('/product/get')
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

export default api;
