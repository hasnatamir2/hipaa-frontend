"use client";
import axiosInstance from "@/utils/axios";

export const getFilesService = async () => {
    const response = await axiosInstance.get("/files");
    return response.data;
};

export const getFileDetailsService = async (fileId: string) => {
    const response = await axiosInstance.get(`/files/${fileId}`);
    return response.data;
};

export const downloadFileService = async (fileKey: string) => {
    const res = await fetch(`/files/download/${fileKey}`);
    if (!res.ok) throw new Error('Failed to fetch file');
    const blob = await res.blob();
    return URL.createObjectURL(blob);
    // const response = await axiosInstance.get(`/files/download/${fileKey}`, {
    //     responseType: "blob",
    // });

    // return response.data;
};
