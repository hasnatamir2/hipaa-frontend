"use client";
import axiosInstance from "@/utils/axios";

export const getFilesService = async () => {
    const response = await axiosInstance.get("/files");
    return response.data;
};

export const getFileDetailsService = async (fileId: string) => {
    const response = await axiosInstance.get(
        `/files/${fileId}`
    );
    return response.data;
};


export const downloadFileService = async (fileKey: string) => {
    const response = await axiosInstance.get(`/files/download/${fileKey}`, {
        responseType: 'blob', // important to get it as blob
      })

    return response.data;
}