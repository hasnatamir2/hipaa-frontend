"use client";
import { PermissionLevel, ResourceType } from "@/constants/permission-level";
import { createPermissionForResource, assignFileToUsers } from "@/services/permissions";
import { useMutation } from "@tanstack/react-query";

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

export const useAssignFileToUsers = () => {
    return useMutation({
        mutationKey: ["assign-file-to-users"],
        mutationFn: (data: any) => assignFileToUsers(data),
    });
}
