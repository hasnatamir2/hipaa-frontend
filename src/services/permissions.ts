"use client";
import axiosInstance from "@/utils/axios";

export const createPermissionForResource = async (body: any) => {
    const response = await axiosInstance.post(`/permissions/${body.resourceType}`, body)
    return response.data
}

export const assignFileToUsers = async (body: any) => {
    const response = await axiosInstance.post(`/permissions/assign-to-users`, body)
    return response.data
}