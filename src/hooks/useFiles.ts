"use client";

import {
    bulkUploadFilesService,
    deleteFileService,
    downloadFileService,
    getFileDetailsService,
    getFilesService,
    uploadFileService,
} from "@/services/files";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useFiles = () => {
    return useQuery({ queryKey: ["files"], queryFn: getFilesService });
};

export const useFileDetails = (fileId: string) => {
    return useQuery({
        queryKey: ["file", fileId],
        queryFn: () => getFileDetailsService(fileId),
        enabled: !!fileId,
        retry: 1
    });
};

export const useFileDownload = (fileId: string) => {
    return useMutation({
        mutationKey: ["download-file", fileId],
        mutationFn: (fileKey: string) => downloadFileService(fileKey),
    });
};

export const useFileUpload = () => {
    return useMutation({
        mutationKey: ["upload-file"],
        mutationFn: ({ file, fileName, folderId }: any) =>
            uploadFileService({
                file,
                fileName,
                folderId,
            }),
    });
};

export const useBulkUploadFiles = () => {
    return useMutation({
        mutationKey: ["bulk-upload-files"],
        mutationFn: ({
            files,
            folderId,
        }: {
            files: File[];
            folderId?: string;
        }) =>
            bulkUploadFilesService({
                files,
                folderId,
            }),
    });
};

export const useDeleteFile = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["delete-file"],
        mutationFn: (fileId: string) => deleteFileService(fileId),
        onSuccess,
    });
}

export default useFiles;
