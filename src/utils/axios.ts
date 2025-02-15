// utils/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // Change this to your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
