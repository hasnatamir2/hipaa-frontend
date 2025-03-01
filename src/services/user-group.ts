"use client";
import axiosInstance from "@/utils/axios";

export const createUserGroup = async (body: any) => {
    const response = await axiosInstance.post("/groups", body);
    return response.data;
};

export const getAllUserGroups = async () => {
    const response = await axiosInstance.get(`/groups`);
    return response.data;
};

export const getUserGroupDetails = async (groupId: string) => {
    const response = await axiosInstance.get(`/groups/${groupId}`);
    return response.data;
};

export const addFolderToGroup = async ({
    groupId,
    folderId,
}: {
    groupId: string;
    folderId: string;
}) => {
    const response = await axiosInstance.post(
        `/groups/${groupId}/folders/${folderId}`
    );
    return response.data;
};

export const addUserToGroup = async ({
    groupId,
    userId,
}: {
    groupId: string;
    userId: string;
}) => {
    const response = await axiosInstance.post(
        `/groups/${groupId}/users/${userId}`
    );
    return response.data;
};

export const deleteUserGroup = async ({ groupId }: { groupId: string }) => {
    const response = await axiosInstance.delete(`/groups/${groupId}`);
    return response.data;
};

export const unassignUserFromGroup = async ({
    groupId,
    userId,
}: {
    groupId: string;
    userId: string;
}) => {
    const response = await axiosInstance.delete(
        `/groups/${groupId}/users/${userId}`
    );
    return response.data;
};

export const unassignFolderFromGroup = async ({
    groupId,
    folderId,
}: {
    groupId: string;
    folderId: string;
}) => {
    const response = await axiosInstance.delete(
        `/groups/${groupId}/folder/${folderId}`
    );
    return response.data;
};

export const updateUserGroupAssignment = async ({
    groupId,
    userId,
}: {
    groupId: string;
    userId: string;
}) => {
    const response = await axiosInstance.put(
        `/groups/${groupId}/users/${userId}`
    );
    return response.data;
};
