import axios from "axios";
import { browser } from '$app/environment';

const getToken = () => {
    if (!browser) return null;
    try {
        const token = localStorage.getItem("token");
        return token;
    } catch (error) {
        console.error("Error accessing localStorage:", error);
        return null;
    }
};

export const freelanceAxios = axios.create({
    baseURL: "http://localhost:9000/api",
    headers: {
        "Content-Type": "application/json",
    }
});

// Add request interceptor to dynamically set the token
freelanceAxios.interceptors.request.use((config) => {
    if (browser) {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});
