"use client";

import {
    createFolderService,
    deleteFolderService,
    getFilesInFolderService,
    getFoldersService,
    updateFolderNameService,
} from "@/services/folders";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFolders = () => {
    return useQuery({ queryKey: ["folders"], queryFn: getFoldersService });
};

export const useCreateFolder = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["create-folder"],
        mutationFn: createFolderService,
        onSuccess,
    });
};

export const useFilesInFolder = (folderId: string) => {
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
