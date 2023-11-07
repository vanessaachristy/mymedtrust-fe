import axios from 'axios';

const axiosWithCredentials = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000',
});

// Add an interceptor to attach cookies to every request
axiosWithCredentials.interceptors.request.use(
    (config) => {

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosWithCredentials;