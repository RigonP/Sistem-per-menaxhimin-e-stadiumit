import axios from 'axios';
import { getToken, removeToken} from '../Utils/auth';


const api = axios.create({
    baseURL: "http://localhost:8080/user",// Set the API base URL from environment variable
});

// Axios request interceptor to set the authorization header
api.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Axios response interceptor to handle unauthorized responses
api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            removeToken();
            // Redirect the user to the login page
            window.location.replace('/login');
        }
        return Promise.reject(error);
    }
);

export function getAllUsers() {
    return api.get('/get')
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}
export default api;
