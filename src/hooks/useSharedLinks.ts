"use client";
import {
    createSharedLink,
    getSharedLink,
    getSharedLinkByUserId,
} from "@/services/shared-links";
import { useQuery, useMutation } from "@tanstack/react-query";

interface ICreateSharedLink {
    fileId: string;
    password?: string;
    expiresAt?: string | null;
}

export const useCreateSharedLink = () => {
    return useMutation({
        mutationKey: ["create-shared-link"],
        mutationFn: (data: ICreateSharedLink) => createSharedLink(data),
    });
};

export const useValidateLink = (token: string, password?: string) => {
    return useQuery({
        queryKey: ["validate-shared-link", token, password],
        queryFn: () => getSharedLink(token, password),
        retry: 1,
    });
};

export const useGetSharedLinksByUserId = () => {
    return useQuery({
        queryKey: ["get-shared-links"],
        queryFn: getSharedLinkByUserId,
        retry: 1,
    });
};
