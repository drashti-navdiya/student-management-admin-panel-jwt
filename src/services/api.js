import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api"
});

// Automatically inject JWT token if it exists in localStorage
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

export default API;
