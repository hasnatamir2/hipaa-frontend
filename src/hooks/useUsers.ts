"use client";
import { getAllUsers, getUserByEmail } from "@/services/users";
import { useQuery } from "@tanstack/react-query";


export const useAllUsers = () => {
    return useQuery({
        queryKey: ['get-all-users'],
        queryFn: getAllUsers
    })
}

export const useUsersEmail = (email: string) => {
    return useQuery({
        queryKey: ['get-user-by-email', email],
        queryFn: () => getUserByEmail(email)
    })
}