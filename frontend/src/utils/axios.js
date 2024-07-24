import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    if (authTokens) {
        config.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    console.log('Axios request config:', config);
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
