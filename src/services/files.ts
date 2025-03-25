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
    const response = await axiosInstance.get(`/files/download/${fileKey}`, {
        responseType: "blob",
    });

    return response;
};

export const uploadFileService = async ({
    file,
    fileName,
    folderId,
}: {
    file: File;
    fileName: string;
    folderId?: string;
}) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", fileName);
    if (folderId) {
        formData.append("folderId", folderId);
    }

    const response = await axiosInstance.post("/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const bulkUploadFilesService = async ({
    files,
    folderId,
}: {
    files: File[];
    folderId?: string;
}) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
        formData.append("files", file); // 'files' must match the key in your NestJS API
    });
    if (folderId) {
        formData.append("folderId", folderId);
    }

    const response = await axiosInstance.post("/files/bulk-upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const deleteFileService = async (fileId: string) => {
    const response = await axiosInstance.delete(`/files/${fileId}`);
    return response.data;
};

export const getFilesSharedWithMeService = async () => {
    const response = await axiosInstance.get("/files/shared-with-me");
    return response.data;
}