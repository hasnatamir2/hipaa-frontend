import { ACCESS_TOKEN } from "@/constants/string";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // Change this to your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (err) => {
        if (err.status === 401) {
            window.location.href = "/auth/login";
        }
        return Promise.reject(err);
    }
);

export default axiosInstance;
