"use client";
import {
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUserRole,
} from "@/services/users";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAllUsers = () => {
    return useQuery({
        queryKey: ["get-all-users"],
        queryFn: getAllUsers,
    });
};

export const useUsersEmail = (email: string) => {
    return useQuery({
        queryKey: ["get-user-by-email", email],
        queryFn: () => getUserByEmail(email),
    });
};

export const useRegisterUser = ({ onSuccess }: { onSuccess: any }) => {
    return useMutation({
        mutationKey: ["register-user"],
        mutationFn: (data: any) => createUser(data),
        onSuccess,
    });
};

export const useUpdateRole = ({ onSuccess }: { onSuccess: any }) => {
    return useMutation({
        mutationKey: ["update-user-role"],
        mutationFn: (body: any) => updateUserRole(body),
        onSuccess,
    });
};
