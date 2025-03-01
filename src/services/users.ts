"use client";
import axiosInstance from "@/utils/axios";

export const getAllUsers = async () => {
    const response = await axiosInstance.get(`/users`);
    return response.data;
};

export const getUserByEmail = async (email: string) => {
    const response = await axiosInstance.get(`/users/${email}`);
    return response.data;
};