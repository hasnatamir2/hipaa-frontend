import { ACCESS_TOKEN } from "@/constants/string";
import axios from "axios";
import { redirect } from "next/navigation";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // Change this to your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

axiosInstance.interceptors.response.use((response) => {

    if(response.status === 401) {
        redirect('/auth/login')
    }
    return response
})

export default axiosInstance;
