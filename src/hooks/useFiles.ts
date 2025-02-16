"use client";

import { downloadFileService, getFileDetailsService, getFilesService } from "@/services/files";
import { useQuery, useMutation } from "@tanstack/react-query";

const useFiles = () => {
    return useQuery({ queryKey: ["files"], queryFn: getFilesService });
};

export const useFileDetails = (fileId: string) => {
    return useQuery({
        queryKey: ['file', fileId],
        queryFn: () => getFileDetailsService(fileId),
        enabled: !!fileId
    })
}

export const useFileDownload = (fileId: string) => {
    return useMutation({
        mutationKey: ['download-file', fileId],
        mutationFn: (fileKey: string) => downloadFileService(fileKey),
    })
}

export default useFiles;
