// import axios from 'axios';
//
// const api = axios.create({
//     baseURL: 'http://localhost:8080/user',
// });
//
// export function setToken(token) {
//     sessionStorage.setItem('token', token);
// }
//
// export function getToken() {
//     return sessionStorage.getItem('token');
// }
//
//
//
// export function removeToken() {
//     sessionStorage.removeItem('token');
// }
//
// api.interceptors.request.use(function (config) {
//     const token = getToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
//
// api.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     function (error) {
//         if (error.response.status === 401) {
//             removeToken();
//             // Redirect the user to the login page
//             window.location.replace('/login');
//         }
//         return Promise.reject(error);
//     }
// );
//
// export default api;