"use client";
import axiosInstance from "@/utils/axios";

export const getActivityLogsByUserId = async () => {
    const response = await axiosInstance.get(`/activity-logs`);
    return response.data;
}