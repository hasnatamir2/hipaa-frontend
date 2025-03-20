"use client";

import {
    addFileToFolderService,
    createFolderService,
    deleteFolderService,
    getFilesInFolderService,
    getFoldersService,
    getFoldersWithFilesService,
    updateFolderNameService,
    getAllFolders,
    getFoldersAccessible,
    getFoldersTree,
    assignParentFolder
} from "@/services/folders";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFolders = () => {
    return useQuery({ queryKey: ["folders"], queryFn: getFoldersService });
};

export const useFoldersWithFiles = () => {
    return useQuery({
        queryKey: ["folders-with-files"],
        queryFn: getFoldersWithFilesService,
    });
};

export const useCreateFolder = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["create-folder"],
        mutationFn: createFolderService,
        onSuccess,
    });
};

export const useFilesInFolder = (folderId?: string) => {
    return useQuery({
        queryKey: ["files-in-folder", folderId],
        queryFn: () => getFilesInFolderService(folderId),
    });
};

export const useUpdateFolderName = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["update-folder"],
        mutationFn: (data: any) =>
            updateFolderNameService(data.id, { name: data.name }),
        onSuccess,
    });
};

export const useDeleteFolder = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["delete-folder"],
        mutationFn: deleteFolderService,
        onSuccess,
    });
};

export const useAddFileToFolder = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["add-file-to-folder"],
        mutationFn: (data: any) =>
            addFileToFolderService(data.folderId, data.fileId),
        onSuccess,
    });
};

export const useAllFolders = () => {
    return useQuery({
        queryKey: ['get-all-folders'],
        queryFn: getAllFolders
    })
}

export const useFoldersAccessible = () => {
    return useQuery({
        queryKey: ['get-folders-accessible'],
        queryFn: getFoldersAccessible
    })
}

export const useFoldersTree = () => {
    return useQuery({
        queryKey: ['get-folders-tree'],
        queryFn: getFoldersTree
    })
}

export const useAssignParentFolder = () => {
    return useMutation({
        mutationKey: ['assign-parent-folder'],
        mutationFn: (data: any) => assignParentFolder(data.folderId, data.parentId)
    })
}