"use client";
import {
    createUserGroup,
    getAllUserGroups,
    addUserToGroup,
    addFolderToGroup,
    deleteUserGroup,
    unassignUserFromGroup,
    updateUserGroupAssignment,
    getUserGroupDetails,
    unassignFolderFromGroup,
} from "@/services/user-group";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useCreateUserGroup = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["create-user-group"],
        mutationFn: (data: any) => createUserGroup(data),
        onSuccess,
    });
};

export const useAllUserGroup = () => {
    return useQuery({
        queryKey: ["get-user-groups"],
        queryFn: getAllUserGroups,
        retry: 1
    });
};

export const useUserGroupDetails = ({ groupId }: { groupId: string }) => {
    return useQuery({
        queryKey: ["get-user-groups", groupId],
        queryFn: () => getUserGroupDetails(groupId),
        retry: 1
    });
};

export const useDeleteGroup = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["delete-user-group"],
        mutationFn: (data: any) => deleteUserGroup({ groupId: data.groupId }),
        onSuccess,
    });
};

export const useAssignUserToGroup = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["assign-user-to-group"],
        mutationFn: addUserToGroup,
        onSuccess,
    });
};

export const useAssignFolderToGroup = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["assign-folder-to-group"],
        mutationFn: addFolderToGroup,
        onSuccess,
    });
};

export const useUnassignUserToGroup = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["unassign-user-to-group"],
        mutationFn: unassignUserFromGroup,
        onSuccess,
    });
};

export const useUnassignFolderToGroup = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["unassign-folder-to-group"],
        mutationFn: unassignFolderFromGroup,
        onSuccess,
    });
};

export const useUpdateUserAssignmentToGroup = ({ onSuccess }: any) => {
    return useMutation({
        mutationKey: ["update-user-assignment-to-group"],
        mutationFn: updateUserGroupAssignment,
        onSuccess,
    });
};
