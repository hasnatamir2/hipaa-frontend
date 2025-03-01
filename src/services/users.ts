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

export const createUser = async (body: any) => {
    const response = await axiosInstance.post(`/users/create`, body);
    return response.data;
};

export const updateUserRole = async (body: any) => {
    const response = await axiosInstance.put(`/users/${body.id}/role`, body);
    return response.data;
}