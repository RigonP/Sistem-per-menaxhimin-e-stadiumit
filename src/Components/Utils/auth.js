import axios from 'axios';

// Function to set the JWT token in local storage
export function setToken(token) {
    localStorage.setItem('token', token);
}

// Function to get the JWT token from local storage
export function getToken() {
    return localStorage.getItem('token');
}

// Function to remove the JWT token from local storage
export function removeToken() {
    localStorage.removeItem('token');
}

// Axios request interceptor to set the authorization header
axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Axios response interceptor to handle unauthorized responses
axios.interceptors.response.use(
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
