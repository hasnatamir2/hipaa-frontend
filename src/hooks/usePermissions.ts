"use client";
import { PermissionLevel, ResourceType } from "@/constants/permission-level";
import { createPermissionForResource } from "@/services/permissions";
import { useQuery, useMutation } from "@tanstack/react-query";

interface ICreateResourcePermission {
    resourceType: ResourceType,
    email: string,
    resourceId: string;
    canRead: boolean;
    canWrite: boolean;
    canShare: boolean;
    canDelete: boolean;
    permissionLevel: PermissionLevel
}

export const useCreateFilePermission = () => {
    return useMutation({
        mutationKey: ["create-file-permission"],
        mutationFn: (data: ICreateResourcePermission) => createPermissionForResource(data),
    });
};
