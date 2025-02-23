"use client";
import axiosInstance from "@/utils/axios";

export const createPermissionForResource = async (body: any) => {
    const response = await axiosInstance.post(`/permissions/${body.resourceType}`, body)
    return response.data
}