import axios from 'axios';
import { setToken } from '../Utils/auth';

const api = axios.create({
    baseURL: 'http://localhost:8080/user',
});

export function login(credentials) {
    return api.post('/login', credentials)
        .then(response => {
            const token = response.data.token;
            setToken(token);
            return response.data;
        });
}

export function getAllUsers() {
    return api.get('/get')
        .then(response => response.data);
}
