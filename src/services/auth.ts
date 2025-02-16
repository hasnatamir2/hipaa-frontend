"use client";
import axiosInstance from "@/utils/axios";

export const registerService = async (userData: {
    username: string;
    password: string;
}) => {
    const response = await axiosInstance.post(`/auth/register`, userData);
    return response.data;
};

export const loginService = async (credentials: {
    email: string;
    password: string;
}) => {
    const response = await axiosInstance.post(`/auth/login`, credentials);
    return response.data;
};
