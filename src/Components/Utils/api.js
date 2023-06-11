import axios from 'axios';
import { getToken, removeToken } from '../Utils/auth';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;


export default api;
