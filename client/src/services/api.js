import axios from "axios";

const API = axios.create({
    baseURL: "https://expense-iq-be.vercel.app/api"
});

// Request interceptor to automatically attach JWT Bearer token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle session expiry or unauthorized
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // If token is invalid or expired, clear storage and redirect
            if (
                window.location.pathname !== "/" &&
                window.location.pathname !== "/register"
            ) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);

export default API;