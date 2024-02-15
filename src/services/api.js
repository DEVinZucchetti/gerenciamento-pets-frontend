import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
})

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("@token_petshop")
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

/*
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
            window.location.href = '/';
        }
    });
*/

export default api