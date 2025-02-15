'use client';

import { ACCESS_TOKEN, USER } from "@/constants/string";
import { IUserData } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Adjust to your backend URL

// Custom hook for user registration
export const useRegister = () => {
    const register = async (userData: {
        username: string;
        password: string;
    }) => {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    };
    return useMutation({
        mutationKey: ["register"],
        mutationFn: register,
    });
};

// Custom hook for user login
export const useLogin = ({ onSuccess, onError }: any) => {
    const login = async (credentials: { email: string; password: string }) => {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    };
    return useMutation({
        mutationKey: ["login"],
        mutationFn: login,
        onSuccess,
        onError,
    });
};

export const useAuth = () => {
    const [user, setUser] = useState<IUserData | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Simulate fetching user from an API or localStorage
        const storedUser = localStorage.getItem(USER);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push("/auth/login"); // Redirect if no user found
        }
    }, []);

    const onLogout = () => {
        // Remove user data from localStorage and redirect to login
        localStorage.removeItem(USER);
        localStorage.removeItem(ACCESS_TOKEN);
        setUser(null);
        router.push("/");
    };

    return { user, onLogout };
};
