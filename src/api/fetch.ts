import axios from 'axios';
import { useEffect } from 'react';

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

export function checkAuthorizationCookie() {
    const allCookies = document.cookie;
    const cookiesArray = allCookies.split('; ');
    const authorizationCookie = cookiesArray.find(cookie => cookie.startsWith('Authorization='));



    if (authorizationCookie) {
        return true;
    } else {
        return false;
    }
}


export default axiosWithCredentials;