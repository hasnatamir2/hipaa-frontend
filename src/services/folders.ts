"use client";
import axiosInstance from "@/utils/axios";

export const getFoldersService = async () => {
    const response = await axiosInstance.get("/folders");
    return response.data;
};

export const getFoldersWithFilesService = async () => {
    const response = await axiosInstance.get("/folders/folders-with-files");
    return response.data;
};

export const getFoldersAccessibleWithGroupService = async () => {
    const response = await axiosInstance.get("/folders/folders-with-files");
    return response.data;
};

export const createFolderService = async (body: any) => {
    const response = await axiosInstance.post("/folders", body);
    return response.data;
};

export const getFilesInFolderService = async (folderId?: string) => {
    const response = await axiosInstance.get(`/folders/${folderId}/files`);
    return response.data;
};

export const updateFolderNameService = async (folderId: string, body: any) => {
    const response = await axiosInstance.put(`/folders/${folderId}`, body);
    return response.data;
};

export const deleteFolderService = async (folderId: string) => {
    const response = await axiosInstance.delete(`/folders/${folderId}`);
    return response.data;
};

export const addFileToFolderService = async (folderId: string, fileId: any) => {
    const response = await axiosInstance.post(
        `/folders/${folderId}/assign-file/${fileId}`
    );
    return response.data;
};

export const getAllFolders = async () => {
    const response = await axiosInstance.get(`/folders/all`);
    return response.data;
};

// Fetch folders accessible by the current user's groups.
export const getFoldersAccessible = async () => {
    const response = await axiosInstance.get(`/folders/accessible`);
    return response.data;
};

export const getFoldersTree = async () => {
    const response = await axiosInstance.get(`/folders/folders-tree`);
    return response.data;
};

export const assignParentFolder = async (
    folderId: string,
    parentId: string
) => {
    const response = await axiosInstance.put(
        `/folders/${folderId}/assign-parent-folder/${parentId}`
    );
    return response.data;
};
