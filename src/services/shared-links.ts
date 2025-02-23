"use client";
import axiosInstance from "@/utils/axios";

export const createSharedLink = async (body: any) => {
    const response = await axiosInstance.post("/shared-links/create", body);
    return response.data;
};

export const getSharedLink = async (token: string, password?: string) => {
    try {
        const url = new URLSearchParams();
        if (password) url.append("password", password);

        const urlString = url.toString()
        const response = await axiosInstance.get(
            `/shared-links/${token}?${urlString}`
        );
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};
